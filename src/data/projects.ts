import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'tomato-timer',
    title: 'Mac状态栏番茄时钟',
    description:
      '降低启动番茄的心理阻力，并支持录屏回看专注时间花在哪了。',
    tags: ['小工具', '时间管理'],
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=88',
    bilibiliEmbedUrl:
      'https://player.bilibili.com/player.html?bvid=BV1hKSwYHEn3&page=1&high_quality=1&danmaku=0&autoplay=1',
    githubUrl: 'https://github.com/topics/ai-app',
    featured: true,
  },
  {
    id: 'jobs-collection',
    title: '体验设计岗位监控',
    description:
      '从各大互联网公司社招官网自动抓取体验设计相关岗位信息并汇总到 Notion 数据库。',
    tags: ['网络爬虫', '岗位监控', 'Notion'],
    coverImage: '/projects/jobs-collection.png',
    bilibiliEmbedUrl:
      'https://app.notion.com/p/jqh2026/3695699d17db8059a151eb71298ca8d9',
    githubUrl: 'https://app.notion.com/p/jqh2026/3695699d17db8059a151eb71298ca8d9',
    featured: true,
    linkType: 'notion',
  },
  {
    id: 'idea-pocket',
    title: '灵感口袋笔记APP',
    description:
      '轻量化的语音转文字笔记，并使用 AI 整理文字和打标签。',
    tags: ['Vite', 'LLM', 'Map API'],
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88',
    bilibiliEmbedUrl:
      'https://player.bilibili.com/player.html?bvid=BV1UoLezKEbm&page=1&high_quality=1&danmaku=0&autoplay=1',
    githubUrl: 'https://github.com/topics/travel-app',
    featured: false,
  }
]
