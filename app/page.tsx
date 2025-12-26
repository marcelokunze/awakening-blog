import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedPosts } from "@/lib/mdx";
import { Button } from "@/components/ui/button";
import { Code2, Search, Moon, Github, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArticlePreview } from "@/components/article-preview";

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Install with one command</span>
              <ArrowRight className="h-3 w-3" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Beautiful MDX Blog for{" "}
              <span className="text-primary">Next.js</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A ready-to-use blog template with shadcn/ui components, automatic table of contents, and dark mode. 
              Open source and free.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/blog">
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://github.com/marcelokunze/awakening-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
            {/* Install Command */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border font-mono text-sm">
              <code className="text-muted-foreground break-all">
                npx shadcn@latest add{" "}
                <span className="text-foreground break-all">https://awakening-blog.com/r/blog.json</span>
              </code>
            </div>
          </div>

          {/* Right Column - Article Preview */}
          <div className="flex justify-center">
            <ArticlePreview slug="what-is-yoga-nidra" />
          </div>
        </div>
      </section>

      {/* Example Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Example Posts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how your blog posts will look with beautiful typography, automatic table of contents, and more.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
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
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a modern blog, built with the best tools.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <FeatureCard
            icon={Code2}
            title="React Components in MDX"
            description="Write your posts in MDX and embed any React or shadcn/ui component directly in your content."
          />
          <FeatureCard
            icon={Search}
            title="SEO Optimized"
            description="Built-in Schema.org markup, meta tags, and OpenGraph support for better search visibility."
          />
          <FeatureCard
            icon={Moon}
            title="Dark & Light Mode"
            description="Beautiful dark and light themes that respect user preferences with smooth transitions."
          />
        </div>
      </section>

      {/* Open Source Section */}
      <section className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16 pb-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Github className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Open Source</h2>
          <p className="text-muted-foreground mb-8">
            This project is open source and free to use. Star us on GitHub, contribute, or fork it for your own projects.
          </p>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/marcelokunze/awakening-blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          Built with{" "}
          <a href="https://nextjs.org" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
            Next.js
          </a>
          {" "}and{" "}
          <a href="https://ui.shadcn.com" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
            shadcn/ui
          </a>
        </div>
      </footer>
    </div>
  );
}
