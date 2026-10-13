TOOLS — asset analysis & processing scripts (not part of the website build)

Setup (Python 3.11+), from the project root:
  python -m venv tools/.venv
  tools/.venv/Scripts/python -m pip install -r tools/requirements.txt      (Windows)
  tools/.venv/bin/python -m pip install -r tools/requirements.txt          (macOS/Linux)
Run every script with `python -I` (isolated mode) and pass paths as arguments.

Script          Phase  What it does                                              Usage
--------------  -----  --------------------------------------------------------  ------------------------------------------
analyze.py      0      Image inventory, k-means palette, logo ink/background      analyze.py brand-assets tools/.out
                       measurements, sampled colors → analysis.json
render_pdf.py   0      Renders PDF pages to PNG; lists fonts/images per page     render_pdf.py brand-assets tools/.out/pdf
fontcmp.py      0      Compares logo lettering ("digital", "HOUSE",               fontcmp.py "brand-assets/WhatsApp Image
                       "GROWTH STUDIO") with candidate fonts: shape IoU,          2026-10-07 at 7.21.04 PM (4).jpeg"
                       width ratio, overlay sheets                                tools/.fonts tools/.out
                       Needs the candidate .ttf files in tools/.fonts (download
                       from github.com/google/fonts, ofl/<family>/).
logos.py        1      Crops the logos and re-composites their ink coverage      logos.py brand-assets public/brand tools/.out
                       with exact token colors → public/brand/*.png (+ previews)
icons.py        2      favicon.ico (16/32/48), icon.png (512), apple-icon.png     icons.py public/brand src/app
                       (180) from public/brand/logo-monogram-cream.png
photos.py       3      Crops of the approved brand photos (D22) into             photos.py brand-assets public/images
                       public/images/ (hero-camara-dh.jpg = IMG-2, camera only)

Crop boxes and colors are hard-coded from the Phase 0 measurements (docs/phase-0-discovery.txt);
re-check them if a source image changes. Output folders tools/.out, tools/.fonts and tools/.venv
are git-ignored.
