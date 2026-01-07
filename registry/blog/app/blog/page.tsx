import { BlogCard } from "@/components/blog-card"
import { getAllPosts } from '@/lib/mdx'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest articles and insights.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-4">Blog</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Read our latest articles and insights.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
            >
              <BlogCard
                category={post.category || 'General'}
                title={post.title}
                description={post.description || ''}
                date={post.date}
                readTime={post.readingTime || ''}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}







