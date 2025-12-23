import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedPosts } from "@/lib/mdx";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">MDX Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A beautiful MDX blog with automatic table of contents, category badges, and shadcn/ui components.
          </p>
        </div>

        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <BlogCard
                    category={post.category}
                    title={post.title}
                    description={post.description || ""}
                    date={post.date}
                    readTime={post.readingTime || ""}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </main>
    </div>
  );
}
