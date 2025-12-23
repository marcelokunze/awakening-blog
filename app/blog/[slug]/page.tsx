import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/mdx'
import { Metadata } from 'next'
import { TableOfContents } from '@/components/TableOfContents'
import components from '@/lib/mdx-components'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import PromoCard from '@/components/PromoCard'
import TOCPromoCard from '@/components/TOCPromoCard'
import { Footer } from '@/components/Footer'
import BlogSchema from '@/components/BlogSchema'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)
  if (!post) return {}

  const title = `${post.title} | ZenPersonal`
  const description = post.description || post.tldr

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      siteName: 'ZenPersonal',
      url: `https://www.zenpersonal.app/blog/${resolvedParams.slug}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `https://www.zenpersonal.app/blog/${resolvedParams.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: post.author }],
    publisher: 'ZenPersonal',
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
      <div className="section mt-10 md:mt-0 !pt-6 md:!pt-[60px]">
        <div className="section-content flex flex-col items-center">
          <div className="mt-4 flex gap-32 flex-col lg:flex-row p-6 md:pl-60">
            <article className="flex-1 max-w-xl">
              <div className="mb-8">
                <h1 className="text-4xl font-semibold mb-6">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                  <Avatar>
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-foreground/80">{post.author}</div>
                    <div>{post.date} — {post.readingTime}</div>
                  </div>
                </div>
                <p className="text-xs font-semibold mb-4 tracking-widest text-foreground/80">SUMMARY TL;DR</p>
                <div className="prose prose-lg dark:prose-invert mb-12 md:mb-24">
                  <p>{post.tldr}</p>
                </div>
                <hr className="border-border mb-12 md:mb-24" />
              </div>

              {/* Mobile ToC moved here */}
              <aside className="lg:hidden w-full my-12">
                <h2 className="text-xs font-semibold mb-4 tracking-widest text-foreground/80">TABLE OF CONTENTS</h2>
                <TableOfContents items={post.tableOfContents || []} />
              </aside>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MDXRemote source={post.content} components={components} />
              </div>
            </article>

            {/* Desktop ToC remains unchanged */}
            <aside className="hidden lg:block w-64">
              <div className="sticky top-8">
                <h2 className="text-xs font-semibold mb-4 tracking-widest text-foreground/80">TABLE OF CONTENTS</h2>
                <TableOfContents items={post.tableOfContents || []} />
                <div className="mt-12">
                  <TOCPromoCard />
                </div>
              </div>
            </aside>
          </div>

          <div className="w-full max-w-6xl mt-32 mb-24">
            <PromoCard />
          </div>

          <Footer />

        </div>
      </div>
    </>
  )
}