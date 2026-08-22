'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

/* ─── Brand Icons ─── */
function IconGitHub({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
    </svg>
  );
}
function IconAWS({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.76 10.4c0 .3.03.53.09.7.06.16.15.35.28.55.05.07.07.14.07.2 0 .09-.05.17-.16.26l-.53.35a.4.4 0 0 1-.22.07c-.08 0-.17-.04-.25-.12a2.6 2.6 0 0 1-.3-.4 6.3 6.3 0 0 1-.26-.5c-.65.77-1.47 1.15-2.45 1.15-.7 0-1.26-.2-1.66-.6-.4-.4-.6-.94-.6-1.6 0-.72.25-1.3.77-1.74.51-.44 1.19-.66 2.06-.66.28 0 .58.02.9.07.3.04.63.11.97.19v-.62c0-.63-.13-1.06-.39-1.32-.27-.25-.72-.37-1.36-.37-.29 0-.59.03-.9.1-.31.07-.61.16-.9.28a2.4 2.4 0 0 1-.3.11.5.5 0 0 1-.13.02c-.12 0-.18-.09-.18-.27v-.42c0-.14.02-.24.06-.3a.65.65 0 0 1 .24-.2c.29-.15.65-.28 1.06-.38a5 5 0 0 1 1.31-.16c1 0 1.73.23 2.2.68.46.46.7 1.15.7 2.08v2.74Zm-3.38 1.27c.27 0 .55-.05.85-.15.3-.1.56-.29.79-.54.13-.16.23-.34.28-.54.05-.2.09-.44.09-.72v-.35a7 7 0 0 0-.78-.15 6.3 6.3 0 0 0-.8-.05c-.57 0-.98.11-1.27.34-.28.22-.42.54-.42.97 0 .4.1.7.31.9.2.2.5.3.95.3Zm6.7.9c-.16 0-.27-.03-.34-.09-.07-.05-.13-.18-.18-.35L7.71 5.65a1.6 1.6 0 0 1-.08-.36c0-.14.07-.22.21-.22h.87c.17 0 .29.03.35.09.07.06.12.18.17.35l1.35 5.32 1.25-5.32c.04-.18.09-.29.16-.35.07-.06.2-.09.36-.09h.71c.17 0 .29.03.36.09.07.06.13.18.16.35l1.27 5.38 1.39-5.38c.05-.18.11-.29.17-.35.07-.06.19-.09.35-.09h.83c.14 0 .22.08.22.22a.9.9 0 0 1-.02.14 1.3 1.3 0 0 1-.06.22l-1.93 6.48c-.05.18-.11.29-.18.35a.53.53 0 0 1-.34.09h-.76c-.17 0-.29-.03-.36-.1-.07-.06-.13-.18-.16-.36l-1.24-5.2-1.24 5.19c-.04.18-.09.29-.16.36-.07.07-.2.1-.36.1h-.76Zm10.72.22a5.5 5.5 0 0 1-1.28-.15c-.4-.1-.72-.21-.94-.34-.14-.08-.23-.16-.27-.24a.6.6 0 0 1-.05-.24v-.44c0-.18.07-.27.2-.27a.5.5 0 0 1 .16.03c.06.02.14.06.24.1.32.14.68.25 1.05.32.38.08.75.11 1.13.11.6 0 1.06-.1 1.38-.31.32-.21.49-.51.49-.9 0-.26-.08-.48-.25-.66-.17-.18-.48-.34-.93-.5l-1.33-.42c-.67-.21-1.17-.53-1.48-.94a2.2 2.2 0 0 1-.46-1.35c0-.39.08-.73.25-1.03.17-.3.4-.56.68-.76.29-.21.6-.37.98-.48.37-.11.76-.16 1.17-.16.2 0 .42.01.63.04.22.03.42.07.62.11.19.05.37.1.53.16.17.06.3.12.4.18a.8.8 0 0 1 .28.24.5.5 0 0 1 .08.3v.4c0 .19-.07.28-.2.28a.9.9 0 0 1-.33-.11 3.9 3.9 0 0 0-1.67-.34c-.55 0-.98.09-1.28.28-.3.19-.45.47-.45.86 0 .26.09.49.27.67.18.18.52.36 1 .53l1.3.41c.65.21 1.14.51 1.43.89.29.38.43.82.43 1.3 0 .4-.08.76-.25 1.08-.17.32-.4.6-.7.82-.3.23-.65.4-1.06.52-.43.13-.87.19-1.36.19Z"/>
      <path d="M21.6 16.6c-2.6 1.93-6.38 2.95-9.63 2.95-4.56 0-8.66-1.68-11.77-4.49-.24-.22-.02-.52.27-.35 3.36 1.95 7.5 3.13 11.79 3.13 2.89 0 6.07-.6 9-1.84.44-.19.81.29.34.6Z"/>
      <path d="M22.72 15.34c-.33-.43-2.2-.2-3.04-.1-.25.03-.29-.19-.06-.35 1.49-1.04 3.93-.74 4.21-.39.28.35-.08 2.8-1.47 3.97-.21.18-.42.08-.32-.15.32-.79 1.03-2.56.68-2.98Z"/>
    </svg>
  );
}

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

/* ─── Cursor Glow ─── */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = e => {
      if (!ref.current) return;
      ref.current.style.setProperty('--mx', `${e.clientX}px`);
      ref.current.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="cursor-glow" ref={ref} />;
}

/* ─── Card spotlight (mouse-tracked glow) ─── */
function spotlightMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`);
}

/* ─── Hero Photo (3D tilt + orbit + glow) ─── */
function HeroPhoto() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -16, y: px * 18 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="hero-photo"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ '--rx': `${tilt.x}deg`, '--ry': `${tilt.y}deg` }}
    >
      <div className="photo-stage">
        <div className="pulse-ring pr1" />
        <div className="pulse-ring pr2" />
        <div className="photo-orbit">
          <span className="orbit-dot od1" />
          <span className="orbit-dot od2" />
          <span className="orbit-dot od3" />
        </div>
        <div className="photo-tilt">
          <div className="photo-ring">
            <div className="photo-inner">
              <Image src="/profile.jpg" alt="Sai Rajesh Phapale" width={320} height={320} priority />
              <div className="photo-shine" />
            </div>
          </div>
        </div>
        <div className="photo-badge">
          <span className="dot2" />
          Available for Work
        </div>
        <div className="ftag-row">
          <div className="ftag t1">Python 🐍</div>
          <div className="ftag t2"><IconAWS className="ftag-icon" /> AWS</div>
          <div className="ftag t3">FastAPI ⚡</div>
        </div>
      </div>
    </div>
  );
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
        <HeroPhoto />
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
            { ico:<IconGitHub className="info-icon" />, l:'GitHub', v:<a href="https://github.com/PhapaleSai" target="_blank" rel="noreferrer">github.com/PhapaleSai</a> },
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
  { ico:<IconAWS className="sk-ico-svg" />, name:'Cloud (AWS)', tags:['EC2','S3','RDS','VPC','IAM','Route 53','CloudFormation','CloudWatch'] },
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
          <div className="g-card sk-card reveal" key={i} style={{ '--reveal-delay': `${i * 0.07}s` }} onMouseMove={spotlightMove}>
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
            <div className="tl-body g-card" onMouseMove={spotlightMove}>
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
            onMouseMove={spotlightMove}
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
                    {lk.l === 'GitHub' ? <IconGitHub className="link-icon" /> : '🔗'} {lk.l}
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
        <div onMouseMove={spotlightMove} className="g-card edu-card reveal">
          <div className="edu-badge">Pursuing</div>
          <div className="edu-ico">🎓</div>
          <div className="edu-deg">M.Sc. Computer Science</div>
          <div className="edu-school">P.V.G College of Science, Pune</div>
          <div className="edu-yr">2024 – 2026</div>
          <div className="edu-gpa">⭐ CGPA: 8.90</div>
        </div>
        <div onMouseMove={spotlightMove} className="g-card edu-card reveal" style={{ '--reveal-delay': '.1s' }}>
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
              { ico:<IconGitHub className="c-link-svg" />, l:'GitHub', v:'PhapaleSai on GitHub', href:'https://github.com/PhapaleSai' },
            ].map(lk => (
              <a href={lk.href} className="c-link" key={lk.l}
                target={lk.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                <div className="c-link-ico">{lk.ico}</div>
                <div><div className="c-link-l">{lk.l}</div><div className="c-link-v">{lk.v}</div></div>
              </a>
            ))}
          </div>
        </div>
        <div className="g-card c-form reveal" style={{ '--reveal-delay': '.1s' }} onMouseMove={spotlightMove}>
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
          [<IconGitHub className="soc-svg" key="gh" />,'https://github.com/PhapaleSai','GitHub'],
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
      <CursorGlow />
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
