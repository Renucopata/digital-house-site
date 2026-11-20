// Builds src/components/home/walkers.svg.ts from the new two26-style drawing.
import fs from "node:fs";
const [src, out] = process.argv.slice(2);
let s = fs.readFileSync(src, "utf8").replace(/<!--[\s\S]*?-->/g, "");
s = s.replace(/class="([^"]*)"/g, (_, v) => `class="${v.trim().split(/\s+/).map((c) => `wk-${c}`).join(" ")}"`);
const css = [
  ".wk-leg{transform-box:fill-box;transform-origin:50% 0}",
  ".wk-legA{animation:wk-stride 1.1s ease-in-out infinite}",
  ".wk-legB{animation:wk-stride 1.1s ease-in-out infinite;animation-delay:-.55s}",
  ".wk-bob{animation:wk-bob .55s ease-in-out infinite alternate}",
  ".wk-hair{transform-box:fill-box;transform-origin:70% 8%;animation:wk-sway 1.1s ease-in-out infinite alternate}",
  ".wk-sign{transform-box:fill-box;transform-origin:50% 50%;animation:wk-wig 1.1s ease-in-out infinite alternate}",
  ".wk-b2,.wk-s2{animation-delay:-.45s}",
  ".wk-spiral{fill:none;stroke:#d63b36;stroke-width:9;stroke-linecap:round;stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:wk-draw 2.6s ease-in-out infinite alternate}",
  ".wk-spiral.wk-s2{animation-delay:.7s}",
  // the stride is drawn in, so the swing is smaller than before
  "@keyframes wk-stride{0%,100%{transform:rotate(7deg)}50%{transform:rotate(-7deg)}}",
  "@keyframes wk-bob{to{transform:translateY(-5px)}}",
  "@keyframes wk-draw{0%{stroke-dashoffset:var(--len)}60%,100%{stroke-dashoffset:0}}",
  "@keyframes wk-sway{from{transform:rotate(-2.5deg)}to{transform:rotate(2.5deg)}}",
  "@keyframes wk-wig{from{transform:rotate(-1.8deg)}to{transform:rotate(1.8deg)}}",
  "@media (prefers-reduced-motion:reduce){.wk-leg,.wk-bob,.wk-hair,.wk-sign,.wk-spiral{animation:none!important}.wk-spiral{stroke-dashoffset:0}}",
].join("");
s = s.replace(/<svg [^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 570" overflow="visible" aria-hidden="true" focusable="false"><style>${css}</style>`);
s = s.replace(/\n\s*/g, "\n").trim();
fs.writeFileSync(out,
  "// Hero illustration (user, 2026-11-20): our own two walkers drawn in two26's style (thin sketchy ink lines,\n" +
  "// grainy paprika / ink fills, boards with crayon letters). He has curly hair and holds a \"d\"; she wears\n" +
  "// glasses and holds an \"H\". Classes and filter ids are prefixed wk- so the embedded CSS stays scoped.\n" +
  `export const walkersSvg = ${JSON.stringify(s)};\n`);
console.log("bytes", s.length);
