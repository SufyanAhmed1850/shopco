# SHOP.CO

A pixel-faithful recreation of the [SHOP.CO e-commerce website template](https://www.figma.com/design/mEwzlIdeLXALAj46754zGj/E-commerce-Website-Template--Freebie---Community-) (Figma Community freebie), rebuilt as a modern, fully interactive React application.

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS 4** (design-system tokens in `@theme`)
- **React Router** — Home, Category, Product Detail, Cart
- **Shadcn-style UI primitives** (`src/components/ui`) themed to the Figma design system, built on Base UI interaction patterns
- **Lucide** icons

## Design system

- Typography: **Satoshi** (body) + **Integral CF** (display/logo), loaded from Fontshare
- Colors: ink `#000`, paper `#fff`, hero `#f2f0f1`, card surface `#f0eeed`, sale red `#ff3333`, star gold `#ffc633`
- 1240px desktop content width, 20px card radii, pill buttons

## Features

- Homepage: hero with stats, brand strip, New Arrivals, Top Selling, Browse by Dress Style, testimonial carousel, newsletter + footer
- Category page: working filters (category, price slider, colors, sizes, dress style), sorting, pagination, mobile filter sheet
- Product page: image gallery, color/size selection, quantity stepper, tabs (details / reviews / FAQs), review list, "You might also like"
- Cart: quantity editing, line removal, promo code (`SAVE20` for 20% off), order summary — persisted to `localStorage`

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
```

## Deploy (Cloudflare Pages)

```bash
npm run build
npx wrangler pages deploy dist --project-name shopco
```
