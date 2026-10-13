"""Phase 6 — Open Graph / social share image (1200x630) for the Next.js file convention.

Composition: flat --burgundy-deep ground (the official cream wordmark file's own background, D20),
the wordmark centered at its native size (never re-typeset, D8), a thin ivory hairline and the
positioning line (CLAUDE.md §1) as a Poppins 400 uppercase label with ~0.35em tracking (§4.3).

Usage: python -I tools/og.py <public/brand dir> <Poppins-Regular.ttf> <src/app dir>
Writes opengraph-image.png and twitter-image.png (same picture) into <src/app dir>.
"""
import os
import shutil
import sys

from PIL import Image, ImageDraw, ImageFont

brand, font_path, app = sys.argv[1:4]
W, H = 1200, 630
BG = (0x51, 0x02, 0x0C)  # --burgundy-deep
IVORY = (0xF3, 0xEB, 0xE0)  # --ivory
TAGLINE = "NO VENDEMOS ESTÉTICA. VENDEMOS CRECIMIENTO."
SIZE = 19
TRACKING = 0.35  # em

canvas = Image.new("RGB", (W, H), BG)
logo = Image.open(os.path.join(brand, "logo-wordmark-cream.png")).convert("RGB")
font = ImageFont.truetype(font_path, SIZE)
draw = ImageDraw.Draw(canvas)

# tracked label: advance each glyph by its width + tracking (no trailing space after the last one)
track = SIZE * TRACKING
advances = [font.getlength(ch) + track for ch in TAGLINE]
text_w = sum(advances) - track
ascent, descent = font.getmetrics()

gap_logo_rule, gap_rule_text = 44, 40
block_h = logo.height + gap_logo_rule + 1 + gap_rule_text + ascent + descent
top = (H - block_h) // 2

canvas.paste(logo, ((W - logo.width) // 2, top))
rule_y = top + logo.height + gap_logo_rule
draw.line([(W // 2 - 28, rule_y), (W // 2 + 28, rule_y)], fill=IVORY, width=1)

x = (W - text_w) / 2
y = rule_y + 1 + gap_rule_text
for ch, adv in zip(TAGLINE, advances):
    draw.text((x, y), ch, font=font, fill=IVORY)
    x += adv

out = os.path.join(app, "opengraph-image.png")
canvas.save(out, optimize=True)
shutil.copyfile(out, os.path.join(app, "twitter-image.png"))
print(f"opengraph-image.png / twitter-image.png  {os.path.getsize(out) // 1024 + 1} KB")
