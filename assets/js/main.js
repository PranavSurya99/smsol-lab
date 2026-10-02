/* ============================================================
   SML Lab — Interactivity layer
   1. Animated "transit network" canvas for hero backgrounds
   2. Scroll-reveal animations (IntersectionObserver)
   3. Animated number counters
   4. Mobile nav toggle
   5. Back-to-top button
   ============================================================ */

/* ---------- 1. Network canvas ---------- */
function initNetworkCanvas(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes;
  const NODE_COUNT_DENSITY = 9000; // px^2 per node
  const LINK_DIST = 130;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width * devicePixelRatio;
    h = canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const count = Math.max(14, Math.min(46, Math.floor((rect.width*rect.height)/NODE_COUNT_DENSITY)));
    nodes = Array.from({length: count}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.25*devicePixelRatio,
      vy: (Math.random()-0.5)*0.25*devicePixelRatio,
      r: (Math.random()*1.6+1.2)*devicePixelRatio
    }));
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    for(const n of nodes){
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > w) n.vx *= -1;
      if(n.y < 0 || n.y > h) n.vy *= -1;
    }
    const linkDist = LINK_DIST * devicePixelRatio;
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < linkDist){
          const alpha = (1 - dist/linkDist) * 0.5;
          ctx.strokeStyle = `rgba(201,162,39,${alpha})`;
          ctx.lineWidth = 1 * devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    for(const n of nodes){
      ctx.beginPath();
      ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle = 'rgba(27,111,111,0.55)';
      ctx.fill();
    }
    if(!prefersReduced) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize);
  step();
}

/* ---------- 2. Scroll reveal ---------- */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || els.length === 0){
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  els.forEach(el => io.observe(el));
}

/* ---------- 3. Animated counters ---------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-counter]');
  if(counters.length === 0) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const duration = 1100;
      const start = performance.now();
      function tick(now){
        const p = Math.min(1, (now-start)/duration);
        const eased = 1 - Math.pow(1-p, 3);
        el.textContent = Math.round(target*eased) + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, {threshold:0.5});
  counters.forEach(el => io.observe(el));
}

/* ---------- 4. Mobile nav toggle ---------- */
function initMobileNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.route');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.textContent = '☰';
  }));
}

/* ---------- 5. Back to top ---------- */
function initBackToTop(){
  const btn = document.querySelector('.back-to-top');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 480);
  });
  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

/* ---------- 6. Publication / tag filters ---------- */
function initFilters(){
  const filterBar = document.querySelector('.filter-bar');
  if(!filterBar) return;
  const buttons = filterBar.querySelectorAll('button');
  const items = document.querySelectorAll('[data-tags]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const tags = item.dataset.tags.split(',');
        item.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
      });
    });
  });
}

/* ---------- 7. Theme toggle (light/dark, remembered) ---------- */
function initThemeToggle(){
  const btn = document.querySelector('.theme-toggle');
  if(!btn) return;
  const root = document.documentElement;
  const saved = localStorage.getItem('sml-theme');
  const initial = saved || 'light';
  root.setAttribute('data-theme', initial);
  btn.textContent = initial === 'dark' ? '☀' : '☾';
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('sml-theme', next);
    btn.textContent = next === 'dark' ? '☀' : '☾';
  });
}

/* ---------- 8. Scroll progress bar ---------- */
function initScrollProgress(){
  const bar = document.querySelector('.scroll-progress');
  if(!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = max > 0 ? (scrolled/max*100) + '%' : '0%';
  });
}

/* ---------- 9. FAQ accordion ---------- */
function initAccordion(){
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq');
      const wasOpen = item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq.open').forEach(f => f.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });
}

/* ---------- 10. Publication live search ---------- */
function initPubSearch(){
  const input = document.querySelector('.pub-search');
  if(!input) return;
  const pubs = document.querySelectorAll('.pub');
  const empty = document.querySelector('.pub-empty');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    pubs.forEach(p => {
      const match = p.textContent.toLowerCase().includes(q);
      p.style.display = match ? '' : 'none';
      if(match) visible++;
    });
    if(empty) empty.classList.toggle('show', visible === 0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNetworkCanvas('network-canvas');
  initReveal();
  initCounters();
  initMobileNav();
  initBackToTop();
  initFilters();
  initThemeToggle();
  initScrollProgress();
  initAccordion();
  initPubSearch();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
});
