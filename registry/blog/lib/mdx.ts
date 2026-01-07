import fs from 'fs'
import path from 'path'
import matter, { GrayMatterFile } from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

type MatterFileData = GrayMatterFile<string>['data']

export interface TableOfContentsItem {
  title: string
  url: string
  level: number
}

export type CategoryType = 'General' | 'Tutorial' | 'Guide' | 'News' | 'Opinion' | string

export interface PostMeta {
  title: string
  date: string
  slug: string
  content: string
  tldr?: string
  author?: string
  authorImage?: string
  category: CategoryType
  description?: string
  readingTime?: string
  tags?: string[]
  tableOfContents?: TableOfContentsItem[]
  [key: string]: unknown
}

function extractHeadings(content: string): TableOfContentsItem[] {
  const headingRegex = /^#{2,4}\s+(.+)$/gm
  const headings: TableOfContentsItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1]
    const level = match[0].split('#').length - 1
    const url = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    headings.push({
      title,
      url: `#${url}`,
      level,
    })
  }

  return headings
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(postsDirectory, `${realSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const matterResult: GrayMatterFile<string> = matter(fileContents)
  const matterData: MatterFileData = matterResult.data

  const tableOfContents = extractHeadings(matterResult.content)

  return {
    ...(matterData as PostMeta),
    slug: realSlug,
    content: matterResult.content,
    tableOfContents,
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const files = fs.readdirSync(postsDirectory)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (fileName) => {
        const post = await getPostBySlug(fileName)
        return post
      })
  )

  return posts
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, '$1'))
      const dateB = new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, '$1'))
      return dateB.getTime() - dateA.getTime()
    })
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.slice(0, 2)
}







