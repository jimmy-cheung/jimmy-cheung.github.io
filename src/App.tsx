import { motion, type Variants } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react'
import './App.css'

const projects = [
  {
    year: '2025',
    name: 'Soark OS',
    type: 'Product / SaaS',
    description: 'A focused operating system for ambitious teams.',
  },
  {
    year: '2024',
    name: 'VibeKit',
    type: 'Tool / Creative',
    description: 'A faster path from a raw idea to a working product.',
  },
  {
    year: '2024',
    name: 'Signal',
    type: 'Experiment / AI',
    description: 'Small tools for making clearer decisions with less noise.',
  },
]

const pageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

function App() {
  return (
    <div className="site-shell">
      <motion.header
        className="site-header"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.a className="wordmark" href="#top" variants={fadeUp}>
          <span className="wordmark-dot" aria-hidden="true" />
          <span>Jimmy Cheung</span>
        </motion.a>

        <motion.nav className="desktop-nav" aria-label="Primary navigation" variants={fadeUp}>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a href="#media">Media</a>
        </motion.nav>

        <motion.a className="header-mail" href="mailto:jimmyyycheung@gamil.com" variants={fadeUp}>
          <span>Available for a conversation</span>
          <ArrowUpRight size={14} />
        </motion.a>
      </motion.header>

      <motion.main
        id="top"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.section className="hero" variants={pageVariants}>
          <motion.div className="hero-kicker" variants={fadeUp}>
            <span className="live-dot" /> Developer &amp; Entrepreneur
          </motion.div>
          <motion.h1 variants={fadeUp}>
            Building quietly.
            <br />
            <span>Thinking loudly.</span>
          </motion.h1>
          <motion.div className="hero-bottom" variants={fadeUp}>
            <p className="hero-intro">
              I&apos;m Jimmy Cheung, a developer and entrepreneur building thoughtful
              products at the intersection of software, design, and AI.
            </p>
            <a className="scroll-cue" href="#projects">
              <span>Scroll to explore</span>
              <ArrowDownRight size={17} />
            </a>
          </motion.div>
        </motion.section>

        <motion.section className="manifesto" id="experience" variants={fadeUp}>
          <div className="section-index">01 / Perspective</div>
          <div className="manifesto-copy">
            <p className="large-copy">
              I care about the details that make technology feel <em>obvious</em>,
              <br className="desktop-break" /> useful, and worth coming back to.
            </p>
            <p className="body-copy">
              Currently building Soark Labs and exploring what comes next. I like
              small teams, strong opinions, and turning ambitious ideas into things
              people can actually use.
            </p>
          </div>
        </motion.section>

        <motion.section className="projects-section" id="projects" variants={fadeUp}>
          <div className="section-heading">
            <div className="section-index">02 / Selected work</div>
            <p>Experiments, products, and ideas from the lab.</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <motion.a
                className="project-row"
                href="#contact"
                key={project.name}
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
              >
                <span className="project-number">0{index + 1}</span>
                <span className="project-name">{project.name}</span>
                <span className="project-description">{project.description}</span>
                <span className="project-type">{project.type}</span>
                <motion.span
                  className="project-year"
                  variants={{ rest: { color: 'var(--muted)' }, hover: { color: 'var(--orange)' } }}
                >
                  {project.year}
                </motion.span>
                <motion.span
                  className="project-arrow"
                  variants={{ rest: { x: 0, color: 'var(--muted)' }, hover: { x: 4, color: 'var(--orange)' } }}
                >
                  <ArrowUpRight size={18} />
                </motion.span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        <motion.section className="now-section" id="media" variants={fadeUp}>
          <div className="section-index">03 / Now</div>
          <div className="now-grid">
            <p className="large-copy">Learning in public.<br />Making the next thing.</p>
            <div className="now-details">
              <p className="body-copy">
                Coding, vibecoding, product thinking, and the long game of building
                a life around meaningful work.
              </p>
              <div className="now-status">
                <span className="live-dot" />
                <span>Currently online</span>
                <span className="status-line" />
                <span>Hong Kong</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="contact-section" id="contact" variants={fadeUp}>
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-index">04 / Contact</div>
          <div className="contact-content">
            <p className="contact-label">Have something worth building?</p>
            <h2>Let&apos;s make it<br /><span>real.</span></h2>
            <a className="email-link" href="mailto:jimmyyycheung@gamil.com">
              <span>jimmyyycheung@gamil.com</span>
              <Mail size={18} />
            </a>
          </div>
        </motion.section>
      </motion.main>

      <footer className="site-footer">
        <div className="footer-line">
          <span>© 2025 Jimmy Cheung</span>
          <span>Built with intent.</span>
        </div>
        <div className="footer-links">
          <a href="https://x.com/twzkd" target="_blank" rel="noreferrer">X / Twitter</a>
          <a href="https://instagram.com/catchjch" target="_blank" rel="noreferrer">Instagram</a>
          <span className="disabled-link">Discord / soon</span>
          <a href="mailto:jimmyyycheung@gamil.com">Email</a>
        </div>
      </footer>
    </div>
  )
}

export default App
