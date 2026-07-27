# 🇸🇪 SWEDENJOBS.se — 100,000 Jobs Portal | Sweden

## Domain
**https://rightwingsweden.up.railway.app**

## Features
- ✅ 100,000 unique job pages (`/jobs/1` → `/jobs/100000`)
- ✅ JSON-LD JobPosting schema on every job page
- ✅ 50% Remote jobs, 50% On-site jobs across all 21 counties
- ✅ XML Sitemaps (100 sitemap files) with full domain
- ✅ robots.txt
- ✅ Pagination (20 jobs/page)
- ✅ Apply Now button
- ✅ REST API
- ✅ Zero database — all data generated deterministically
- ✅ Gzip compression — fast on Railway free tier

## Sitemap Structure
- **Sitemap Index:** `https://rightwingsweden.up.railway.app/sitemap.xml`
- **100 Sitemap Files:** `/sitemap-1.xml` through `/sitemap-100.xml`
- **Total URLs:** 100,000 job pages

## Deploy to Railway
1. Push to GitHub or upload zip
2. Go to [railway.app](https://railway.app)
3. Click **New Project** → **Deploy from GitHub repo** or **Deploy from zip**
4. Railway auto-detects Node.js and deploys!

## Local Development
```bash
npm install
npm start
# Open http://localhost:3000
