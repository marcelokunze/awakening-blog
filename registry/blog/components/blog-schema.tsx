import { PostMeta } from '@/lib/mdx'

interface BlogSchemaProps {
  post: PostMeta
  slug: string
  siteUrl?: string
  siteName?: string
}

export default function BlogSchema({ 
  post, 
  slug, 
  siteUrl = 'https://example.com',
  siteName = 'My Blog'
}: BlogSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || post.tldr,
    "author": {
      "@type": "Person",
      "name": post.author || 'Anonymous'
    },
    "datePublished": post.date,
    "url": `${siteUrl}/blog/${slug}`,
    "publisher": {
      "@type": "Organization",
      "name": siteName
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

