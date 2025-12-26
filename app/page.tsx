import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedPosts } from "@/lib/mdx";
import { Button } from "@/components/ui/button";
import { Code2, Search, Moon, Github, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArticlePreview } from "@/components/article-preview";
import { InstallCommand } from "@/components/install-command";
import { PromptBox } from "@/components/prompt-box";
import { ClosingCTA } from "@/components/closing-cta";

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
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Complete blog kit for{" "}
              <span className="text-primary">Next.js</span> and{" "}
              <span className="text-primary">shadcn</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A ready to use blog template, easily customizable with support for custom react components and optimized for modern SEO.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="min-w-[140px]" asChild>
                <Link href="/blog">
                  View Demo
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="min-w-[140px]" asChild>
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
          </div>

          {/* Right Column - Article Preview */}
          <div className="flex justify-center">
            <ArticlePreview slug="what-is-yoga-nidra" />
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-2">Installation</h2>
            <p className="text-muted-foreground">
              Set up a complete blog in one minute with one command.
            </p>
          </div>

          {/* Step 1 */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-muted text-foreground text-sm font-semibold font-mono">
                1
              </div>
              <p className="text-foreground text-sm tracking-wide">
                Add the complete blog structure into your Next.js project with one command.
              </p>
            </div>
            <InstallCommand />
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-muted text-foreground text-sm font-semibold font-mono">
                2
              </div>
              <p className="text-foreground text-sm tracking-wide">
                Paste this prompt into your IDE.
              </p>
            </div>
            <PromptBox />
          </div>

          <Button variant="outline" size="sm" className="mt-2" asChild>
            <a
              href="https://github.com/marcelokunze/awakening-blog?tab=readme-ov-file#awakening-blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </Button>
        </div>
      </section>

      {/* Example Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="container max-w-screen-xl mx-auto px-4 md:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-2">Example Posts</h2>
              <p className="text-muted-foreground">
                See how your blog posts will look with beautiful typography, automatic table of contents, and more.
              </p>
            </div>
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
            <Button variant="outline" size="sm" className="mt-8" asChild>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-medium mb-2">Features</h2>
            <p className="text-muted-foreground">
              Everything you need for a modern blog, built with the best tools.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
        </div>
      </section>

      <ClosingCTA />

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
