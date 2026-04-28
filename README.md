## OdooBangladesh.com

Community-driven, SEO-first Odoo portal for Bangladesh.

- **Positioning**: independent community + learning hub (not an agency site)
- **Stack**: Next.js App Router + Tailwind + MDX content collections
- **Publishing model**: programmatic SEO via `content/*` collections

See `docs/PROJECT_BLUEPRINT.md` for wireframe, SEO silos, schema recommendations, CMS/course architecture, and scaling plan.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Content publishing

Add MDX files in:

- `content/blog` → `/blog/[slug]`
- `content/landings` → `/landings/[slug]` and keyword redirects like `/odoo-accounting-bangladesh`
- `content/modules` → `/modules/[slug]`
- `content/industries` → `/industries/[slug]`
- `content/comparisons` → `/comparisons/[slug]` and short canonical URLs when configured
- `content/training-functional` → `/training/functional/[slug]`
- `content/training-technical` → `/training/technical/[slug]`
- `content/resources` → `/resources/[slug]`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
