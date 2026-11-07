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
  { year: '2027', name: 'Bloom App', type: 'Swift Student Challenge' },
  { year: '2026', name: 'Soark App', type: 'Project planning · prev' },
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
          <img className="wordmark-avatar" src="/jimmy.jpg" alt="" />
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
                  <p className="eyebrow">16 y/o CEO @SoarkLabs</p>
                  <motion.h1 className="animated-title" initial="initial" animate="animate">
                    <motion.span variants={fade}>Hello, I&apos;m</motion.span>
                    <motion.span variants={fade}>Jimmy Cheung.</motion.span>
                  </motion.h1>
                  <p className="home-note">Building at the intersection of silicon and interface. Putting a dent in the universe.</p>
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
                <h2>Hi, I&apos;m Jimmy.<br /><span>I&apos;m 16.</span></h2>
                <div className="text-columns">
                  <p>I build at the intersection of silicon and interface. I&apos;m currently reading Patterson &amp; Hennessy to understand the machine, and writing Swift to build products that matter.</p>
                  <div>
                    <p className="subheading">Currently building:</p>
                    <p><strong>SSC 2027</strong> — Pushing my technical limits to ship something real.</p>
                    <p className="subheading">previous:</p>
                    <p><strong>Soark App</strong> — A project planning app that turns overwhelming chaos into clear, actionable steps.</p>
                  </div>
                </div>
                <div className="about-extra">
                  <p className="subheading">Hobbies &amp; influences:</p>
                  <p>Football, especially Real Madrid. Computer science, especially the layers beneath the interface. Steve Jobs, for the ambition to change the world. Michael Jackson, for the way he made culture move.</p>
                  <p className="subheading">School:</p>
                  <p>Ruian High School</p>
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
