const express = require('express');
const compression = require('compression');
const { getJobData, getJobSchema, TOTAL_JOBS, jobTitles, companies, swedishLocations, industries } = require('./jobData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(__dirname));
app.use(express.static('public'));

// ─── AD CONFIGURATION ──────────────────────────────────────────────────────────
const AD_SCRIPT = `
<script>
  atOptions = {
    'key' : '72b6f3ac3fc2f43722e5f2196ef85add',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/72b6f3ac3fc2f43722e5f2196ef85add/invoke.js"></script>
`;

const AD_TOP = `
<div style="text-align:center; width:100%; padding:10px 0; background:#fff; border-bottom:1px solid #eee;">
  ${AD_SCRIPT}
</div>
`;

const AD_MIDDLE = `
<div style="text-align:center; width:100%; padding:10px 0; background:#fff; margin:20px 0; border:1px solid #eee; border-radius:8px;">
  ${AD_SCRIPT}
</div>
`;

const AD_BOTTOM = `
<div style="text-align:center; width:100%; padding:10px 0; background:#fff; border-top:1px solid #eee; margin-top:20px;">
  ${AD_SCRIPT}
</div>
`;

// ── Helpers ──────────────────────────────────────────────────────────────────
const JOBS_PER_PAGE = 20;

function renderHTML({ title, meta, bodyContent, schema }) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="google-site-verification" content="f_swjSKQxA8Dye1qCFyBXzBnhlnmJ2vPjFOPiLsvIvo" />
<title>${title}</title>
<meta name="description" content="${meta}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${meta}"/>
<meta name="robots" content="index, follow"/>
${schema ? `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>` : ''}
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;color:#222;line-height:1.6}
a{color:inherit;text-decoration:none}
nav{background:#1a6b8a;color:#fff;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:100}
nav .brand{font-size:1.25rem;font-weight:700;color:#fff}
nav .brand span{color:#ffd700}
nav .nav-links{display:flex;gap:1.5rem;font-size:0.85rem}
nav .nav-links a{color:rgba(255,255,255,0.8);transition:color .2s}
nav .nav-links a:hover{color:#ffd700}
.hero{background:linear-gradient(135deg,#1a6b8a 0%,#0f4a5e 50%,#0a2f3d 100%);color:#fff;padding:3rem 1.5rem;text-align:center}
.hero h1{font-size:clamp(1.6rem,4vw,2.8rem);font-weight:800;margin-bottom:.75rem}
.hero h1 .accent{color:#ffd700}
.hero p{font-size:1rem;opacity:.85;margin-bottom:1.5rem;max-width:600px;margin-left:auto;margin-right:auto}
.stat-bar{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;margin-top:1.5rem}
.stat{text-align:center}.stat strong{display:block;font-size:1.5rem;color:#ffd700}
.stat span{font-size:.8rem;opacity:.75}
.search-bar{background:#fff;padding:1.25rem 1.5rem;border-bottom:1px solid #e0e0e0;display:flex;gap:.75rem;flex-wrap:wrap;max-width:960px;margin:0 auto}
.search-bar input,.search-bar select{flex:1;min-width:160px;padding:.6rem .9rem;border:1.5px solid #d0d0d0;border-radius:8px;font-size:.9rem;outline:none}
.search-bar input:focus,.search-bar select:focus{border-color:#1a6b8a}
.search-bar button{padding:.6rem 1.4rem;background:#ffd700;color:#1a1a2e;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:.9rem}
.filter-row{background:#fff;border-bottom:1px solid #ebebeb;padding:.6rem 1.5rem;display:flex;gap:.5rem;flex-wrap:wrap;max-width:960px;margin:0 auto}
.filter-chip{padding:.35rem .85rem;border:1.5px solid #d0d0d0;border-radius:20px;font-size:.78rem;cursor:pointer;background:#fff;transition:all .2s;white-space:nowrap}
.filter-chip.active,.filter-chip:hover{background:#1a6b8a;color:#fff;border-color:#1a6b8a}
.container{max-width:960px;margin:0 auto;padding:1.5rem}
.page-grid{display:grid;grid-template-columns:1fr;gap:1rem}
.job-card{background:#fff;border-radius:12px;padding:1.25rem 1.5rem;border:1.5px solid #e8e8e8;transition:border-color .2s,transform .15s;display:flex;flex-direction:column;gap:.75rem}
.job-card:hover{border-color:#1a6b8a;transform:translateY(-2px)}
.card-header{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap}
.card-title{font-size:1.05rem;font-weight:700;color:#1a1a2e;margin-bottom:.2rem}
.card-company{font-size:.88rem;color:#555}
.card-badges{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}
.badge{padding:.28rem .7rem;border-radius:20px;font-size:.73rem;font-weight:600;white-space:nowrap}
.badge-remote{background:#e8f5e9;color:#2e7d32}
.badge-office{background:#e3f2fd;color:#1565c0}
.badge-type{background:#f3e5f5;color:#6a1b9a}
.badge-exp{background:#fff3e0;color:#e65100}
.card-meta{display:flex;gap:1rem;flex-wrap:wrap;font-size:.82rem;color:#666}
.card-meta span{display:flex;align-items:center;gap:.3rem}
.card-desc{font-size:.85rem;color:#555;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-footer{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}
.card-salary{font-weight:700;color:#1a1a2e;font-size:.9rem}
.btn-apply{padding:.55rem 1.3rem;background:#1a6b8a;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:.85rem;cursor:pointer;transition:background .2s}
.btn-apply:hover{background:#0f4a5e}
.job-detail{background:#fff;border-radius:12px;padding:2rem;border:1.5px solid #e8e8e8}
.job-detail h1{font-size:1.6rem;font-weight:800;color:#1a1a2e;margin-bottom:.5rem}
.detail-meta{display:flex;gap:.75rem;flex-wrap:wrap;margin:1rem 0;padding:1rem 0;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0}
.detail-chip{padding:.4rem 1rem;border-radius:8px;font-size:.82rem;font-weight:600;background:#f5f5f5;color:#333}
.detail-chip.highlight{background:#fff8e1;color:#f57f17}
.detail-body{font-size:.9rem;color:#444;line-height:1.8;white-space:pre-line;margin:1.5rem 0}
.apply-section{background:#f9f9f9;border-radius:12px;padding:1.5rem;text-align:center;border:1.5px dashed #e0e0e0}
.apply-section h3{margin-bottom:.5rem;color:#1a1a2e}
.apply-section p{font-size:.85rem;color:#666;margin-bottom:1rem}
.btn-apply-big{padding:.85rem 2.5rem;background:#1a6b8a;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1rem;cursor:pointer;transition:background .2s}
.btn-apply-big:hover{background:#0f4a5e}
.pagination{display:flex;justify-content:center;gap:.4rem;margin:2rem 0;flex-wrap:wrap}
.pagination a,.pagination span{padding:.5rem .9rem;border-radius:8px;border:1.5px solid #e0e0e0;font-size:.85rem;background:#fff}
.pagination a:hover{border-color:#1a6b8a;color:#1a6b8a}
.pagination .current{background:#1a6b8a;color:#fff;border-color:#1a6b8a}
.breadcrumb{font-size:.82rem;color:#888;margin-bottom:1rem}
.breadcrumb a{color:#1a6b8a}
.info-box{background:#fff;border-radius:12px;padding:1.25rem 1.5rem;border-left:4px solid #1a6b8a;margin-bottom:1rem;font-size:.88rem}
footer{background:#1a1a2e;color:rgba(255,255,255,0.7);text-align:center;padding:1.5rem;font-size:.82rem;margin-top:3rem}
footer a{color:#ffd700}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999;align-items:center;justify-content:center}
.modal-overlay.open{display:flex}
.modal{background:#fff;border-radius:16px;padding:2rem;max-width:480px;width:90%;position:relative}
.modal h2{font-size:1.2rem;font-weight:700;margin-bottom:1rem;color:#1a1a2e}
.modal input{width:100%;padding:.7rem;border:1.5px solid #ddd;border-radius:8px;font-size:.9rem;margin-bottom:.85rem;outline:none}
.modal input:focus{border-color:#1a6b8a}
.modal .btn-submit{width:100%;padding:.75rem;background:#1a6b8a;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-size:.95rem}
.modal .btn-submit:hover{background:#0f4a5e}
.modal .close-btn{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.4rem;cursor:pointer;color:#888}
.success-msg{display:none;text-align:center;padding:1rem;color:#2e7d32;font-weight:600}
@media(max-width:600px){.search-bar{flex-direction:column}.stat-bar{gap:1rem}}
</style>
</head>
<body>
${AD_TOP}
<nav>
  <a class="brand" href="/"><span>JOB</span>BAST<span>.se</span></a>
  <div class="nav-links">
    <a href="/">Hem</a>
    <a href="/jobb">Alla Jobb</a>
    <a href="/jobb?type=remote">Distansjobb</a>
    <a href="/sitemap">Sitemap</a>
  </div>
</nav>
<div style="display:flex; justify-content:center; margin:20px 0;">
    <div>
<script>
  atOptions = {
    'key' : 'd1b072857c7132ec474a48b3413701e2',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/d1b072857c7132ec474a48b3413701e2/invoke.js"></script>
</div>
</div>
${bodyContent}
${AD_BOTTOM}
<footer>
  &copy; 2025 JOBBBAST.se — <strong>100 000 Jobb</strong> i Sverige |
  <a href="/jobb">Alla Jobb</a> · <a href="/jobb?type=remote">Distansjobb</a> · <a href="/sitemap">Sitemap</a>
</footer>
<script>
function openApply(title){
  window.location.href='https://rightwing-production.up.railway.app/apply-now.html';
}
</script>
</body>
</html>`;
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  const featuredIds = [1, 50001, 2, 50002, 3, 50003, 10000, 60000];
  const featuredJobs = featuredIds.map(id => getJobData(id));

  const cards = featuredJobs.map(job => `
<a href="/jobb/${job.id}" style="display:block">
<div class="job-card">
  <div class="card-header">
    <div>
      <div class="card-title">${job.title}</div>
      <div class="card-company">${job.company}</div>
    </div>
    <div class="card-badges">
      <span class="badge ${job.isRemote ? 'badge-remote' : 'badge-office'}">${job.isRemote ? '🌐 Distans' : '🏢 På plats'}</span>
      <span class="badge badge-type">${job.jobTypeDisplay}</span>
    </div>
  </div>
  <div class="card-meta">
    <span>📍 ${job.location}</span>
    <span>🏭 ${job.industry}</span>
    <span>📅 ${job.postedDate}</span>
  </div>
  <div class="card-desc">${job.description.substring(0, 180)}...</div>
  <div class="card-footer">
    <span class="card-salary">${job.salary}</span>
    <button class="btn-apply" onclick="event.preventDefault();openApply('${job.title.replace(/'/g, "\\'")} at ${job.company.replace(/'/g, "\\'")}')">Ansök nu</button>
  </div>
</div>
</a>`).join('');

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JOBBBAST.se",
    "url": "https://rightwing-production.up.railway.app",
    "description": "Sveriges största jobbportal med 100 000 jobbannonser — distans och på plats i hela Sverige",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://rightwing-production.up.railway.app/jobb?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const body = `
<div class="hero">
  <h1>Hitta ditt drömjobb i <span class="accent">Sverige</span></h1>
  <p>100 000 verifierade jobb — distans & på plats — över hela Sverige</p>
  <form action="/jobb" method="get" style="display:flex;gap:.75rem;max-width:580px;margin:0 auto;flex-wrap:wrap">
    <input name="q" type="text" placeholder="Jobbtitel, bransch eller företag..." style="flex:2;min-width:200px;padding:.7rem 1rem;border-radius:8px;border:none;font-size:.95rem"/>
    <select name="location" style="flex:1;min-width:140px;padding:.7rem;border-radius:8px;border:none;font-size:.85rem">
      <option value="">Alla län</option>
      <option value="remote">Distans endast</option>
      <option value="stockholm">Stockholms län</option>
      <option value="vastra-gotaland">Västra Götalands län</option>
      <option value="skane">Skåne län</option>
      <option value="uppsala">Uppsala län</option>
    </select>
    <button type="submit" style="padding:.7rem 1.5rem;background:#ffd700;color:#1a1a2e;border:none;border-radius:8px;font-weight:700;cursor:pointer">Sök →</button>
  </form>
  <div class="stat-bar">
    <div class="stat"><strong>100 000</strong><span>Jobb totalt</span></div>
    <div class="stat"><strong>50 000</strong><span>Distansjobb</span></div>
    <div class="stat"><strong>50 000</strong><span>På plats</span></div>
    <div class="stat"><strong>21</strong><span>Län</span></div>
    <div class="stat"><strong>200+</strong><span>Företag</span></div>
  </div>
</div>

<div class="container">
  <div class="info-box">
    🇸🇪 Sveriges mest omfattande jobbportal — <strong>50 000 distansjobb</strong> och <strong>50 000 på-plats-jobb</strong> inom alla branscher.
  </div>
   ${AD_MIDDLE}
  <h2 style="margin-bottom:1rem;font-size:1.2rem">Utvalda jobb</h2>
  <div class="page-grid">${cards}</div>
  <div style="text-align:center;margin-top:2rem">
    <a href="/jobb" style="display:inline-block;padding:.85rem 2.5rem;background:#1a1a2e;color:#fff;border-radius:10px;font-weight:700">Se alla 100 000 jobb →</a>
  </div>
</div>`;

  res.send(renderHTML({
    title: 'JOBBBAST.se — 100 000 Jobb i Sverige | Distans & På Plats',
    meta: 'Hitta ditt nästa jobb i Sverige. 100 000 verifierade annonser — 50 000 distansjobb och 50 000 på-plats-jobb över hela landet.',
    bodyContent: body,
    schema: websiteSchema
  }));
});

// ── JOB LISTING PAGE ──────────────────────────────────────────────────────────
app.get('/jobb', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const typeFilter = req.query.type || 'all';
  const locationFilter = req.query.location || '';
  const q = req.query.q || '';

  let jobIds = [];
  if (typeFilter === 'remote') {
    const start = (page - 1) * JOBS_PER_PAGE + 1;
    for (let i = start; i < start + JOBS_PER_PAGE && i <= 50000; i++) jobIds.push(i);
  } else if (typeFilter === 'onsite') {
    const start = 50000 + (page - 1) * JOBS_PER_PAGE + 1;
    for (let i = start; i < start + JOBS_PER_PAGE && i <= TOTAL_JOBS; i++) jobIds.push(i);
  } else {
    const start = (page - 1) * JOBS_PER_PAGE + 1;
    for (let i = start; i < start + JOBS_PER_PAGE && i <= TOTAL_JOBS; i++) jobIds.push(i);
  }

  const jobs = jobIds.map(id => getJobData(id));
  const totalPages = Math.ceil(TOTAL_JOBS / JOBS_PER_PAGE);

  const cards = jobs.map(job => `
<a href="/jobb/${job.id}" style="display:block">
<div class="job-card">
  <div class="card-header">
    <div>
      <div class="card-title">${job.title}</div>
      <div class="card-company">${job.company}</div>
    </div>
    <div class="card-badges">
      <span class="badge ${job.isRemote ? 'badge-remote' : 'badge-office'}">${job.isRemote ? '🌐 Distans' : '🏢 På plats'}</span>
      <span class="badge badge-type">${job.jobTypeDisplay}</span>
      <span class="badge badge-exp">${job.experience}</span>
    </div>
  </div>
  <div class="card-meta">
    <span>📍 ${job.location}</span>
    <span>🏭 ${job.industry}</span>
    <span>📅 ${job.postedDate}</span>
  </div>
  <div class="card-desc">${job.description.substring(0, 200)}...</div>
  <div class="card-footer">
    <span class="card-salary">${job.salary}</span>
    <button class="btn-apply" onclick="event.preventDefault();openApply('${job.title.replace(/'/g, "\\'")} at ${job.company.replace(/'/g, "\\'")}')">Ansök nu</button>
  </div>
</div>
</a>`).join('');

  const pages = [];
  if (page > 1) pages.push(`<a href="/jobb?page=${page - 1}&type=${typeFilter}">← Föregående</a>`);
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  if (start > 1) pages.push(`<a href="/jobb?page=1&type=${typeFilter}">1</a><span>…</span>`);
  for (let p = start; p <= end; p++) {
    pages.push(p === page
      ? `<span class="current">${p}</span>`
      : `<a href="/jobb?page=${p}&type=${typeFilter}">${p}</a>`);
  }
  if (end < totalPages) pages.push(`<span>…</span><a href="/jobb?page=${totalPages}&type=${typeFilter}">${totalPages.toLocaleString()}</a>`);
  if (page < totalPages) pages.push(`<a href="/jobb?page=${page + 1}&type=${typeFilter}">Nästa →</a>`);

  const body = `
<div class="hero" style="padding:1.75rem 1.5rem">
  <h1 style="font-size:1.8rem">Bläddra bland <span class="accent">100 000 Jobb</span> i Sverige</h1>
  <p>Sida ${page.toLocaleString()} av ${totalPages.toLocaleString()}</p>
</div>
<div class="filter-row">
  <a href="/jobb"><span class="filter-chip ${typeFilter==='all'?'active':''}">Alla jobb (100 000)</span></a>
  <a href="/jobb?type=remote"><span class="filter-chip ${typeFilter==='remote'?'active':''}">🌐 Distans (50 000)</span></a>
  <a href="/jobb?type=onsite"><span class="filter-chip ${typeFilter==='onsite'?'active':''}">🏢 På plats (50 000)</span></a>
</div>
<div class="container">
  <div class="page-grid">${cards}</div>
  <div class="pagination">${pages.join('')}</div>
</div>`;

  res.send(renderHTML({
    title: `Jobb i Sverige — Sida ${page} av ${totalPages.toLocaleString()} | JOBBBAST.se`,
    meta: `Bläddra bland ${TOTAL_JOBS.toLocaleString()} jobb i Sverige. Sida ${page}. Distans och på-plats-positioner inom alla branscher.`,
    bodyContent: body,
    schema: null
  }));
});

// ── INDIVIDUAL JOB PAGE ───────────────────────────────────────────────────────
app.get('/jobb/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || id < 1 || id > TOTAL_JOBS) {
    return res.status(404).send(renderHTML({
      title: 'Jobb ej hittat | JOBBBAST.se',
      meta: 'Denna jobbannons kunde inte hittas.',
      bodyContent: `<div class="container" style="text-align:center;padding:4rem 1.5rem"><h1>404 — Jobb ej hittat</h1><p style="margin:1rem 0 2rem">Detta jobb kan ha blivit tillsatt eller borttaget.</p><a href="/jobb" style="color:#1a6b8a">← Bläddra bland alla jobb</a></div>`,
      schema: null
    }));
  }

  const job = getJobData(id);
  const schema = getJobSchema(job);

  const relatedIds = [
    Math.max(1, id - 2), Math.max(1, id - 1),
    Math.min(TOTAL_JOBS, id + 1), Math.min(TOTAL_JOBS, id + 2)
  ].filter(rid => rid !== id);
  const relatedJobs = relatedIds.slice(0, 3).map(rid => getJobData(rid));

  const relatedCards = relatedJobs.map(rj => `
<a href="/jobb/${rj.id}" style="display:block">
<div class="job-card" style="padding:1rem">
  <div class="card-title" style="font-size:.95rem">${rj.title}</div>
  <div class="card-company">${rj.company}</div>
  <div style="margin-top:.5rem;display:flex;gap:.5rem;flex-wrap:wrap">
    <span class="badge ${rj.isRemote ? 'badge-remote' : 'badge-office'}" style="font-size:.7rem">${rj.isRemote ? '🌐 Distans' : '🏢 På plats'}</span>
    <span class="badge badge-type" style="font-size:.7rem">${rj.jobTypeDisplay}</span>
  </div>
</div>
</a>`).join('');

  const body = `
<div class="container">
  <div class="breadcrumb">
    <a href="/">Hem</a> › <a href="/jobb">Jobb</a> › <a href="/jobb?type=${job.isRemote ? 'remote' : 'onsite'}">${job.isRemote ? 'Distans' : 'På plats'}</a> › ${job.title}
  </div>
  <div class="job-detail">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem">
      <div>
        <h1>${job.title}</h1>
        <p style="font-size:1.05rem;color:#555;margin-top:.35rem">${job.company} · ${job.industry}</p>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.5rem">
        <span class="badge ${job.isRemote ? 'badge-remote' : 'badge-office'}" style="font-size:.85rem;padding:.4rem 1rem">${job.isRemote ? '🌐 Distans' : '🏢 På plats'}</span>
        <span style="font-size:.8rem;color:#888">Jobb-ID: SE-${String(job.id).padStart(6, '0')}</span>
      </div>
    </div>
    <div class="detail-meta">
      <span class="detail-chip highlight">💰 ${job.salary}</span>
      <span class="detail-chip">📍 ${job.location}</span>
      <span class="detail-chip">💼 ${job.jobTypeDisplay}</span>
      <span class="detail-chip">📊 ${job.experience}</span>
      <span class="detail-chip">🏭 ${job.industry}</span>
      <span class="detail-chip">📅 Publicerad: ${job.postedDate}</span>
    </div>
    <div class="detail-body">${job.description}</div>
    <div class="apply-section">
      <h3>Redo att ansöka?</h3>
      <p>Skicka in din ansökan för <strong>${job.title}</strong> hos <strong>${job.company}</strong> — tar mindre än 2 minuter</p>
      <button class="btn-apply-big" onclick="openApply('${job.title.replace(/'/g, "\\'")} at ${job.company.replace(/'/g, "\\'")}')">
        Ansök nu →
      </button>
    </div>
  </div>

  <div style="margin-top:2rem">
    <h2 style="font-size:1.1rem;margin-bottom:1rem">Liknande jobb du kanske gillar</h2>
    <div class="page-grid">${relatedCards}</div>
  </div>
  <div style="text-align:center;margin-top:1.5rem">
    <a href="/jobb" style="color:#1a6b8a;font-weight:600">← Bläddra bland alla 100 000 jobb</a>
  </div>
</div>`;

  res.send(renderHTML({
    title: `${job.title} hos ${job.company} — ${job.location} | JOBBBAST.se`,
    meta: `${job.title} jobb hos ${job.company}. ${job.isRemote ? 'Distans' : job.location}. ${job.salary}. Ansök nu på JOBBBAST.se.`,
    bodyContent: body,
    schema
  }));
});

// ── SITEMAP INDEX ─────────────────────────────────────────────────────────────
app.get('/sitemap.xml', (req, res) => {
  const totalSitemaps = 100;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (let i = 1; i <= totalSitemaps; i++) {
    xml += `\n<sitemap><loc>https://rightwing-production.up.railway.app/sitemap-${i}.xml</loc></sitemap>`;
  }
  xml += `\n</sitemapindex>`;
  res.type('application/xml').send(xml);
});

app.get('/sitemap-:num.xml', (req, res) => {
  const num = parseInt(req.params.num);
  if (!num || num < 1 || num > 100) return res.status(404).send('Not found');
  const start = (num - 1) * 1000 + 1;
  const end = Math.min(num * 1000, TOTAL_JOBS);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (let i = start; i <= end; i++) {
    xml += `\n<url><loc>https://rightwing-production.up.railway.app/jobb/${i}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
  }
  xml += `\n</urlset>`;
  res.type('application/xml').send(xml);
});

// ── SITEMAP HTML PAGE ─────────────────────────────────────────────────────────
app.get('/sitemap', (req, res) => {
  const body = `
<div class="container">
  <h1 style="margin-bottom:1rem">Sitemap — JOBBBAST.se</h1>
  <div class="info-box">📌 100 000 individuella jobbsidor + XML-sitemaps för alla sökmotorer</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1rem">
    <div class="job-card">
      <div class="card-title">Huvudsidor</div>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;font-size:.88rem">
        <a href="/" style="color:#1a6b8a">🏠 Hem</a>
        <a href="/jobb" style="color:#1a6b8a">📋 Alla jobb (100 000)</a>
        <a href="/jobb?type=remote" style="color:#1a6b8a">🌐 Distansjobb (50 000)</a>
        <a href="/jobb?type=onsite" style="color:#1a6b8a">🏢 På-plats-jobb (50 000)</a>
      </div>
    </div>
    <div class="job-card">
      <div class="card-title">XML Sitemaps</div>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;font-size:.88rem">
        <a href="/sitemap.xml" style="color:#1a6b8a">📄 Sitemap Index</a>
        <a href="/sitemap-1.xml" style="color:#1a6b8a">📄 Sitemap 1 (Jobb 1–1 000)</a>
        <a href="/sitemap-2.xml" style="color:#1a6b8a">📄 Sitemap 2 (Jobb 1 001–2 000)</a>
        <span style="color:#888">… 100 sitemap-filer totalt</span>
      </div>
    </div>
    <div class="job-card">
      <div class="card-title">Jobbsidor (intervall)</div>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;font-size:.88rem">
        <a href="/jobb/1" style="color:#1a6b8a">Jobb #1 (Första distansjobbet)</a>
        <a href="/jobb/50000" style="color:#1a6b8a">Jobb #50 000 (Sista distansjobbet)</a>
        <a href="/jobb/50001" style="color:#1a6b8a">Jobb #50 001 (Första på-plats-jobbet)</a>
        <a href="/jobb/100000" style="color:#1a6b8a">Jobb #100 000 (Sista på-plats-jobbet)</a>
      </div>
    </div>
  </div>
</div>`;

  res.send(renderHTML({
    title: 'Sitemap | JOBBBAST.se',
    meta: 'Komplett sitemap för JOBBBAST.se med 100 000 jobbannonser i Sverige.',
    bodyContent: body,
    schema: null
  }));
});

// ── ROBOTS.TXT ────────────────────────────────────────────────────────────────
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: https://rightwing-production.up.railway.app/sitemap.xml
Disallow: /api/`);
});

// ── API ─────────────────────────────────────────────────────────────────────
app.get('/api/jobb/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || id < 1 || id > TOTAL_JOBS) return res.status(404).json({ error: 'Jobb ej hittat' });
  const job = getJobData(id);
  res.json({ job, schema: getJobSchema(job) });
});

app.get('/api/jobb', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const start = (page - 1) * limit + 1;
  const jobs = [];
  for (let i = start; i < start + limit && i <= TOTAL_JOBS; i++) {
    jobs.push(getJobData(i));
  }
  res.json({ page, limit, total: TOTAL_JOBS, jobs });
});

app.listen(PORT, () => {
  console.log(`🇸🇪 JOBBBAST.se körs på port ${PORT}`);
  console.log(`📋 ${TOTAL_JOBS.toLocaleString()} jobbsidor redo`);
  console.log(`🏢 ${companies.length} företag anställer i Sverige`);
  console.log(`📍 ${swedishLocations.length} platser över hela Sverige`);
});
