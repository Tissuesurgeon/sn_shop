import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const root = path.resolve(__dirname, "../..");
const outDir = path.join(root, "test-results", "visual");

const targets = [
  {
    name: "desktop",
    width: 1440,
    expected: "docs/ui-design/screens/desktop/00-design-system-desktop.png",
  },
  {
    name: "mobile",
    width: 390,
    expected: "docs/ui-design/screens/mobile/00-design-system-mobile.png",
  },
] as const;

test.describe("design system visual", () => {
  for (const target of targets) {
    test(`${target.name} matches mockup 00`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== target.name, `runs in the ${target.name} project`);

      await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
      await page.goto("/design-system", { waitUntil: "load" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        const height = document.body.scrollHeight;
        for (let y = 0; y < height; y += 500) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        window.scrollTo(0, 0);
        await Promise.all(
          [...document.images].map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete && img.naturalWidth > 0) {
                  resolve();
                  return;
                }
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              }),
          ),
        );
      });

      fs.mkdirSync(outDir, { recursive: true });
      const actualPath = path.join(outDir, `${target.name}-actual.png`);
      const diffPath = path.join(outDir, `${target.name}-diff.png`);
      await page.screenshot({ path: actualPath, fullPage: true });

      const actual = PNG.sync.read(fs.readFileSync(actualPath));
      const expected = PNG.sync.read(fs.readFileSync(path.join(root, target.expected)));
      const width = Math.min(actual.width, expected.width);
      const height = Math.min(actual.height, expected.height);
      const diff = new PNG({ width, height });
      const mismatched = pixelmatch(
        crop(actual, width, height),
        crop(expected, width, height),
        diff.data,
        width,
        height,
        {
          threshold: 0.2,
        },
      );
      fs.writeFileSync(diffPath, PNG.sync.write(diff));

      const ratio = mismatched / (width * height);
      const heightDelta = Math.abs(actual.height - expected.height);
      expect(
        ratio,
        `${target.name} overlap diff ${(ratio * 100).toFixed(2)}% (${actual.width}x${actual.height} vs ${expected.width}x${expected.height}, height Δ ${heightDelta}px). See ${diffPath}`,
      ).toBeLessThan(0.08);
      expect(heightDelta, `${target.name} page height differs by ${heightDelta}px`).toBeLessThan(
        120,
      );
    });
  }
});

function crop(source: PNG, width: number, height: number) {
  const out = new PNG({ width, height });
  PNG.bitblt(source, out, 0, 0, width, height, 0, 0);
  return out.data;
}
