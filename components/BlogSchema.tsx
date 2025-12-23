interface BlogSchemaProps {
  post: {
    title: string;
    description?: string;
    tldr?: string;
    author?: string;
    date: string;
    content: string;
    readingTime?: string;
    category?: string;
  };
  slug: string;
}

const BlogSchema = ({ post, slug }: BlogSchemaProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.zenpersonal.app/blog/${slug}`
    },
    "headline": post.title,
    "description": post.description || post.tldr,
    ...(post.author && {
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }),
    "datePublished": post.date,
    "dateModified": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "ZenPersonal",
      "url": "https://www.zenpersonal.app"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default BlogSchema;