# Awakening Blog

A beautiful, feature-rich MDX blog built with Next.js 15 and shadcn/ui. Features automatic table of contents with scroll spy, category badges, dark mode support, and SEO-ready schema markup.

## Features

- 📝 **MDX Support** - Write posts in MDX
- 🎛 **React & Shadcn Components** - Inject custom components into your articles
- 🔍 **SEO Optimized** - Schema.org markup and meta tags
- 🌙 **Dark Mode** - Full dark/light mode support
- 📱 **Responsive** - Mobile-first design
- 📑 **Table of Contents** - Generated from headings with scroll spy
- 🏷️ **Category Badges** - Customizable colored badges

## Installation

### Option 1: Add to Existing Project (Recommended)

If you already have a Next.js project with shadcn/ui set up, install with a single command:

```bash
npx shadcn@latest add https://awakening-blog.com/r/blog.json
```

*This will add:*

#### Dependencies
- `next-mdx-remote` - MDX rendering
- `gray-matter` - Frontmatter parsing
- `@tailwindcss/typography` - Prose styling

#### shadcn/ui Components
- `avatar` - Author avatars
- `badge` - Category badges
- `card` - Blog post cards

#### Files
| File | Description |
|------|-------------|
| `app/blog/layout.tsx` | Blog layout wrapper |
| `app/blog/page.tsx` | Blog listing page |
| `app/blog/[slug]/page.tsx` | Individual post page |
| `lib/mdx.ts` | MDX parsing & ToC extraction |
| `lib/mdx-components.tsx` | Custom MDX components |
| `components/table-of-contents.tsx` | Scroll-spy ToC |
| `components/blog-card.tsx` | Post preview cards |
| `components/category-badge.tsx` | Category badges |
| `components/blog-schema.tsx` | SEO schema markup |

### After Installation

After running the install command, copy and paste this prompt to your AI assistant to complete the setup:

```
I just installed an MDX blog using shadcn registry. Please help me complete the setup:

1. Add `require("@tailwindcss/typography")` to the plugins array in my tailwind.config.ts

2. Create a `posts/` folder in my project root

3. Create my first blog post at `posts/hello-world.mdx` with this frontmatter:
   - title: "Hello World"
   - date: today's date formatted like "January 1st, 2025"
   - category: "General"
   - description: "My first blog post"
   - author: "Your Name"
   - readingTime: "2 min read"
   Add some example content with a few h2 headings to demonstrate the table of contents.

4. Add a "Blog" link to my navbar that links to /blog
```

### Or mannually follow these steps

1. Add the typography plugin to your `tailwind.config.ts`:

```typescript
plugins: [
  require("@tailwindcss/typography"),
  // ...other plugins
],
```

2. Create a `posts/` directory in your project root

3. Add your first `.mdx` post (see [Writing Posts](#writing-posts))

4. Visit `/blog` to see your posts

### Option 2: Use as a Template

Click "Use this template" on GitHub to create your own repository.

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO
cd YOUR_REPO
npm install
npm run dev
```

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

## Another Section

More content with **bold**, *italic*, and [links](https://example.com).

### Subsection

The table of contents automatically picks up h2, h3, and h4 headings!
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Post title |
| `date` | ✅ | Publication date (e.g., "January 1st, 2025") |
| `category` | ✅ | Post category |
| `description` | ❌ | SEO meta description |
| `tldr` | ❌ | Summary shown at top of post |
| `author` | ❌ | Author name |
| `authorImage` | ❌ | Path to author avatar |
| `readingTime` | ❌ | Estimated read time |
| `tags` | ❌ | Array of tags |

### Default Categories

| Category | Color |
|----------|-------|
| `General` | Slate |
| `Tutorial` | Blue |
| `Guide` | Green |
| `News` | Amber |
| `Opinion` | Purple |
| `Origins` | Amber |

Customize colors in `components/category-badge.tsx`.

## Using Components in MDX

You can use React components directly in your MDX files:

```mdx
<Image 
  src="https://example.com/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="rounded-md"
/>
```

### Adding Custom Components

Edit `lib/mdx-components.tsx` to add your own components:

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

## Customization

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

### Theme Colors

Edit CSS variables in `app/globals.css` to customize the color scheme.

## License

MIT License - feel free to use this for any project!

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)