"""Take NusaStats screenshots with the VM-verified Playwright setup."""
import sys
from playwright.sync_api import sync_playwright

SHOTS = [
    ("1-home.jpg", "#/", 1280, 800, None),
    ("2-economy.jpg", "#/economy", 1280, 800, ".chart-block"),
    ("3-regions.jpg", "#/regions", 1280, 800, None),
    ("4-home-phone.jpg", "#/", 390, 844, None),
]

BASE = "file:///home/hatch/workspace/makefun-work/nusa-stats-indonesia/app/index.html"
OUT = "/home/hatch/workspace/makefun-work/nusa-stats-indonesia/screenshots/"

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path="/home/hatch/.cache/ms-playwright/chromium-wrapper.sh",
        args=["--no-sandbox", "--disable-dev-shm-usage",
              "--allow-file-access-from-files"],
    )
    errors = []
    for name, route, width, height, scroll_to in SHOTS:
        page = browser.new_page(viewport={"width": width, "height": height})
        page.on("console", lambda m: errors.append(f"{name} console {m.type}: {m.text}") if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(f"{name} pageerror: {e}"))
        page.goto(BASE + route, wait_until="load")
        page.wait_for_function("window.__shotReady === true", timeout=10000)
        page.wait_for_timeout(400)
        if scroll_to:
            # Bring the chart fully into the viewport so its axis labels show.
            page.evaluate(f"document.querySelector('{scroll_to}').scrollIntoView()")
            page.evaluate("window.scrollBy(0, -70)")
            page.wait_for_timeout(300)
        page.screenshot(path=OUT + name, type="jpeg", quality=82)
        print("shot", name, width, "x", height)
        page.close()
    browser.close()

print("console/page errors:", errors if errors else "none")
