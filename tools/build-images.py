#!/usr/bin/env python3
"""
Build graded, compressed WebP images for the site from images/originals/.

Every photo gets the same editorial grade (desaturated, slightly darker, cool
graphite shadows) so the yard reads as one consistent set.

Usage:
    python3 -m venv .venv && .venv/bin/pip install pillow
    .venv/bin/python tools/build-images.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images" / "originals"
OUT = ROOT / "images"

GRAPHITE = (14, 15, 17)
COPPER = (184, 115, 51)

# name: (source file, crop box (left, top, right, bottom) or None, output widths)
CROPS = {
    "hero-wide":       ("yard-aluminium-scrap.jpg", (0, 560, 1308, 1296), [1308, 960, 640]),
    "hero-tall":       ("yard-aluminium-scrap.jpg", (154, 240, 1154, 1600), [1000, 720]),
    "mat-aluminium":   ("yard-aluminium-scrap.jpg", (320, 1000, 832, 1600), [512]),
    "mat-copper":      ("yard-containers.jpg", (0, 1040, 448, 1600), [448]),
    "yard-signboard":  ("signboard.jpg", None, [1400, 800]),
    "yard-gate":       ("entrance-gate.jpg", None, [1200, 720]),
    "yard-containers": ("yard-containers.jpg", (120, 420, 1296, 1600), [1000, 640]),
    "yard-aluminium":  ("yard-aluminium-scrap.jpg", (0, 300, 1308, 1600), [1000, 640]),
}


def grade(img: Image.Image) -> Image.Image:
    img = img.convert("RGB")
    img = ImageEnhance.Color(img).enhance(0.5)
    img = ImageEnhance.Contrast(img).enhance(1.12)
    img = ImageEnhance.Brightness(img).enhance(0.82)
    tint = Image.new("RGB", img.size, GRAPHITE)
    return Image.blend(img, tint, 0.14)


def build_crops() -> None:
    for name, (src, box, widths) in CROPS.items():
        img = Image.open(SRC / src)
        if box:
            r, b = min(box[2], img.width), min(box[3], img.height)
            img = img.crop((box[0], box[1], r, b))
        img = grade(img)
        for w in widths:
            w = min(w, img.width)
            h = round(img.height * w / img.width)
            out = OUT / f"{name}-{w}.webp"
            img.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=72, method=6)
            print(f"{out.relative_to(ROOT)}  {w}x{h}  {out.stat().st_size // 1024} KB")


def font(size: int) -> ImageFont.FreeTypeFont:
    for path in ("/System/Library/Fonts/Helvetica.ttc",
                 "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def build_og() -> None:
    """1200x630 Open Graph card: graded yard photo, dark fade, headline."""
    img = Image.open(SRC / "yard-aluminium-scrap.jpg").crop((0, 620, 1308, 1307))
    img = grade(img).resize((1200, 630), Image.LANCZOS)
    fade = Image.new("L", (1200, 630))
    fd = ImageDraw.Draw(fade)
    for x in range(1200):
        fd.line([(x, 0), (x, 630)], fill=int(238 * min(1.0, max(0.0, 1 - (x - 560) / 640))))
    img = Image.composite(Image.new("RGB", img.size, GRAPHITE), img, fade)
    d = ImageDraw.Draw(img)
    d.line([(72, 96), (132, 96)], fill=COPPER, width=2)
    d.text((72, 116), "NAJMAT AL SAHEL", font=font(26), fill=(201, 205, 210))
    d.text((72, 300), "Aluminium & Copper Scrap.", font=font(58), fill=(242, 240, 236))
    d.text((72, 370), "Traded Right.", font=font(58), fill=(201, 205, 210))
    d.text((72, 520), "Licensed wholesale scrap trader  ·  Sharjah, UAE  ·  Since 2016",
           font=font(22), fill=(138, 143, 152))
    out = OUT / "og.jpg"
    img.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{out.relative_to(ROOT)}  1200x630  {out.stat().st_size // 1024} KB")


def build_icon() -> None:
    """180x180 apple-touch-icon: thin copper star on graphite."""
    s = 180
    img = Image.new("RGB", (s, s), GRAPHITE)
    d = ImageDraw.Draw(img)
    import math
    cx, cy, ro, ri = s / 2, s / 2 + 4, 58, 24
    pts = []
    for i in range(10):
        r = ro if i % 2 == 0 else ri
        a = -math.pi / 2 + i * math.pi / 5
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    d.polygon(pts, outline=COPPER, width=5)
    img.save(ROOT / "apple-touch-icon.png", optimize=True)
    print("apple-touch-icon.png  180x180")


if __name__ == "__main__":
    build_crops()
    build_og()
    build_icon()
