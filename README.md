# 🇸🇪 JOBBBAST.se — 100,000 Jobb Portal | Sverige

## Features
- ✅ 100,000 unika jobbsidor (`/jobb/1` → `/jobb/100000`)
- ✅ JSON-LD JobPosting-schema på varje jobbsida
- ✅ 50% Distansjobb, 50% På-plats-jobb över hela Sverige
- ✅ XML Sitemaps (100 sitemap-filer)
- ✅ robots.txt
- ✅ Paginering (20 jobb/sida)
- ✅ Ansök nu-knapp
- ✅ REST API
- ✅ Ingen databas — all data genereras deterministiskt
- ✅ Gzip-komprimering — snabbt på Railway free tier

## Deploy till Railway
1. Pusha till GitHub eller ladda upp zip
2. Gå till [railway.app](https://railway.app)
3. Klicka **New Project** → **Deploy from GitHub repo** eller **Deploy from zip**
4. Railway auto-detekterar Node.js och distribuerar!

## Lokal utveckling
```bash
npm install
npm start
# Öppna http://localhost:3000
