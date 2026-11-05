import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

src_dir = Path(sys.argv[1]); out_dir = Path(sys.argv[2])
jobs = [("raci.html", "raci-pm-po-rte-sm.png"), ("delivery.html", "scrum-master-delivery-lead.png")]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for src, out in jobs:
        pg = b.new_page(viewport={"width": 1200, "height": 627}, device_scale_factor=1)
        pg.goto((src_dir / src).as_uri(), wait_until="load")
        pg.wait_for_timeout(300)
        pg.screenshot(path=str(out_dir / out))
        print(out)
    b.close()
