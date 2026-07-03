export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  coverImage: string
  bilibiliEmbedUrl: string
  githubUrl: string
  featured: boolean
  linkType?: 'github' | 'notion'
}
