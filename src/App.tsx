import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Copy, Mail, Menu, X } from 'lucide-react'
import './App.css'

type Page = 'home' | 'about' | 'projects' | 'links'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'links', label: 'Links' },
]

const projects = [
  { year: '2025', name: 'Soark OS', type: 'Product / SaaS' },
  { year: '2024', name: 'VibeKit', type: 'Tool / Creative' },
  { year: '2024', name: 'Signal', type: 'Experiment / AI' },
]

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

function getPageFromHash(): Page {
  const hash = window.location.hash.slice(1) as Page
  return pages.some((page) => page.id === hash) ? hash : 'home'
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromHash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (nextPage: Page) => {
    window.history.pushState({}, '', nextPage === 'home' ? window.location.pathname : `#${nextPage}`)
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
          <span className="wordmark-mark">J</span>
          <span>Jimmy Cheung</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {pages.map((item) => (
            <button className={page === item.id ? 'active' : ''} key={item.id} onClick={() => navigate(item.id)}>
              {item.label}
            </button>
          ))}
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
                <div className="home-copy">
                  <p className="eyebrow">Developer &amp; Entrepreneur</p>
                  <h1>Jimmy<br /><span>Cheung.</span></h1>
                  <p className="home-note">Building useful things at the intersection of software, design, and AI.</p>
                  <button className="page-link" onClick={() => navigate('about')}>More about me <ArrowUpRight size={15} /></button>
                </div>
                <div className="portrait-wrap">
                  <img className="portrait" src="/jimmy.jpg" alt="Jimmy Cheung wearing a VR headset" />
                  <span className="portrait-caption">01 / Self portrait</span>
                </div>
              </section>
            )}

            {page === 'about' && (
              <section className="page text-page">
                <p className="eyebrow">About</p>
                <h2>Curious by default.<br /><span>Focused by choice.</span></h2>
                <div className="text-columns">
                  <p>I&apos;m a developer and entrepreneur building Soark Labs. I care about simple ideas, thoughtful products, and the details that make technology feel natural.</p>
                  <p>Right now I&apos;m learning in public, exploring AI-native tools, and turning ambitious ideas into useful things.</p>
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
        <span>© 2025 Jimmy Cheung</span>
        <button onClick={() => navigate('links')}>Links <ArrowUpRight size={13} /></button>
      </footer>
    </div>
  )
}

export default App
