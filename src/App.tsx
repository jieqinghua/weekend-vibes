import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Github, Mail, Play, X } from 'lucide-react'
import { projects } from './data/projects'
import type { Project } from './types'

function projectFromLocation() {
  if (typeof window === 'undefined') return null
  const projectId = new URLSearchParams(window.location.search).get('project')
  return projects.find((project) => project.id === projectId && !project.linkType) ?? null
}

function updateProjectUrl(projectId: string | null) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (projectId) url.searchParams.set('project', projectId)
  else url.searchParams.delete('project')
  window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const page = document.getElementById('page-frame') as (HTMLElement & { inert: boolean }) | null

    if (page) page.inert = true
    document.body.classList.add('modal-open')
    requestAnimationFrame(() => closeButtonRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
      if (page) page.inert = false
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="video-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-head">
          <div>
            <p>VIBE CODING · VIDEO DEMO</p>
            <h2 id="modal-title">{project.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            aria-label="关闭演示视频"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="video-frame">
          <iframe
            key={project.id}
            src={project.bilibiliEmbedUrl}
            title={`${project.title} 的演示视频`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="modal-foot">
          <span></span>
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            查看 GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onPlay }: { project: Project; index: number; onPlay: () => void }) {
  const isNotionProject = project.linkType === 'notion'
  const isExternalProject = project.linkType === 'notion' || project.linkType === 'github'

  const previewContent = (
    <>
      <img src={project.coverImage} alt={`${project.title} 项目预览`} loading="lazy" />
      <span className="project-index">0{index + 1}</span>
      {!isExternalProject && (
        <span className="play-button" aria-hidden="true">
          <Play size={22} fill="currentColor" />
        </span>
      )}
    </>
  )

  return (
    <article className="project-card reveal">
      {isExternalProject ? (
        <a
          className="project-preview project-preview--external"
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={isNotionProject ? `查看 ${project.title} Notion 页面` : `查看 ${project.title} GitHub 仓库`}
        >
          {previewContent}
        </a>
      ) : (
        <button
          className="project-preview"
          type="button"
          aria-label={`播放 ${project.title} 的演示视频`}
          onClick={onPlay}
        >
          {previewContent}
        </button>
      )}

      <div className="project-info">
        <div className="project-title-row">
          <h2>{project.title}</h2>
        </div>
        <p>{project.description}</p>
        <div className="project-meta">
          <ul aria-label="项目技术栈">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            {isNotionProject ? (
              <img
                className="notion-logo"
                src="https://cdn.simpleicons.org/notion/171714"
                alt=""
                aria-hidden="true"
              />
            ) : (
              <Github size={20} aria-hidden="true" />
            )}
            {isNotionProject ? '查看页面' : 'GitHub'}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(() => projectFromLocation())
  const openProject = useCallback((project: Project) => {
    setActiveProject(project)
    updateProjectUrl(project.id)
  }, [])
  const closeModal = useCallback(() => {
    setActiveProject(null)
    updateProjectUrl(null)
  }, [])

  useEffect(() => {
    const handleHistoryChange = () => setActiveProject(projectFromLocation())
    window.addEventListener('popstate', handleHistoryChange)
    return () => window.removeEventListener('popstate', handleHistoryChange)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.08 },
    )

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-canvas">
      <div className="page-frame" id="page-frame">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="返回顶部">
            JQH<span>.</span>DESIGN
          </a>
          <a className="contact-pill" href="#contact">
            联系我 <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </header>

        <main id="top">
          <section className="intro">
            <p className="intro-kicker">HELLO / 你好</p>
            <h1>欢迎来到我的<br className="mobile-break" /> <em>Vibe</em> 实验室</h1>
          </section>

          <section className="project-grid" aria-label="Vibe Coding 项目作品">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onPlay={() => openProject(project)}
              />
            ))}
          </section>
        </main>

        <footer id="contact">
          <div className="footer-invite reveal">
            <p className="footer-label">CONTACT / 联系</p>
            <h2>欢迎与我联系</h2>
          </div>
          <div className="footer-mail reveal">
            <p className="footer-label">邮箱</p>
            <a href="mailto:928862676@qq.com">
              <Mail size={18} aria-hidden="true" />
              928862676@qq.com
            </a>
          </div>
          <div className="qr-card reveal">
            <img
              src={`${import.meta.env.BASE_URL}contact/wechat-qr.png`}
              alt="微信二维码"
              loading="lazy"
            />
            <span>扫码添加我的微信</span>
          </div>
        </footer>
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={closeModal} />}
    </div>
  )
}
