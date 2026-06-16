# Fashionova

Next.js e-commerce frontend for **Fashionava**. Browse products, manage a cart, check out, and run a small admin panel for products and orders.

This app talks to a separate backend API — it doesn't handle data on its own. Cart state lives in `localStorage`, product images go through Cloudinary, and auth uses an `access_token` cookie.

Built with atomic design (atoms → molecules → organisms), SCSS, and TypeScript.

## What it does

**Store**

- Home page with carousel, brands, categories, and product grid
- `/products` — full listing
- `/products/filters` — filter by price range or brand
- `/product/[id]` — product detail with quantity picker and related items slider
- `/cart` — add, remove, update quantities (persisted in localStorage)
- `/checkout` — delivery address, city/division pickers (Bangladesh, via GeoNames), order summary, payment options (COD, bKash, card)
- `/auth/signin` and `/auth/signup` — you need to be logged in to go from cart → checkout

**Admin** (`/admin`)

- Create products (name, description, price, color, brand, promo code, image)
- View and edit products at `/admin/products` and `/admin/[pid]`
- View orders, update delivery details, delete with a confirmation dialog
- Images upload to Cloudinary before hitting the API

Sidebar links for Banners, Users, Employee, and Report are placeholders for now.

## Versions

Use these — other Node versions tend to cause install issues with Sass:

- Node **20.27.0**
- npm **10.8.2**
- Next.js 13.0.7
- React 18.2.0
- TypeScript 4.9.4

```bash
nvm install 20.27.0
nvm use 20.27.0
node -v   # v20.27.0
npm -v    # 10.8.2
```

## Setup

Clone the repo, install, add env vars, start the backend, then run the frontend.

```bash
git clone <your-repo-url>
cd Ecommerce-NextJs
npm install
```

If you skip `NEXT_PUBLIC_API_URL`, dev falls back to `http://localhost:4000` and production uses the Render backend at `https://backend-api-ecommerce-l46n.onrender.com`.

**Backend:** Here is the repo link for this frontend backedn https://github.com/Jaima-Jarnaz/Backend-Api-Ecommerce

**Start the backend first** on port 4000. Without it, products, auth, and orders won't load.

```bash
npm run dev
```

App runs at http://localhost:3000

Production build:

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm start` — serve the build
- `npm run lint` — eslint
- `npm run export` — static export (Next 13)

## Folder layout

```
components/     atoms, molecules, organisms
contexts/       cart state (CartProvider)
helpers/        apiClient, apiRoutes, baseUrl, config, imageUpload, db
pages/          routes — admin, auth, cart, checkout, product, products
settings/       static images, brand logos, copy
styles/         global SCSS
templates/      storefront layout + admin layout
middleware.ts   redirects logged-in users away from auth pages
```

API calls go through `helpers/apiClient.ts` (`fetchJson`) and endpoint paths in `helpers/apiRoutes.ts`.

## Routes

| Path                         | What           |
| ---------------------------- | -------------- |
| `/`                          | Home           |
| `/products`                  | All products   |
| `/products/filters`          | Filtered list  |
| `/product/[id]`              | Product detail |
| `/cart`                      | Cart           |
| `/checkout`                  | Place order    |
| `/auth/signin`               | Login          |
| `/auth/signup`               | Register       |
| `/admin`                     | Add product    |
| `/admin/products`            | Product list   |
| `/admin/[pid]`               | Edit product   |
| `/admin/orders`              | Order list     |
| `/admin/orders/update/[oid]` | Edit order     |

## Troubleshooting

**`npm install` fails or Sass won't compile**

Usually a Node version mismatch. Switch to 20.27.0, wipe `node_modules`, reinstall:

```bash
nvm use 20.27.0
rm -rf node_modules package-lock.json
npm install
```

On Mac, `node-gyp` errors often mean Xcode CLI tools are missing: `xcode-select --install`

**Pages are empty / fetch errors in console**

The backend isn't running or the URL is wrong. Check it's up on `:4000`, restart the dev server. If you're hitting the Render API, give it a minute on first load — free tier goes to sleep.

**Port 3000 taken**

```bash
lsof -ti:3000 | xargs kill -9
# or
PORT=3001 npm run dev
```

**Admin image upload fails**

Cloudinary env vars are missing or the upload preset isn't set up. You need an unsigned preset in the Cloudinary dashboard. Restart dev server after changing `.env.local`.

**Checkout city/division dropdowns empty**

GeoNames username isn't valid or the free web service isn't enabled on your account. The form still works — you just won't get the dropdown data. Check console for `Failed to fetch geonames data`.

**Checkout sends me to sign-in**

That's intentional. Cart → checkout checks for the `access_token` cookie. Log in first.

**Cart acting weird**

Sign out clears everything, or manually clear in DevTools:

```js
localStorage.removeItem("cartItems");
localStorage.removeItem("total_card_items");
localStorage.removeItem("total_products");
```

**Autoprefixer warnings in the terminal**

Stuff like `consider using flex-start instead` — harmless, ignore it.

**Build fails on types**

Run `npm run lint`, fix what's reported, try `npm run build` again.

**Logged in but cookie seems gone**

Check DevTools → Application → Cookies for `access_token`. If it's not there, the backend response might be the issue. Middleware will bounce you off `/auth/signin` once the cookie is set — that's working as expected.

## Deploy

There's a GitHub Actions workflow at `.github/workflows/gh-pages.yml` that builds on push to `main`. Bump `node-version` to `20.27.0` in there if you're using it.
