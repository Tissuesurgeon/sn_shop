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
    expected: "docs/ui-design/screens/desktop/21-admin-login-desktop.png",
  },
  {
    name: "mobile",
    width: 390,
    expected: "docs/ui-design/screens/mobile/21-admin-login-mobile.png",
  },
] as const;

test.describe("admin login visual", () => {
  for (const target of targets) {
    test(`${target.name} matches mockup 21`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== target.name, `runs in the ${target.name} project`);

      await page.setViewportSize({
        width: target.width,
        height: target.name === "desktop" ? 960 : 844,
      });
      await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
      await page.goto("/admin/login", { waitUntil: "load" });
      await page.evaluate(async () => {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 3000)),
        ]);
        await Promise.all(
          [...document.images].map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) {
                  resolve();
                  return;
                }
                const done = () => resolve();
                img.addEventListener("load", done, { once: true });
                img.addEventListener("error", done, { once: true });
                setTimeout(done, 2000);
              }),
          ),
        );
      });

      fs.mkdirSync(outDir, { recursive: true });
      const actualPath = path.join(outDir, `login-${target.name}-actual.png`);
      const diffPath = path.join(outDir, `login-${target.name}-diff.png`);
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
        { threshold: 0.2 },
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

test.describe("admin access", () => {
  test("owner signs in and a customer is turned away", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "runs once on desktop");
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;
    expect(email, "SEED_ADMIN_EMAIL").toBeTruthy();
    expect(password, "SEED_ADMIN_PASSWORD").toBeTruthy();

    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);

    await page.getByLabel("Email").fill(email!);
    await page.getByLabel("Password").fill(password!);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("heading", { name: /Good morning/ })).toBeVisible({ timeout: 15_000 });

    await page.context().clearCookies();
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill("customer@snstitches.com");
    await page.getByLabel("Password").fill(password!);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("You don't have access.")).toBeVisible();
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

function crop(source: PNG, width: number, height: number) {
  const out = new PNG({ width, height });
  PNG.bitblt(source, out, 0, 0, width, height, 0, 0);
  return out.data;
}
