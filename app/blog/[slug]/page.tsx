import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/mdx'
import { Metadata } from 'next'
import { TableOfContents } from '@/components/table-of-contents'
import components from '@/lib/mdx-components'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import BlogSchema from '@/components/blog-schema'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)
  if (!post) return {}

  const title = post.title
  const description = post.description || post.tldr

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      title,
      description,
    },
    authors: post.author ? [{ name: post.author }] : undefined,
  }
}

export default async function Post({ params }: PageProps) {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <BlogSchema post={post} slug={resolvedParams.slug} />
      <div className="mt-10 md:mt-0 pt-6 md:pt-16">
        <div className="flex flex-col items-center">
          <div className="mt-4 flex gap-32 flex-col lg:flex-row p-6 md:pl-60">
            <article className="flex-1 max-w-xl">
              <div className="mb-8">
                <h1 className="text-4xl font-semibold mb-6">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                  <Avatar>
                    <AvatarImage src={post.authorImage} alt={post.author || 'Author'} />
                    <AvatarFallback>{post.author?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-foreground/80">{post.author}</div>
                    <div>{post.date} — {post.readingTime}</div>
                  </div>
                </div>
                {post.tldr && (
                  <>
                    <p className="text-xs font-semibold mb-4 tracking-widest text-foreground/80">SUMMARY TL;DR</p>
                    <div className="prose prose-lg dark:prose-invert mb-12 md:mb-24">
                      <p>{post.tldr}</p>
                    </div>
                    <hr className="border-border mb-12 md:mb-24" />
                  </>
                )}
              </div>

              {/* Mobile ToC */}
              <aside className="lg:hidden w-full my-12">
                <h2 className="text-xs font-semibold mb-4 tracking-widest text-foreground/80">TABLE OF CONTENTS</h2>
                <TableOfContents items={post.tableOfContents || []} />
              </aside>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MDXRemote source={post.content} components={components} />
              </div>
            </article>

            {/* Desktop ToC */}
            <aside className="hidden lg:block w-64">
              <div className="sticky top-8">
                <h2 className="text-xs font-semibold mb-4 tracking-widest text-foreground/80">TABLE OF CONTENTS</h2>
                <TableOfContents items={post.tableOfContents || []} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
