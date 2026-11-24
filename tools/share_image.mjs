// Share image (P6): the old OG image (official wordmark + tagline) recolored to the artifact palette:
// cream lettering on velvet. Usage: node tools/share_image.mjs <source.png> public/share/og.png
import sharp from "sharp";
const [src, out] = process.argv.slice(2);
// lettering mask = how far each pixel is from the old background (luminance), stretched to 0–255
const { data, info } = await sharp(src).greyscale().raw().toBuffer({ resolveWithObject: true });
let min = 255, max = 0; for (const v of data) { if (v < min) min = v; if (v > max) max = v; }
const mask = Buffer.from(data.map((v) => Math.round(((v - min) / (max - min)) * 255)));
const cream = await sharp({ create: { width: info.width, height: info.height, channels: 3, background: "#fdf1e0" } })
  .joinChannel(mask, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();
await sharp({ create: { width: info.width, height: info.height, channels: 3, background: "#630a2a" } })
  .composite([{ input: cream }]).png({ compressionLevel: 9 }).toFile(out);
console.log(info.width, info.height, min, max);
