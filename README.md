# NB Rituals React catalogue

A responsive React + Vite product catalogue inspired by the supplied NB Rituals poster. Exhibition-specific details have been left out.

## Run locally
1. Install Node.js (LTS) if needed.
2. Extract this folder and open a terminal in it.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite.

## Update products and images
- Product entries are in `src/main.jsx` in the `products` array.
- Put each real product image in `public/images/` and update its `image` path.
- Replace `public/images/logo.jpg` with a clean, high-resolution logo file when available.
- The included images are crops from the supplied poster, so they are starter images, not original full-resolution product photos.
- Prices are omitted for now. Add a `price` field and display it if you want prices on product cards.

## WhatsApp
The code uses the number from the poster with India's country code: `919151613141`. Confirm that this is the WhatsApp number before publishing.

## Deployment
Build with `npm run build`. Deploy the generated `dist` folder to a static host such as Netlify, Vercel, or GitHub Pages (configure the host for Vite/React).
