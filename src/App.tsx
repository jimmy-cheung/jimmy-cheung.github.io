import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Mail,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react'
import './App.css'

type Theme = 'dark' | 'light'

const projects = [
  {
    index: '01',
    name: 'Soark OS',
    description:
      'A calm, intelligent command center for ambitious teams building the next thing.',
    type: 'SaaS platform',
    accent: 'violet',
  },
  {
    index: '02',
    name: 'VibeKit',
    description:
      'The creative toolkit for turning a half-formed idea into a shipped product.',
    type: 'Developer tool',
    accent: 'blue',
  },
  {
    index: '03',
    name: 'Signal',
    description:
      'A small, focused space for making better decisions with less noise.',
    type: 'In progress',
    accent: 'orange',
  },
]

const skills = [
  'React / Next.js',
  'TypeScript',
  'Product design',
  'AI & LLMs',
  'SaaS architecture',
  'Rapid prototyping',
]

function App() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Jimmy Cheung home">
          <span className="wordmark-mark">J</span>
          <span>jimmy<span className="muted-mark">.cheung</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
        </nav>
        <div className="header-actions">
          <a className="header-contact" href="mailto:hello@jimmycheung.dev">
            Let&apos;s talk <ArrowUpRight size={14} strokeWidth={2.2} />
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="status-dot" /> Building in public · Hong Kong
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              I build
              <span className="gradient-text"> useful things.</span>
              <br />
              <span className="hero-subline">And I&apos;m just getting started.</span>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              I&apos;m Jimmy — a 16-year-old CEO, developer, and entrepreneur at{' '}
              <span className="inline-link">Soark Labs</span>. Exploring the edge where
              code, design, and AI meet.
            </motion.p>
            <motion.div
              className="hero-cta-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              <a className="button button-primary" href="#work">
                See what I&apos;m building <ArrowDown size={16} />
              </a>
              <a className="text-button" href="mailto:hello@jimmycheung.dev">
                Get in touch <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>
          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-card">
              <div className="hero-card-top">
                <span className="terminal-dots"><i /><i /><i /></span>
                <span>soark-labs / vision.ts</span>
                <span className="hero-card-live">LIVE</span>
              </div>
              <div className="code-lines">
                <span><b>01</b> <em>const</em> <strong>future</strong> = <mark>build</mark>()</span>
                <span><b>02</b></span>
                <span><b>03</b> <em>while</em> (idea.<strong>hasPotential</strong>) {'{'}</span>
                <span><b>04</b> &nbsp;&nbsp;ship(idea)</span>
                <span><b>05</b> &nbsp;&nbsp;learn(fast)</span>
                <span><b>06</b> {'}'}</span>
                <span><b>07</b></span>
                <span><b>08</b> <i className="cursor" /></span>
              </div>
              <div className="hero-card-bottom">
                <span><Sparkles size={13} /> shipping mode</span>
                <span>v.2025.01</span>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="marquee-strip" aria-label="Focus areas">
          <div className="marquee-content">
            <span>CODING</span><i /> <span>VIBECODING</span><i /> <span>AI-NATIVE</span><i /> <span>SAAS</span><i /> <span>THE FUTURE</span><i />
            <span>CODING</span><i /> <span>VIBECODING</span><i /> <span>AI-NATIVE</span><i /> <span>SAAS</span><i /> <span>THE FUTURE</span>
          </div>
        </section>

        <section className="about section-grid" id="about">
          <div className="section-label"><span>01</span><span className="label-line" /><span>About / Philosophy</span></div>
          <div className="about-content">
            <h2>Small team energy.<br /><span className="faded">Big world problems.</span></h2>
            <div className="about-columns">
              <p>I believe the best products start with curiosity, not a business plan. I&apos;m building Soark Labs to explore that belief — one focused, opinionated project at a time.</p>
              <p>When I&apos;m not coding, you&apos;ll find me learning in public, thinking about the future of work, or asking how we can make technology feel a little more human.</p>
            </div>
            <a className="text-button" href="#stack">More about my approach <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="work section-grid" id="work">
          <div className="section-label"><span>02</span><span className="label-line" /><span>Selected work</span></div>
          <div className="work-content">
            <div className="section-heading-row">
              <h2>Things I&apos;m<br /><span className="faded">bringing to life.</span></h2>
              <p>A few experiments, products, and ideas from the lab. Some shipped, some still taking shape.</p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <motion.article
                  className={`project-card ${project.accent}`}
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="project-visual">
                    <span className="project-index">{project.index}</span>
                    <span className="project-arrow"><ArrowUpRight size={19} /></span>
                    <div className={`project-shape shape-${index + 1}`} />
                  </div>
                  <div className="project-info">
                    <div><h3>{project.name}</h3><span className="project-type">{project.type}</span></div>
                    <p>{project.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="stack section-grid" id="stack">
          <div className="section-label"><span>03</span><span className="label-line" /><span>My toolkit</span></div>
          <div className="stack-content">
            <div className="section-heading-row">
              <h2>The tools<br /><span className="faded">behind the ideas.</span></h2>
              <p>The stack is always evolving. The goal stays the same: move from thought to working thing, fast.</p>
            </div>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div className="skill-row" key={skill}>
                  <span className="skill-number">0{index + 1}</span>
                  <span className="skill-name">{skill}</span>
                  <Check size={17} className="skill-check" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-panel">
          <div className="contact-glow" />
          <span className="eyebrow"><span className="status-dot" /> Open to interesting conversations</span>
          <h2>Have an idea worth<br /><span className="gradient-text">building?</span></h2>
          <p>Whether you want to collaborate, share a thought, or just say hi — my inbox is open.</p>
          <a className="button button-primary" href="mailto:hello@jimmycheung.dev">Say hello <ArrowUpRight size={16} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="wordmark" href="#top"><span className="wordmark-mark">J</span><span>jimmy<span className="muted-mark">.cheung</span></span></a>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="mailto:hello@jimmycheung.dev" aria-label="Email"><Mail size={17} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Jimmy Cheung. Built with curiosity.</span>
          <span className="footer-status"><span className="status-dot" /> All systems nominal</span>
        </div>
      </footer>
    </div>
  )
}

export default App
