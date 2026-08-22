'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

/* ─── Hero Particles (canvas) ─── */
function HeroParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const dots = Array.from({ length: 65 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.6 + .5,
      dx: (Math.random() - .5) * .35,
      dy: (Math.random() - .5) * .35,
      o: Math.random() * .45 + .1,
    }));
    let raf;
    const frame = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach(d => {
        d.x += d.dx / c.width; d.y += d.dy / c.height;
        if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0;
        if (d.y < 0) d.y = 1; if (d.y > 1) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x * c.width, d.y * c.height, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${d.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="hero-canvas" />;
}

/* ─── Typewriter ─── */
function Typewriter({ words }) {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi];
    let t;
    if (!del && text === word)      t = setTimeout(() => setDel(true), 2200);
    else if (del && text === '')    { setDel(false); setWi(i => (i + 1) % words.length); }
    else t = setTimeout(() => setText(s => del ? s.slice(0,-1) : word.slice(0,s.length+1)), del ? 38 : 72);
    return () => clearTimeout(t);
  }, [text, del, wi, words]);
  return <><span>{text}</span><span className="tw-cur">|</span></>;
}

/* ─── Animated Counter ─── */
function Counter({ target }) {
  const [val, setVal] = useState(0);
  const ref  = useRef(null);
  const done = useRef(false);
  const str  = String(target);
  const dec  = (str.split('.')[1] || '').length;
  const num  = parseFloat(str);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      let step = 0;
      const id = setInterval(() => {
        step++;
        setVal(parseFloat((num * (1 - Math.pow(1 - step / 50, 3))).toFixed(dec)));
        if (step >= 50) { setVal(num); clearInterval(id); }
      }, 24);
    }, { threshold: .5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [num, dec]);
  return <span ref={ref}>{val.toFixed(dec)}</span>;
}

/* ─── Scroll Progress ─── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const tot = el.scrollHeight - el.clientHeight;
      setPct(tot > 0 ? (el.scrollTop / tot) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />;
}

/* ─── Back to Top ─── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return show ? (
    <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
  ) : null;
}

/* ─── Scroll reveal ─── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: .08 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('home');

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['contact','education','projects','experience','skills','about','home'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['About','Skills','Experience','Projects','Education','Contact'];
  const close = () => setMenuOpen(false);

  return (
    <>
      <ScrollProgress />
      <nav className={`nav${scrolled ? ' s' : ''}`}>
        <div className="nav-logo">SP.</div>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={active === l.toLowerCase() ? 'nav-active' : ''}
                onClick={close}
              >{l}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-btn" onClick={close}><span>Hire Me →</span></a>
        <button className="menu-btn" aria-label="toggle menu" onClick={() => setMenuOpen(o => !o)}>
          <span className={`ham${menuOpen ? ' open' : ''}`} />
        </button>
      </nav>
      {menuOpen && <div className="menu-overlay" onClick={close} />}
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="hero" id="home">
      <HeroParticles />
      <div className="hero-grid" />
      <div className="hero-inner">
        <div>
          <div className="hero-badge">
            <span className="hero-dot" />
            Open to opportunities
          </div>
          <h1 className="hero-name">
            Hi, I&apos;m<br />
            <span className="grad">Sai Rajesh<br />Phapale</span>
          </h1>
          <p className="hero-role">
            <Typewriter words={['Associate Software Developer','Python Backend Developer','AWS Cloud Engineer','AI/LLM Application Builder']} />
          </p>
          <p className="hero-desc">
            Building backend APIs and AI-powered applications with Python, Django & FastAPI.
            Passionate about clean architecture, cloud infrastructure, and shipping fast.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">View My Work ↓</a>
            <a href="#contact" className="btn-ghost">Get In Touch</a>
          </div>
          <div className="hero-stats">
            {[
              { t:'8.9', l:'CGPA (MSc)', s:'' },
              { t:'6',   l:'Projects',   s:'+' },
              { t:'3',   l:'Roles',      s:'+' },
              { t:'12',  l:'Skills',     s:'+' },
            ].map(({ t, l, s }) => (
              <div className="h-stat" key={l}>
                <div className="h-stat-n"><Counter target={t} />{s}</div>
                <div className="h-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-ring">
            <div className="photo-inner">
              <Image src="/profile.jpg" alt="Sai Rajesh Phapale" width={320} height={320} priority />
            </div>
          </div>
          <div className="photo-badge">
            <span className="dot2" />
            Available for Work
          </div>
          <div className="ftag t1">Python 🐍</div>
          <div className="ftag t2">AWS ☁️</div>
          <div className="ftag t3">FastAPI ⚡</div>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" className="alt">
      <div className="s-head reveal">
        <div className="s-num">01</div>
        <div className="s-tag">About Me</div>
        <h2 className="s-title">Who I <span className="g">Am</span></h2>
        <p className="s-sub">Developer who bridges web and cloud</p>
      </div>
      <div className="max about-grid">
        <div className="about-text reveal">
          <p>I&apos;m an <strong>Associate Software Developer</strong> at Coditation Systems, working primarily on <strong>Python backend development</strong>, PostgreSQL, AWS, and application deployment. I enjoy building backend APIs and AI-powered applications with Django and FastAPI, with additional experience in React on the frontend.</p>
          <p>I&apos;ve worked on AI-powered applications, cloud infrastructure, CI/CD, and Terraform-based solutions — from an AI Terraform generator to LLM-driven chat interfaces — and bring end-to-end product thinking from database to deployment.</p>
          <div className="a-stats">
            {[
              { t:'9.0',  l:'CGPA (BSc)',  s:'' },
              { t:'8.9',  l:'CGPA (MSc)',  s:'' },
              { t:'6',    l:'Projects',    s:'+' },
              { t:'12',   l:'Tech Skills', s:'+' },
            ].map(({ t, l, s }) => (
              <div className="a-stat" key={l}>
                <div className="a-stat-n"><Counter target={t} />{s}</div>
                <div className="a-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="info-list reveal">
          {[
            { ico:'📍', l:'Location',  v:'Pune, India' },
            { ico:'📧', l:'Email',     v:<a href="mailto:saiphapale7272@gmail.com">saiphapale7272@gmail.com</a> },
            { ico:'📞', l:'Phone',     v:'+91 8432737272' },
            { ico:'🎓', l:'Education', v:'M.Sc Computer Science (Pursuing)' },
            { ico:'💼', l:'Role',      v:'Associate Software Developer @ Coditation' },
            { ico:'🌐', l:'LinkedIn',  v:<a href="https://linkedin.com/in/sai-phapale" target="_blank" rel="noreferrer">linkedin.com/in/sai-phapale</a> },
            { ico:'🐙', l:'GitHub',    v:<a href="https://github.com/PhapaleSai" target="_blank" rel="noreferrer">github.com/PhapaleSai</a> },
          ].map(r => (
            <div className="info-row" key={r.l}>
              <div className="info-ico">{r.ico}</div>
              <div><div className="info-lbl">{r.l}</div><div className="info-val">{r.v}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─── */
const SKILLS = [
  { ico:'💻', name:'Programming',                 tags:['Python','C'] },
  { ico:'🖥️', name:'Backend',                     tags:['Django','Django REST Framework','FastAPI'] },
  { ico:'🌐', name:'Frontend',                    tags:['HTML','CSS','JavaScript','React','Tailwind CSS'] },
  { ico:'🗄️', name:'Databases',                   tags:['PostgreSQL','MySQL','MongoDB'] },
  { ico:'☁️', name:'Cloud (AWS)',                  tags:['EC2','S3','RDS','VPC','IAM','Route 53','CloudFormation','CloudWatch'] },
  { ico:'🌩️', name:'Other Cloud',                  tags:['GCP (Basic)','Azure (Basic)'] },
  { ico:'⚙️', name:'DevOps & Deployment',          tags:['GitLab','Git','GitHub','Jenkins','Docker','Kubernetes'] },
  { ico:'🧱', name:'Infrastructure as Code',       tags:['Terraform','Ansible'] },
  { ico:'📊', name:'Monitoring',                   tags:['Prometheus','Grafana'] },
  { ico:'🤖', name:'AI / LLM',                     tags:['OpenAI','Groq','Claude','LLM Apps','AI Agents'] },
  { ico:'🐧', name:'Operating Systems',            tags:['Ubuntu','CentOS'] },
];

function Skills() {
  return (
    <section id="skills">
      <div className="s-head reveal">
        <div className="s-num">02</div>
        <div className="s-tag">Technical Skills</div>
        <h2 className="s-title">My <span className="g">Toolkit</span></h2>
        <p className="s-sub">Technologies I use to build and ship</p>
      </div>
      <div className="max skills-grid">
        {SKILLS.map((c, i) => (
          <div className="g-card sk-card reveal" key={i} style={{ '--reveal-delay': `${i * 0.07}s` }}>
            <div className="sk-head">
              <span className="sk-ico">{c.ico}</span>
              <span className="sk-name">{c.name}</span>
            </div>
            <div className="sk-tags">
              {c.tags.map(t => <span className="sk-tag" key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─── */
function Experience() {
  return (
    <section id="experience" className="alt">
      <div className="s-head reveal">
        <div className="s-num">03</div>
        <div className="s-tag">Work History</div>
        <h2 className="s-title">My <span className="g">Experience</span></h2>
        <p className="s-sub">Where I&apos;ve learned and grown</p>
      </div>
      <div className="timeline">
        {[
          {
            ico:'🚀', role:'Associate Software Developer',
            period:'Jul 2026 – Present', co:'Coditation Systems Pvt. Ltd. · Pune',
            pts:[
              'Work primarily on Python backend development, PostgreSQL, AWS, and application deployment.',
              'Manage development and deployment workflows using GitLab, AWS, and related DevOps tools.',
              'Contribute to backend APIs, database tasks, and frontend development when required.',
            ],
          },
          {
            ico:'🖥️', role:'Software Developer Intern',
            period:'Jan 2026 – Jun 2026', co:'Coditation Systems Pvt. Ltd. · Pune',
            pts:[
              'Worked on Python backend and full-stack development, including APIs, databases, and deployment workflows.',
              'Contributed to TerraSketch, DataBridge AI, and a COBOL-to-Java modernization project.',
              'Worked with Git/GitLab, AWS, and DevOps practices in development and deployment activities.',
            ],
          },
          {
            ico:'🌱', role:'On-Job Training — Web Developer',
            period:'Mar 2025 – May 2025', co:'Tayan Solutions · Pune',
            pts:[
              'Developed responsive web pages using HTML, CSS, and JavaScript.',
              'Contributed to the QuickPick e-commerce project with cart, product browsing & checkout.',
              'Used Git/GitHub for version control and collaborative workflows.',
            ],
          },
        ].map((e, i) => (
          <div className="tl-item reveal" key={i}>
            <div className="tl-dot">{e.ico}</div>
            <div className="tl-body g-card">
              <div className="tl-top">
                <span className="tl-role">{e.role}</span>
                <span className="tl-period">{e.period}</span>
              </div>
              <div className="tl-co">{e.co}</div>
              <ul>{e.pts.map((p, j) => <li key={j}>{p}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── PROJECTS ─── */
const PROJECTS = [
  {
    ico:'🏗️', num:'01',
    name:'TerraSketch — AI-Powered Terraform Generator',
    desc:'AI-powered platform that converts cloud architecture diagrams or text descriptions into Terraform code for AWS, Azure, and GCP. Implements an agentic workflow for architecture understanding, planning, generation, validation, and review — plus security analysis and cost estimation.',
    tech:['Python','FastAPI','React','Vite','Terraform','LLMs','PostgreSQL','Docker'],
    ac:0, featured:true,
    links:[{ l:'GitHub', href:'https://github.com/saip-coditation/TerraSketch' }],
  },
  {
    ico:'🔐', num:'02',
    name:'PVG Authentication & Enterprise Management System',
    desc:'Authentication and authorization platform with JWT-based auth and RBAC. React/Vite frontend with a FastAPI + PostgreSQL backend, including user, role, module, and permission management.',
    tech:['React','Vite','FastAPI','PostgreSQL','SQLAlchemy','JWT'],
    ac:1,
    links:[{ l:'GitHub', href:'https://github.com/PhapaleSai/PVG_AUTH_Module_Repository' }],
  },
  {
    ico:'💬', num:'03',
    name:'DataBridge AI — POC Chat Interface',
    desc:'AI-powered platform for interacting with business data through natural-language queries, integrating OpenAI, Stripe, and Zendesk APIs, with JWT auth, REST APIs, and query history.',
    tech:['Django','Django REST Framework','JavaScript','OpenAI','Stripe API','Zendesk API'],
    ac:2,
    links:[{ l:'GitHub', href:'https://github.com/saip-coditation/POC_chat_interface' }],
  },
  {
    ico:'🤝', num:'04',
    name:'AI Friend',
    desc:'AI companion application with multiple AI personalities and conversational interactions, integrating Groq and Kokoro JS for AI and voice capabilities.',
    tech:['Next.js','React','TypeScript','Groq','Kokoro JS','Tailwind CSS'],
    ac:3,
    links:[{ l:'GitHub', href:'https://github.com/PhapaleSai/AI_friend_project' }],
  },
  {
    ico:'💰', num:'05',
    name:'Dhanapala — Expense Tracker',
    desc:'Android application for tracking and managing personal expenses, built natively with Kotlin.',
    tech:['Kotlin','Android','Gradle'],
    ac:4,
    links:[{ l:'GitHub', href:'https://github.com/PhapaleSai/dhanapala-expense-tracker' }],
  },
  {
    ico:'🛒', num:'06',
    name:'QuickPick — E-Commerce Website',
    desc:'Responsive e-commerce website with product browsing, cart management, and checkout functionality.',
    tech:['HTML','CSS','Bootstrap','JavaScript'],
    ac:5,
  },
];

function Projects() {
  return (
    <section id="projects">
      <div className="s-head reveal">
        <div className="s-num">04</div>
        <div className="s-tag">Portfolio</div>
        <h2 className="s-title">Featured <span className="g">Projects</span></h2>
        <p className="s-sub">Things I&apos;ve built and shipped</p>
      </div>
      <div className="max proj-grid">
        {PROJECTS.map((p, i) => (
          <div
            className={`proj-card proj-ac-${p.ac}${p.featured ? ' proj-featured' : ''} reveal`}
            key={i}
            style={{ '--reveal-delay': `${i * 0.1}s` }}
          >
            <div className="proj-top-bar" />
            <div className="proj-ico">{p.ico}</div>
            <div className="proj-num">{p.featured ? 'FEATURED PROJECT' : 'PROJECT'} {p.num}</div>
            <div className="proj-name">{p.name}</div>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-tech">
              {p.tech.map(t => <span className="p-tag" key={t}>{t}</span>)}
            </div>
            {p.links && (
              <div className="proj-links">
                {p.links.map(lk => (
                  <a href={lk.href} className="proj-link" key={lk.l} target="_blank" rel="noreferrer">
                    {lk.l === 'GitHub' ? '🐙' : '🔗'} {lk.l}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── EDUCATION ─── */
function Education() {
  return (
    <section id="education" className="alt">
      <div className="s-head reveal">
        <div className="s-num">05</div>
        <div className="s-tag">Academic Background</div>
        <h2 className="s-title">My <span className="g">Education</span></h2>
        <p className="s-sub">P.V.G College of Science, Pune</p>
      </div>
      <div className="edu-grid">
        <div className="g-card edu-card reveal">
          <div className="edu-badge">Pursuing</div>
          <div className="edu-ico">🎓</div>
          <div className="edu-deg">M.Sc. Computer Science</div>
          <div className="edu-school">P.V.G College of Science, Pune</div>
          <div className="edu-yr">2024 – 2026</div>
          <div className="edu-gpa">⭐ CGPA: 8.90</div>
        </div>
        <div className="g-card edu-card reveal" style={{ '--reveal-delay': '.1s' }}>
          <div className="edu-ico">🏛️</div>
          <div className="edu-deg">B.Sc. Computer Science</div>
          <div className="edu-school">P.V.G College of Science, Pune</div>
          <div className="edu-yr">2020 – 2023</div>
          <div className="edu-gpa">⭐ CGPA: 9.00</div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
const EJ_SERVICE  = process.env.NEXT_PUBLIC_EJ_SERVICE  || 'YOUR_SERVICE_ID';
const EJ_TEMPLATE = process.env.NEXT_PUBLIC_EJ_TEMPLATE || 'YOUR_TEMPLATE_ID';
const EJ_KEY      = process.env.NEXT_PUBLIC_EJ_KEY      || 'YOUR_PUBLIC_KEY';

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (EJ_SERVICE === 'YOUR_SERVICE_ID') {
      setStatus({ t:'err', m:'⚙️ Email not configured. Please contact: saiphapale7272@gmail.com' });
      return;
    }
    setLoading(true); setStatus(null);
    try {
      await emailjs.send(
        EJ_SERVICE, EJ_TEMPLATE,
        { from_name:form.name, from_email:form.email, subject:form.subject, message:form.message, to_email:'saiphapale7272@gmail.com' },
        EJ_KEY
      );
      setStatus({ t:'ok', m:"✅ Message sent! I'll reply within 24 hours." });
      setForm({ name:'', email:'', subject:'', message:'' });
    } catch (err) {
      console.error('EmailJS send error:', err);
      const errDetail = err?.status ? ` (Error ${err.status}: ${err.text || 'Failed'})` : '';
      setStatus({ t:'err', m: `❌ Failed to send${errDetail}. Email me at saiphapale7272@gmail.com` });
    }
    setLoading(false);
  };

  return (
    <section id="contact">
      <div className="s-head reveal">
        <div className="s-num">06</div>
        <div className="s-tag">Contact</div>
        <h2 className="s-title">Let&apos;s <span className="g">Connect</span></h2>
        <p className="s-sub">Have a project or opportunity? Let&apos;s talk.</p>
      </div>
      <div className="contact-wrap">
        <div className="c-info reveal">
          <h3>Get In Touch 👋</h3>
          <p>Whether you have a project, job opportunity, or just want to say hello — my inbox is always open.</p>
          <div className="c-links">
            {[
              { ico:'📧', l:'Email',    v:'saiphapale7272@gmail.com',  href:'mailto:saiphapale7272@gmail.com' },
              { ico:'📞', l:'Phone',    v:'+91 8432737272',             href:'tel:+918432737272' },
              { ico:'📍', l:'Location', v:'Pune, Maharashtra, India',   href:'#' },
              { ico:'💼', l:'LinkedIn', v:'Connect on LinkedIn',        href:'https://linkedin.com/in/sai-phapale' },
              { ico:'🐙', l:'GitHub',   v:'PhapaleSai on GitHub',       href:'https://github.com/PhapaleSai' },
            ].map(lk => (
              <a href={lk.href} className="c-link" key={lk.l}
                target={lk.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                <div className="c-link-ico">{lk.ico}</div>
                <div><div className="c-link-l">{lk.l}</div><div className="c-link-v">{lk.v}</div></div>
              </a>
            ))}
          </div>
        </div>
        <div className="g-card c-form reveal" style={{ '--reveal-delay': '.1s' }}>
          <div className="f-title">Send Me a Message 🚀</div>
          <div className="f-sub">Fill the form — I reply within 24 hours.</div>
          <form onSubmit={submit}>
            <div className="f-row">
              <div className="f-grp">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={set} required />
              </div>
              <div className="f-grp">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={set} required />
              </div>
            </div>
            <div className="f-grp">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="Job opportunity / Project inquiry" value={form.subject} onChange={set} required />
            </div>
            <div className="f-grp">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={set} required />
            </div>
            <button type="submit" className="f-submit" disabled={loading}>
              {loading ? 'Sending…' : '🚀 Send Message'}
            </button>
            {status && <div className={`f-msg ${status.t}`}>{status.m}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer>
      <div className="soc-bar">
        {[
          ['💼','https://linkedin.com/in/sai-phapale','LinkedIn'],
          ['🐙','https://github.com/PhapaleSai','GitHub'],
          ['📧','mailto:saiphapale7272@gmail.com','Email'],
          ['📞','tel:+918432737272','Phone'],
        ].map(([ico, href, lbl]) => (
          <a href={href} className="soc-btn" key={lbl} aria-label={lbl}
            target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">{ico}</a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} <strong>Sai Rajesh Phapale</strong> · Built with Next.js · Hosted on Vercel</p>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
