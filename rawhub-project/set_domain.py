#!/usr/bin/env python3
"""Usage: python3 set_domain.py https://yourdomain.com
Replaces the placeholder domain in index.html, robots.txt, sitemap.xml and README.md."""
import sys, pathlib, datetime
OLD = "https://raw-hub.vercel.app"
if len(sys.argv) != 2 or not sys.argv[1].startswith("https://"):
    sys.exit("Usage: python3 set_domain.py https://yourdomain.com")
new = sys.argv[1].rstrip("/")
root = pathlib.Path(__file__).parent
for name in ["index.html", "robots.txt", "sitemap.xml", "README.md"]:
    p = root / name
    t = p.read_text(encoding="utf-8").replace(OLD, new)
    if name == "sitemap.xml":
        import re
        t = re.sub(r"<lastmod>.*?</lastmod>", f"<lastmod>{datetime.date.today()}</lastmod>", t)
    p.write_text(t, encoding="utf-8")
    print("updated", name)
