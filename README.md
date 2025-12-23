# MDX Blog

A beautiful, feature-rich MDX blog built with Next.js 15 and shadcn/ui. Features automatic table of contents with scroll spy, category badges, dark mode support, and SEO-ready schema markup.

![Blog Screenshot](./public/screenshot.png)

## Features

- 📝 **MDX Support** - Write posts in MDX with React components
- 📑 **Auto Table of Contents** - Generated from headings with scroll spy
- 🏷️ **Category Badges** - Customizable colored badges
- 🌙 **Dark Mode** - Full dark/light mode support
- 🔍 **SEO Ready** - Schema.org markup and meta tags
- 📱 **Responsive** - Mobile-first design
- ⚡ **Fast** - Built on Next.js 15 with Turbopack

## Installation

### Option 1: Use as a Template

Click "Use this template" on GitHub to create your own repository.

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO
cd YOUR_REPO
npm install
npm run dev
```

### Option 2: Add to Existing Project (shadcn CLI)

If you already have a Next.js project with shadcn/ui set up:

```bash
npx shadcn@latest add https://mdx-blog.vercel.app/r/blog.json
```

Then add the typography plugin to your `tailwind.config.ts`:

```typescript
plugins: [
  require("@tailwindcss/typography"),
  // ...other plugins
],
```

And create a `/posts` directory in your project root.

## Writing Posts

Create MDX files in the `/posts` directory:

```mdx
---
title: 'My First Post'
date: 'January 1st, 2025'
tldr: 'A brief summary of the post.'
author: 'Your Name'
authorImage: '/authors/your-image.png'
readingTime: '5 min read'
category: 'Tutorial'
description: 'Meta description for SEO.'
---

## Introduction

Your content here...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title |
| `date` | ✅ | Publication date |
| `category` | ✅ | Post category |
| `description` | ❌ | SEO meta description |
| `tldr` | ❌ | Summary shown at top |
| `author` | ❌ | Author name |
| `authorImage` | ❌ | Path to author avatar |
| `readingTime` | ❌ | Estimated read time |
| `tags` | ❌ | Array of tags |

### Default Categories

- `General` - Default category
- `Tutorial` - How-to guides
- `Guide` - In-depth guides
- `News` - Updates and news
- `Opinion` - Opinion pieces

Customize colors in `components/category-badge.tsx`.

## Customization

### Adding MDX Components

Edit `lib/mdx-components.tsx` to add custom components:

```tsx
import { MyComponent } from '@/components/my-component'

const components = {
  MyComponent,
  // ...existing components
}
```

Then use in your MDX:

```mdx
<MyComponent prop="value" />
```

### Styling

The blog uses Tailwind CSS Typography for prose styling. Customize in `tailwind.config.ts`:

```typescript
typography: {
  DEFAULT: {
    css: {
      // Your customizations
    }
  }
}
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Build registry (for distribution)
npm run registry:build
```

## Publishing Your Own Registry

1. Deploy this project to Vercel/Netlify
2. Run `npm run registry:build` to generate registry files
3. Others can install with:

```bash
npx shadcn@latest add https://YOUR_DOMAIN/r/blog.json
```

## License

MIT License - feel free to use this for any project!

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
