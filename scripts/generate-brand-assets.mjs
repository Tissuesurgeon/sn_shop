import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "docs/assets/sn-stitches-logo.png");
const brand = path.join(root, "public/brand");
const cream = { r: 251, g: 246, b: 238, alpha: 1 };

fs.mkdirSync(brand, { recursive: true });
fs.copyFileSync(source, path.join(brand, "sn-stitches-logo.png"));
fs.copyFileSync(path.join(root, "docs/ui-design/img/logo.webp"), path.join(brand, "logo.webp"));

const trimmed = sharp(source).trim({ threshold: 8 });
const trimmedBuffer = await trimmed.png().toBuffer();
await sharp(trimmedBuffer).png().toFile(path.join(brand, "logo.png"));

async function squareIcon(size, dest) {
  const inner = Math.round(size * 0.86);
  const mark = await sharp(trimmedBuffer)
    .resize(inner, inner, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(dest);
}

await squareIcon(512, path.join(root, "app/icon.png"));
await squareIcon(180, path.join(root, "app/apple-icon.png"));
await squareIcon(192, path.join(brand, "icon-192.png"));
await squareIcon(512, path.join(brand, "icon-512.png"));
await squareIcon(64, path.join(brand, "favicon.png"));

const ogMark = await sharp(trimmedBuffer)
  .resize(720, 460, { fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: cream },
})
  .composite([{ input: ogMark, gravity: "centre" }])
  .png()
  .toFile(path.join(brand, "og.png"));

console.log("Brand assets written to public/brand, app/icon.png, and app/apple-icon.png");
