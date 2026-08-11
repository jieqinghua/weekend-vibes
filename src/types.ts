export interface Project {
  id: string
  type: 1 | 2
  title: string
  description: string
  tags: string[]
  coverImage: string
  bilibiliEmbedUrl: string
  githubUrl?: string
  featured: boolean
  linkType?: 'github' | 'notion'
}
