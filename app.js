// ============================================================
// APP — rendering logic + background visual effects.
// This file turns content.js into the actual page and drives
// the starfield/photo/constellation background. You shouldn't
// need to edit this for normal content changes — see content.js.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // RENDER — small, generic functions that turn CONTENT into HTML.
  // You shouldn't need to touch this when just editing content.
  // ============================================================
  const pad = n => String(n).padStart(2, '0');
  const sectionNumber = id => pad(CONTENT.nav.findIndex(s => s.id === id) + 1);

  function renderNav(){
    document.getElementById('navLinks').innerHTML = CONTENT.nav
      .map(s => `<a href="#${s.id}">${s.label}</a>`)
      .join('');
  }

  function renderSectionHead(sectionId, label){
    const el = document.getElementById(`${sectionId}-head`);
    if(!el) return;
    el.innerHTML = `
      <span class="eyebrow${el.parentElement.classList.contains('transmission') ? ' mono' : ''}">${sectionNumber(sectionId)} / ${label}</span>
      <h2>${CONTENT[sectionId].heading}</h2>
    `;
  }

  function renderAbout(){
    renderSectionHead('about', 'About');
    const stats = CONTENT.about.stats
      .map(s => `<div class="stat-row"><span class="stat-label">${s.label}</span><span class="stat-value">${s.value}</span></div>`)
      .join('');
    document.getElementById('about-body').innerHTML = `
      <div class="about-text">${CONTENT.about.paragraphs.map(p => `<p>${p}</p>`).join('')}</div>
      <div class="telemetry">
        <div class="telemetry-title">Status Readout</div>
        ${stats}
      </div>
    `;
  }

  // Shared renderer for Experience / Projects / Publications — they all
  // use the same ".mission" card layout, just with slightly different fields.
  function renderMissionList(sectionId, label, codeFn){
    renderSectionHead(sectionId, label);
    const items = CONTENT[sectionId].items
      .map((item, i) => `
        <div class="mission">
          <div class="code">${codeFn(item, i)}</div>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          </div>
          ${item.linkUrl ? `<a class="mission-link" href="${item.linkUrl}" target="_blank">${item.linkText}</a>` : ''}
        </div>
      `)
      .join('');
    document.getElementById(`${sectionId}-body`).innerHTML = items;
  }

  function renderSkills(){
    renderSectionHead('skills', 'Skills');
    document.getElementById('skills-body').innerHTML = CONTENT.skills.items
      .map((item, i) => `
        <div class="module">
          <div class="idx">MOD.${pad(i + 1)}</div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `)
      .join('');
  }

  function renderContact(){
    const el = document.getElementById('contact-head');
    el.innerHTML = `
      <span class="eyebrow mono">${sectionNumber('contact')} / Contact</span>
      <h2>${CONTENT.contact.heading}</h2>
    `;
    document.getElementById('contact-body').innerHTML = CONTENT.contact.links
      .map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`)
      .join('');
  }

  function renderHero(){
    // document.getElementById('heroStatusText').textContent = CONTENT.hero.status;
    document.getElementById('heroEyebrow').textContent = CONTENT.hero.eyebrow;
    document.getElementById('heroName').textContent = CONTENT.hero.name;
    document.getElementById('heroTagline').innerHTML = CONTENT.hero.tagline;
    document.title = `${CONTENT.hero.name} — Data Scientist`;
  }

  function renderPage(){
    renderNav();
    renderHero();
    renderAbout();
    renderMissionList('experience', 'Experience', item => item.period);
    renderMissionList('projects', 'Projects', (item, i) => `${CONTENT.projects.codePrefix}-${pad(i + 1)}`);
    renderMissionList('publications', 'Publications', (item, i) => `${CONTENT.publications.codePrefix}-${pad(i + 1)}`);
    renderSkills();
    renderContact();
  }

  renderPage();

  document.getElementById('year').textContent = new Date().getFullYear();

  // Preload the background photo, then fade it in — avoids a jarring pop-in
  // once the (still fairly large) image finishes downloading.
  const bgImg = new Image();
  bgImg.src = 'https://www.nasa.gov/wp-content/uploads/2025/03/457046main-wise20100524-full.jpg?w=1920';
  bgImg.onload = () => {
    document.getElementById('spacePhoto').style.opacity = '1';
  };

  // ============================================================
  // Interactive starfield with parallax depth + constellation lines
  // ============================================================
  const canvas = document.getElementById('sky');
  const ctx = canvas.getContext('2d');

  let width, height;
  let mouse = { x: null, y: null };
  let stars = [];

  const STAR_COUNT_DENSITY = 9000; // lower = more stars
  const LINK_DISTANCE = 130;       // max distance to draw constellation lines
  const PARALLAX_STRENGTH = 22;    // how much layers shift with cursor

  function resize(){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateStars();
  }

  // Real starlight isn't pure white — cooler blue-white, neutral, and warm amber stars,
  // roughly matching actual stellar color temperature distribution.
  const STAR_COLORS = [
    'rgba(202, 215, 255,', // blue-white (hot stars) - less common
    'rgba(232, 234, 246,', // neutral white - most common
    'rgba(232, 234, 246,',
    'rgba(232, 234, 246,',
    'rgba(255, 226, 196,', // warm amber (cooler stars) - less common
  ];

  function generateStars(){
    const count = Math.floor((width * height) / STAR_COUNT_DENSITY);
    stars = [];
    for(let i = 0; i < count; i++){
      const isBright = Math.random() > 0.985; // rare brighter "hero" stars with glow
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        radius: isBright ? (Math.random() * 0.8 + 1.6) : (Math.random() * 1.2 + 0.25),
        depth: Math.random() * 0.8 + 0.2, // 0.2 (far) - 1.0 (near) -> parallax multiplier
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.015,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        bright: isBright
      });
    }
    stars.forEach(s => { s.baseX = s.x; s.baseY = s.y; });
  }

  function draw(time){
    ctx.clearRect(0, 0, width, height);

    // offset based on mouse position relative to center, scaled by depth
    const cx = width / 2;
    const cy = height / 2;
    const mx = mouse.x !== null ? (mouse.x - cx) / cx : 0;
    const my = mouse.y !== null ? (mouse.y - cy) / cy : 0;

    // draw + update stars
    for(const s of stars){
      const parallaxX = -mx * PARALLAX_STRENGTH * s.depth;
      const parallaxY = -my * PARALLAX_STRENGTH * s.depth;
      s.x = s.baseX + parallaxX;
      s.y = s.baseY + parallaxY;

      const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinklePhase);
      const alpha = 0.35 + twinkle * 0.65;

      if(s.bright){
        // soft glow halo behind brighter stars, like light bloom in real astro shots
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 6);
        glow.addColorStop(0, `${s.color} ${alpha * 0.35})`);
        glow.addColorStop(1, `${s.color} 0)`);
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(s.x, s.y, s.radius * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${s.color} ${alpha})`;
      ctx.fill();
    }

    // constellation lines near the cursor
    if(mouse.x !== null){
      ctx.lineWidth = 0.6;
      for(let i = 0; i < stars.length; i++){
        const s = stars[i];
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < LINK_DISTANCE){
          const opacity = (1 - dist / LINK_DISTANCE) * 0.6;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = `rgba(255, 107, 74, ${opacity})`;
          ctx.stroke();
        }
      }

      // small glow at cursor position
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
      grad.addColorStop(0, 'rgba(255, 107, 74, 0.25)');
      grad.addColorStop(1, 'rgba(255, 107, 74, 0)');
      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);

  const spacePhoto = document.getElementById('spacePhoto');
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // shift the real photo a few pixels opposite the cursor for a gentle
    // "looking through a window into space" parallax feel
    const shiftX = (e.clientX / window.innerWidth - 0.5) * -30;
    const shiftY = (e.clientY / window.innerHeight - 0.5) * -30;
    spacePhoto.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(1.08)`;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  // touch support: use touch position for parallax, skip constellation lines to keep it light
  window.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  resize();
  requestAnimationFrame(draw);
});