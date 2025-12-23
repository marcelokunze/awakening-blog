import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  
  const blogEntries = posts.map((post) => ({
    url: `https://zenpersonal.app/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly' as ChangeFreq,
    priority: 0.8,
  }))
 
  return [
    {
      url: 'https://zenpersonal.app',
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 1,
    },
    {
      url: 'https://zenpersonal.app/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.9,
    },
    ...blogEntries,
  ]
}