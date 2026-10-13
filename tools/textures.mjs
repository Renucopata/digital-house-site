// Phase 6 — pre-renders the blurred window/leaf shadow (drawn live with a CSS blur filter until
// Phase 5) into a small static image, so phones do not have to blur a full-section layer.
// (The paper grain stays an inline SVG data URI: rasterized once per 220px tile, no request.)
// Renders with headless Chrome (exact same rasterizer as the live SVGs), transparent background.
// Usage: node tools/textures.mjs <chrome.exe> <out dir>     e.g. node tools/textures.mjs
//        "C:/Program Files/Google/Chrome/Application/chrome.exe" public/textures
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

const [chromePath, outArg] = process.argv.slice(2);
if (!chromePath || !outArg) throw new Error("usage: node tools/textures.mjs <chrome.exe> <out dir>");
const outDir = resolve(outArg);
mkdirSync(outDir, { recursive: true });

// Same artwork as the Phase 2 WindowShadow component (viewBox 1200x800), ink = --burgundy-deep.
// Rendered at full opacity; the 0.07 opacity stays in CSS (avoids 8-bit alpha banding).
const INK = "#51020C";
const windowShadowSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"
     style="filter: blur(12px); color: ${INK}">
  <g fill="currentColor">
    <g transform="rotate(-32 900 200)">
      <rect x="640" y="-300" width="46" height="1400" />
      <rect x="980" y="-300" width="46" height="1400" />
      <rect x="560" y="330" width="560" height="38" />
    </g>
    <g transform="translate(150 120) rotate(18)">
      <path d="M0 0C120 90 230 170 380 300" fill="none" stroke="currentColor" stroke-width="7" />
      <ellipse cx="60" cy="30" rx="48" ry="17" transform="rotate(-20 60 30)" />
      <ellipse cx="95" cy="88" rx="52" ry="18" transform="rotate(62 95 88)" />
      <ellipse cx="160" cy="98" rx="55" ry="19" transform="rotate(-10 160 98)" />
      <ellipse cx="190" cy="165" rx="56" ry="19" transform="rotate(70 190 165)" />
      <ellipse cx="262" cy="170" rx="58" ry="20" transform="rotate(-4 262 170)" />
      <ellipse cx="280" cy="242" rx="54" ry="18" transform="rotate(66 280 242)" />
      <ellipse cx="350" cy="250" rx="50" ry="17" transform="rotate(8 350 250)" />
    </g>
  </g>
</svg>`;

const jobs = [
  // quarter resolution is plenty for a 12px blur; it is stretched with mask-size: cover
  { file: "window-shadow.webp", svg: windowShadowSvg, w: 1200, h: 800, scale: 0.25, format: "webp", quality: 70 },
];

const port = 9341;
const profile = join(tmpdir(), `dh-textures-${Date.now()}`);
const chrome = spawn(chromePath, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets = [];
for (let i = 0; i < 50 && !targets.length; i++) {
  try { targets = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter((t) => t.type === "page"); } catch {}
  await sleep(200);
}
const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Page.enable");
await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
for (const job of jobs) {
  await send("Emulation.setDeviceMetricsOverride", { width: job.w, height: job.h, deviceScaleFactor: job.scale, mobile: false });
  const html = `<!doctype html><html><head><style>html,body{margin:0;background:transparent;overflow:hidden}svg{display:block}</style></head><body>${job.svg}</body></html>`;
  await send("Page.navigate", { url: "data:text/html;base64," + Buffer.from(html).toString("base64") });
  let shot;
  for (let attempt = 0; attempt < 5 && !shot?.result; attempt++) {
    await sleep(800);
    shot = await send("Page.captureScreenshot", { format: job.format, ...(job.quality ? { quality: job.quality } : {}), clip: { x: 0, y: 0, width: job.w, height: job.h, scale: 1 } });
  }
  if (!shot.result) throw new Error(`capture failed for ${job.file}: ${JSON.stringify(shot.error)}`);
  writeFileSync(join(outDir, job.file), Buffer.from(shot.result.data, "base64"));
  console.log("wrote", join(outDir, job.file));
}
ws.close();
chrome.kill();
await sleep(500);
try { rmSync(profile, { recursive: true, force: true }); } catch {}
