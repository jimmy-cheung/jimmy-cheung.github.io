import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Copy, FolderKanban, House, Link2, Mail, Menu, NotebookPen, UserRound, X } from 'lucide-react'
import { posts } from './posts'
import './App.css'

type Page = 'home' | 'about' | 'projects' | 'blog' | 'links'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'links', label: 'Links' },
]

const pageIcons = {
  home: House,
  about: UserRound,
  projects: FolderKanban,
  blog: NotebookPen,
  links: Link2,
}

const projects = [
  { year: '2027', name: 'Bloom App', type: 'Swift Student Challenge' },
  { year: '2026', name: 'Soark App', type: 'Project planning · prev' },
]

const buildingStart = new Date(2024, 6, 1).getTime()
const millisecondsPerYear = 365.2425 * 24 * 60 * 60 * 1000

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

function getPageFromUrl(): Page {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] as Page
  const legacyHash = window.location.hash.slice(1) as Page
  const candidate = path || legacyHash
  return pages.some((page) => page.id === candidate) ? candidate : 'home'
}

function getPathForPage(page: Page): string {
  return page === 'home' ? '/' : `/${page}`
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromUrl)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [buildingYears, setBuildingYears] = useState(() => (Date.now() - buildingStart) / millisecondsPerYear)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBuildingYears((Date.now() - buildingStart) / millisecondsPerYear)
    }, 10)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const initialPage = getPageFromUrl()
    window.history.replaceState({ page: initialPage }, '', `${getPathForPage(initialPage)}${window.location.search}`)

    const handlePopState = (event: PopStateEvent) => {
      const nextPage = event.state?.page as Page | undefined
      setPage(pages.some((item) => item.id === nextPage) ? nextPage! : getPageFromUrl())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPage: Page) => {
    window.history.pushState({ page: nextPage }, '', `${getPathForPage(nextPage)}${window.location.search}`)
    setPage(nextPage)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText('jimmyyycheung@gamil.com')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => navigate('home')} aria-label="Go to home">
          <img className="wordmark-avatar" src="/jimmy.jpg" alt="" />
        </button>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {pages.map((item) => {
            const PageIcon = pageIcons[item.id]
            return (
              <button className={page === item.id ? 'active' : ''} key={item.id} onClick={() => navigate(item.id)}>
                <PageIcon size={16} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div key={page} {...fade}>
            {page === 'home' && (
              <section className="page home-page">
                <div className="home-quick-links">
                  <a className="x-cta" href="https://x.com/twzkd" target="_blank" rel="noreferrer" aria-label="Open Jimmy's X profile">
                    <span>Open to work</span>
                    <span className="x-mark" aria-hidden="true">𝕏</span>
                  </a>
                  <button className="blog-cta" onClick={() => navigate('blog')}>
                    <NotebookPen size={15} strokeWidth={1.8} />
                    <span>Blog</span>
                  </button>
                </div>
                <div className="home-copy">
                  <p className="eyebrow">16 y/o CEO @SoarkLabs</p>
                  <motion.h1 className="animated-title" initial="initial" animate="animate">
                    <motion.span variants={fade}>hi,i&apos;m</motion.span>
                    <motion.span variants={fade}>Jimmy</motion.span>
                  </motion.h1>
                  <p className="home-note">putting a dent in the universe. i'm a 16 years old developer and entrepreneur. learning and building.</p>
                  <button className="page-link" onClick={() => navigate('about')}>More about me <ArrowUpRight size={15} /></button>
                  <p className="building-timer">
                    Building for <span>{buildingYears.toFixed(13)}</span> years
                  </p>
                </div>
                <div className="portrait-wrap">
                  <img className="portrait" src="/jimmy.jpg" alt="Jimmypic" />               </div>
              </section>
            )}

            {page === 'about' && (
              <section className="page text-page">
                <p className="eyebrow">About</p>
                <h2 className="about-title" aria-label="Me.">
                  <span className="about-title-layer about-title-top">Me.</span>
                  <span className="about-title-layer about-title-bottom">Me.</span>
                </h2>
                <div className="about-layout">
                  <div className="about-block about-intro">
                    <p>I&apos;m Jimmy Cheung, a 16y/o developer and entrepreneur.</p>
                    <p>Shipping products and new stuff while in Ruian High School.</p>
                  </div>
                  <div className="about-block about-building">
                    <p className="subheading">Currently building:</p>
                    <p><strong>SSC 2027</strong> — Pushing my technical limits to ship something real.</p>
                    <p className="subheading">previous:</p>
                    <p><strong>Soark App</strong> — A project planning app that turns overwhelming chaos into clear, actionable steps.</p>
                  </div>
                  <div className="about-block about-extra">
                    <p className="subheading">Hobbies &amp; influences:</p>
                    <p>Watching and playing soccer. I LOVE Real Madrid!</p>
                    <p>Playing video games. I enjoy the storytelling and world-building in games like The Legend of Zelda, Cyberpunk 2077, and The Witcher.</p>
                    <p>Following the latest tech trends. I'm always excited to see what's new in the world of software and hardware.</p>
                  </div>
                </div>
              </section>
            )}

            {page === 'projects' && (
              <section className="page projects-page">
                <p className="eyebrow">Selected projects</p>
                <h2>Things I&apos;m<br /><span>building.</span></h2>
                <div className="project-list">
                  {projects.map((project, index) => (
                    <button className="project-row" key={project.name}>
                      <span className="project-number">0{index + 1}</span>
                      <span className="project-name">{project.name}</span>
                      <span className="project-type">{project.type}</span>
                      <span className="project-year">{project.year}</span>
                      <ArrowUpRight className="project-arrow" size={17} />
                    </button>
                  ))}
                </div>
                <p className="coming-soon">More projects coming soon.</p>
              </section>
            )}

            {page === 'blog' && (
              <section className="page blog-page">
                <p className="eyebrow">Notes &amp; field logs</p>
                <h2>Building<br /><span>in public.</span></h2>
                <div className="blog-intro">
                  <p>Thoughts on code, products, learning, and the process of shipping while young.</p>
                  <span>2026</span>
                </div>
                <div className="blog-list">
                  {posts.length === 0 ? (
                    <article className="blog-empty">
                      <span className="blog-index">00</span>
                      <div>
                        <p className="blog-status">FIRST ENTRY PENDING</p>
                        <h3>Notes are coming soon.</h3>
                        <p>Build logs, lessons, experiments, and selected ideas will be published here.</p>
                      </div>
                      <span className="blog-date">SOON</span>
                    </article>
                  ) : (
                    posts.map((post, index) => (
                      <article className="blog-post" key={post.slug}>
                        <span className="blog-index">{String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <p className="blog-status">{post.tags.join(' · ')}</p>
                          <h3>{post.title}</h3>
                          <p>{post.summary}</p>
                        </div>
                        <time className="blog-date">{post.date}</time>
                      </article>
                    ))
                  )}
                </div>
              </section>
            )}

            {page === 'links' && (
              <section className="page links-page">
                <p className="eyebrow">Find me online</p>
                <h2>Links.</h2>
                <div className="links-list">
                  <a href="https://x.com/twzkd" target="_blank" rel="noreferrer"><span>X / Twitter</span><ArrowUpRight size={17} /></a>
                  <a href="https://instagram.com/catchjch" target="_blank" rel="noreferrer"><span>Instagram</span><span className="link-monogram">IG</span></a>
                  <span className="disabled-link"><span>Discord</span><span>Coming soon</span></span>
                  <button onClick={copyEmail}><span>{copied ? 'Email copied' : 'Email'}</span>{copied ? <Copy size={17} /> : <Mail size={17} />}</button>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <span>© 2026 Jimmy Cheung.</span>
        <button onClick={() => navigate('links')}>Links <ArrowUpRight size={13} /></button>
      </footer>
    </div>
  )
}

export default App
