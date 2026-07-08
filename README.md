# ZeroPulse — Print-on-Demand Art Shop

Static storefront for original artwork prints, canvas, and apparel. Cart/checkout via Snipcart, fulfillment via Gelato, hosted on Netlify at zeropulse.art.

## Setup checklist

1. **Snipcart API key**
   In `index.html`, replace `YOUR_PUBLIC_API_KEY` with your public key from the [Snipcart dashboard](https://app.snipcart.com/dashboard/account/credentials).

2. **Add your logo**
   Drop your logo file into `images/web/logo.png` (keep it small — a few hundred KB max, since it loads on every page view).

3. **Add real products**
   Edit `products.json`. Each product needs:
   - `id` — unique slug, no spaces
   - `type` — `"print"` or `"apparel"` (used by the filter buttons)
   - `image` — path to the **web-sized** image (see Image Guidelines below)
   - `variants` — array of `{ label, price }` — these become size/format options in the cart

4. **Upload print-quality masters to Gelato**
   Do this directly in your Gelato dashboard when creating each product there — **do not** commit large print files to this repo. See Image Guidelines below.

5. **Connect Gelato fulfillment**
   Set up a Snipcart webhook (`order.completed`) that creates a matching order in Gelato via their API. This is the piece that automates fulfillment — flag when you're ready to wire this up.

6. **Deploy**
   - Push this repo to GitHub
   - Connect the repo to Netlify (New site from Git)
   - Point `zeropulse.art` at the Netlify site (Netlify DNS or your registrar's DNS settings)

## Image guidelines

| Purpose | Location | Specs |
|---|---|---|
| Website display | `images/web/` (committed to repo) | ~1500–2000px long edge, JPEG/WebP, under ~400KB |
| Print fulfillment | Uploaded directly to Gelato (**not** in this repo) | 300 DPI at actual print size (e.g. 16×20" ≈ 4800×6000px), TIFF or high-quality JPEG |

Keeping print masters out of git keeps the repo small and deploys fast.

## File structure

```
index.html        — main page, product grid, Snipcart embed
css/style.css      — styling
js/main.js         — fetches products.json, renders cards, wires up cart buttons
products.json      — product catalog (edit this to add/change products)
netlify.toml       — Netlify build config
images/web/        — web-optimized images only
```
