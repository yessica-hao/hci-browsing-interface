# Fashion Browsing Study — Prototype

Frontend-only prototype for the HCI2000 study *Single-Item Swipe-Based Browsing vs. Multi-Item Grid-Based Browsing*.
Plain HTML/CSS/JavaScript: no install, no build step, no backend, no tracking.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | App shell |
| `css/styles.css` | Visual design (colors are tokens at the top) |
| `js/app.js` | Flow, swipe carousel, grid, detail view, confirmation |
| `data/products.js` | **Product sets — edit this file to change products** |
| `images/set1/`, `images/set2/` | Product images (currently placeholder illustrations) |

## Running it

**On a computer:** double-click `index.html`, or run a local server (below).

**On a phone (same Wi-Fi as your computer):**
```bash
cd ~/Desktop/hci
python3 -m http.server 8000
```
Find your computer's IP address (System Settings → Wi-Fi → Details), then open `http://<that-ip>:8000` on the phone.

**Recommended for sessions:** host the folder on any static host (e.g. drag the folder onto Netlify Drop, or use GitHub Pages).
Then, on the phone, choose **Share → Add to Home Screen** and launch it from there. It runs full-screen with no browser
bars, so participants can't accidentally tap the address bar or browser buttons.

## Replacing product images

1. Put the photos in `images/set1/` and `images/set2/` (jpg/png/webp are fine; portrait 3:4, e.g. 900×1200, fits best).
2. In `data/products.js`, update each product's `image` path (and `name` / `price` if needed).

No interface code needs to change. Keep both sets the same length, and keep matching categories at the same positions.

## Experimental flow

Welcome → Interface order (researcher picks *Swipe first* or *Grid first*) → Task instructions → Part 1 browsing
(Product Set 1) → Confirmation → Transition (pause for Google Forms; researcher taps *Continue to Part 2*) →
Task instructions → Part 2 browsing (Product Set 2) → Confirmation → Completion.

- Set 1 is always used in Part 1 and Set 2 in Part 2, whatever the order.
- The completion screen does not restart by itself. Use *Researcher: start a new session* for the next participant.
- If the page is reloaded by accident, it reopens on the same screen and product (stored in the browser tab only).
- The browser's Back gesture can't leave the study. While browsing, Back closes the confirmation or the grid detail view.
