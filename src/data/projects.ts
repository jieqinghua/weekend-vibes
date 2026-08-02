import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'tomato-timer',
    title: 'Mac状态栏番茄时钟',
    description:
      '降低启动番茄的心理阻力，并支持录屏回看时间花在哪了。',
    tags: ['小工具', '时间管理'],
    coverImage: `${import.meta.env.BASE_URL}projects/tomato-timer.png`,
    bilibiliEmbedUrl:
      'https://player.bilibili.com/player.html?bvid=BV1KoMt67EU7&page=1',
    githubUrl: 'https://github.com/jieqinghua/tomato-timer',
    featured: true,
  },
  {
    id: 'jobs-collection',
    title: '体验设计岗位监控',
    description:
      '自动抓取各大互联网公司官网社招体验设计相关岗位，并汇总到 Notion 数据库。',
    tags: ['网络爬虫', '岗位监控', 'Notion'],
    coverImage: `${import.meta.env.BASE_URL}projects/jobs-collection.png`,
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
      '语音转文字、AI 文字润色、 AI 主题聚合。',
    tags: ['语音笔记', 'AI 整理', '手机端'],
    coverImage:
      `${import.meta.env.BASE_URL}projects/idea-pocket.png`,
    bilibiliEmbedUrl:
      'https://player.bilibili.com/player.html?bvid=BV1yFN966EqY&page=1&high_quality=1&danmaku=0&autoplay=1',
    githubUrl: 'https://github.com/jieqinghua/IdeaPocket',
    featured: false,
  },
  {
    id: 'remove-dialog',
    title: '屏蔽知乎登录弹窗的 chrome 插件',
    description:
      '自动屏蔽知乎和CSDN网站登录弹窗。',
    tags: ['插件', '去广告','Chrome'],
    coverImage: `${import.meta.env.BASE_URL}projects/remove-dialog.png`,
    bilibiliEmbedUrl:
      'https://github.com/jieqinghua/remove-login-dialog',
    githubUrl: 'https://github.com/jieqinghua/remove-login-dialog',
    featured: false,
    linkType: 'github',
  },
  {
    id: 'finder-new-txt',
    title: '一个 Mac 访达新建 txt 的扩展',
    description:
      '添加到 Mac 访达菜单后，点击新建文件，会自动新建一个 txt 文件。',
    tags: ['快捷工具', 'Mac'],
    coverImage: `${import.meta.env.BASE_URL}projects/finder-new-txt.png`,
    bilibiliEmbedUrl:
      'https://github.com/jieqinghua/finder-new-txt',
    githubUrl: 'https://github.com/jieqinghua/finder-new-txt',
    featured: false,
    linkType: 'github',
  },
]
