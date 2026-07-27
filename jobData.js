// Job data generator - deterministically generates 100,000 jobs for Sweden
const TOTAL_JOBS = 100000;

const jobTitles = [
  "Mjukvaruingenjör", "Frontend-utvecklare", "Backend-utvecklare", "Full Stack-utvecklare",
  "Dataanalytiker", "Data Scientist", "Maskininlärningsingenjör", "DevOps-ingenjör",
  "Cloud-arkitekt", "Mobilutvecklare", "Android-utvecklare", "iOS-utvecklare",
  "Produktchef", "Projektledare", "Scrum Master", "Verksamhetsanalytiker",
  "UX/UI-designer", "Grafisk designer", "Varumärkesdesigner", "Webbdesigner",
  "Marknadschef", "Digital marknadsförare", "SEO-specialist", "Content-skrivare",
  "Copywriter", "Social Media-chef", "Communities-chef", "Growth Hacker",
  "Försäljningschef", "Kontorschef", "Affärsutvecklingschef", "Säljare",
  "Finansanalytiker", "Redovisningsekonom", "Finanschef", "Revisor",
  "HR-chef", "HR-generalist", "Rekryterare", "Talent Acquisition-specialist",
  "Verksamhetschef", "Supply Chain-chef", "Logistikkoordinator", "Inköpsansvarig",
  "Customer Success-chef", "Kundsupport", "Teknisk supportingenjör",
  "Nätverksingenjör", "Cybersäkerhetsanalytiker", "Informationssäkerhetschef",
  "Databasadministratör", "Systemadministratör", "IT-chef", "CTO",
  "Juridisk rådgivare", "Compliance-officer", "Riskchef", "Avtalschef",
  "Vårdadministratör", "Klinisk forskningsassistent", "Apotekare", "Sjuksköterska",
  "Lärare", "Utbildningskonsult", "Instruktionsdesigner", "Utbildningschef",
  "Civilingenjör", "Maskiningenjör", "Elkraftingenjör", "Byggnadsingenjör",
  "Arkitekt", "Stadsplanerare", "Miljökonsult", "Säkerhetsansvarig",
  "Fastighetsmäklare", "Fastighetsförvaltare", "Facilitetschef", "Byggchef",
  "Forskningsanalytiker", "Policyanalytiker", "Kommunikationschef", "PR-ansvarig",
  "Personlig assistent", "Administrativ chef", "Kontorschef", "Receptionist",
  "Videoredigerare", "Motion Graphic-designer", "Content-strateg", "Varumärkeschef",
  "Partnerskapschef", "Customer Experience-chef", "Dataingenjör", "BI-utvecklare",
  "Scrum Master", "Agile Coach", "Release Manager", "Site Reliability Engineer",
  "Penetrationstestare", "Cloud-ingenjör", "Plattformsingenjör", "API-utvecklare",
  "Hotellchef", "Restaurangchef", "Kock", "Sommelier", "Eventchef",
  "Flygingenjör", "Pilot", "Flygvärdinna", "Flygplatschef"
];

// Swedish companies (including global with Swedish presence)
const companies = [
  // Swedish companies
  "Volvo Group", "Volvo Cars", "Scania", "Ericsson", "Spotify", "Klarna",
  "IKEA", "H&M", "Electrolux", "Skype (Microsoft)", "King (Activision Blizzard)",
  "Mojang Studios", "Massive Entertainment", "Fatshark", "Starbreeze Studios",
  "Swedbank", "SEB", "Handelsbanken", "Nordea", "Skandia", "Folksam",
  "Atlas Copco", "Sandvik", "SKF", "AB Volvo", "SSAB", "Boliden",
  "Telia Company", "Tele2", "Telenor Sverige", "Tre (Hutchison)",
  "Lundin Energy", "Vattenfall", "Fortum", "E.ON Sverige",
  "AstraZeneca", "Fresenius Kabi", "Getinge", "Elekta", "Orexo",
  "Holmen", "SCA", "Stora Enso", "Södra", "Billerud",
  "Skanska", "Peab", "NCC", "JM", "Veidekke",
  "SAS (Scandinavian Airlines)", "Braathens Regional Airlines", "Norwegian Air Sverige",
  "Wallenius", "Stena Line", "DFDS", "Viking Line",
  "Bonnier", "Schibsted", "Viaplay Group", "SVT", "TV4",
  "Axel Johnson", "ICA Gruppen", "Axfood", "Coop Sverige",
  "IKEA", "Elgiganten", "Clas Ohlson", "Biltema", "Jula",
  "H&M", "Lindex", "Åhléns", "Gina Tricot", "NA-KD.com",
  
  // Global with Swedish presence
  "Google", "Amazon", "Microsoft", "Apple", "Meta", "Tesla", "Netflix",
  "IBM", "Oracle", "Cisco", "Dell", "HP", "SAP", "Salesforce",
  "Accenture", "Deloitte", "PwC", "KPMG", "EY", "McKinsey", "BCG",
  "HSBC", "Citi", "Goldman Sachs", "JPMorgan Chase",
  "Unilever", "P&G", "Nestlé", "Coca-Cola", "PepsiCo",
  "Shell", "BP", "TotalEnergies", "ExxonMobil",
  "Siemens", "GE", "Schneider Electric", "ABB", "Honeywell",
  "Boeing", "Airbus", "Rolls-Royce",
  "Pfizer", "Novartis", "Roche", "GSK", "Johnson & Johnson",
  "Samsung", "LG", "Sony", "Panasonic",
  "Toyota", "Honda", "Nissan", "BMW", "Mercedes-Benz",
  "LVMH", "Kering", "Chanel", "Gucci",
  "Swedish Match", "Absolut Vodka", "Electrolux", "Securitas"
];

const swedishLocations = [
  // Stockholm region
  "Stockholm, Stockholms län", "Solna, Stockholms län", "Sundbyberg, Stockholms län",
  "Huddinge, Stockholms län", "Södertälje, Stockholms län", "Nacka, Stockholms län",
  "Täby, Stockholms län", "Danderyd, Stockholms län", "Sollentuna, Stockholms län",
  "Tyresö, Stockholms län", "Upplands Väsby, Stockholms län", "Järfälla, Stockholms län",
  "Vallentuna, Stockholms län", "Österåker, Stockholms län", "Vaxholm, Stockholms län",
  "Norrtälje, Stockholms län", "Nykvarn, Stockholms län",
  
  // Gothenburg region
  "Göteborg, Västra Götalands län", "Mölndal, Västra Götalands län",
  "Partille, Västra Götalands län", "Kungsbacka, Västra Götalands län",
  "Kungälv, Västra Götalands län", "Uddevalla, Västra Götalands län",
  "Trollhättan, Västra Götalands län", "Borås, Västra Götalands län",
  "Skövde, Västra Götalands län", "Lidköping, Västra Götalands län",
  
  // Skåne region
  "Malmö, Skåne län", "Helsingborg, Skåne län", "Lund, Skåne län",
  "Landskrona, Skåne län", "Trelleborg, Skåne län", "Kristianstad, Skåne län",
  "Ängelholm, Skåne län", "Ystad, Skåne län", "Hässleholm, Skåne län",
  "Eslöv, Skåne län", "Staffanstorp, Skåne län",
  
  // Östergötland
  "Linköping, Östergötlands län", "Norrköping, Östergötlands län",
  "Motala, Östergötlands län", "Finspång, Östergötlands län",
  
  // Jönköping
  "Jönköping, Jönköpings län", "Värnamo, Jönköpings län", "Nässjö, Jönköpings län",
  "Gislaved, Jönköpings län", "Vetlanda, Jönköpings län",
  
  // Dalarna
  "Falun, Dalarnas län", "Borlänge, Dalarnas län", "Ludvika, Dalarnas län",
  "Mora, Dalarnas län", "Avesta, Dalarnas län",
  
  // Gävleborg
  "Gävle, Gävleborgs län", "Sandviken, Gävleborgs län", "Hudiksvall, Gävleborgs län",
  
  // Norrbotten
  "Luleå, Norrbottens län", "Boden, Norrbottens län", "Piteå, Norrbottens län",
  "Kiruna, Norrbottens län", "Gällivare, Norrbottens län",
  
  // Västerbotten
  "Umeå, Västerbottens län", "Skellefteå, Västerbottens län", "Lycksele, Västerbottens län",
  
  // Västernorrland
  "Sundsvall, Västernorrlands län", "Härnösand, Västernorrlands län",
  "Örnsköldsvik, Västernorrlands län",
  
  // Örebro
  "Örebro, Örebro län", "Karlskoga, Örebro län", "Kumla, Örebro län",
  
  // Uppsala
  "Uppsala, Uppsala län", "Enköping, Uppsala län", "Knivsta, Uppsala län",
  
  // Västmanland
  "Västerås, Västmanlands län", "Sala, Västmanlands län", "Köping, Västmanlands län",
  
  // Södermanland
  "Nyköping, Södermanlands län", "Eskilstuna, Södermanlands län",
  "Trosa, Södermanlands län", "Katrineholm, Södermanlands län",
  
  // Blekinge
  "Karlskrona, Blekinge län", "Karlshamn, Blekinge län", "Ronneby, Blekinge län",
  
  // Gotland
  "Visby, Gotlands län",
  
  // Halland
  "Halmstad, Hallands län", "Varberg, Hallands län", "Falkenberg, Hallands län",
  
  // Kalmar
  "Kalmar, Kalmar län", "Västervik, Kalmar län", "Oskarshamn, Kalmar län",
  
  // Kronoberg
  "Växjö, Kronobergs län", "Ljungby, Kronobergs län", "Växjö, Kronobergs län",
  
  // Jämtland
  "Östersund, Jämtlands län", "Strömsund, Jämtlands län",
  
  // Remote
  "Distans — Sverige", "Distans — Stockholm, Sverige"
];

const salaryRanges = [
  { display: "25 000 – 30 000 kr/månad", min: 25000, max: 30000 },
  { display: "30 000 – 35 000 kr/månad", min: 30000, max: 35000 },
  { display: "35 000 – 42 000 kr/månad", min: 35000, max: 42000 },
  { display: "42 000 – 50 000 kr/månad", min: 42000, max: 50000 },
  { display: "50 000 – 60 000 kr/månad", min: 50000, max: 60000 },
  { display: "60 000 – 75 000 kr/månad", min: 60000, max: 75000 },
  { display: "75 000 – 90 000 kr/månad", min: 75000, max: 90000 },
  { display: "90 000 – 110 000 kr/månad", min: 90000, max: 110000 },
  { display: "110 000+ kr/månad", min: 110000, max: 150000 },
  { display: "20 000 – 25 000 kr/månad", min: 20000, max: 25000 },
  { display: "15 000 – 20 000 kr/månad", min: 15000, max: 20000 }
];

const jobTypes = ["FULL_TIME", "CONTRACTOR", "PART_TIME", "INTERN", "TEMPORARY"];
const jobTypeDisplay = { 
  "FULL_TIME": "Heltid", 
  "CONTRACTOR": "Konsult", 
  "PART_TIME": "Deltid", 
  "INTERN": "Praktik", 
  "TEMPORARY": "Tillsvidare" 
};

const experienceLevels = [
  { display: "Nyexaminerad", schema: "no requirements" },
  { display: "1–3 års erfarenhet", schema: "1 year experience" },
  { display: "3–5 års erfarenhet", schema: "3 years experience" },
  { display: "5–7 års erfarenhet", schema: "5 years experience" },
  { display: "7–10 års erfarenhet", schema: "7 years experience" },
  { display: "10+ års erfarenhet", schema: "10 years experience" },
  { display: "Senior", schema: "5 years experience" },
  { display: "Lead", schema: "7 years experience" },
  { display: "Manager", schema: "5 years experience" },
  { display: "Director", schema: "8 years experience" },
  { display: "Executive", schema: "10 years experience" }
];

const industries = [
  "Teknik", "Fintech", "E-handel", "Bank & Finans", "Olja & Gas",
  "Fastigheter", "Hälsovård", "Utbildning", "Konsulting", "Flyg",
  "Bygg", "Logistik & Sjöfart", "Hotell & Restaurang", "Detaljhandel", "Media & Underhållning",
  "Förnybar Energi", "Fordonsindustri", "Telekommunikation", "Juridik", "Offentlig sektor",
  "Läkemedel", "Skog & Papper", "Stål & Metall", "Gruvindustri", "Försvar"
];

const jobDescriptions = [
  (title, company, isRemote, location) => `Vi söker en erfaren ${title} till teamet på ${company} i Sverige. ${isRemote ? "Detta är en helt distansroll öppen för kvalificerade kandidater i hela Sverige." : `Denna roll är baserad i ${location}.`}

Du kommer att ansvara för att leverera högkvalitativt arbete som driver affärsresultat och bidrar till ${company}:s verksamhet i Sverige och Norden.

Arbetsuppgifter:
• Leda och utföra kärnfunktioner inom ${title.toLowerCase()}
• Samarbeta med tvärfunktionella team för att nå strategiska mål
• Analysera data och ge handlingsbara insikter för att förbättra prestanda
• Mentorskap för juniora teammedlemmar och kunskapsdelning
• Säkerställa att bästa praxis följs i alla leveranser

Krav:
• 3–5 års erfarenhet i en liknande ${title.toLowerCase()}-roll
• Stark kommunikation och problemlösning
• Erfarenhet av att arbeta i en snabb global teknisk miljö
• Högskoleexamen i relevant område
• Goda kunskaper i moderna verktyg och plattformar

Vi erbjuder:
• Konkurrenskraftig lön i SEK
• Förmåner enligt kollektivavtal
• 30 dagars semester
• Distansarbetsersättning
• Årlig prestationsbonus
• Friskvårdsbidrag
• Möjlighet till tjänstepension`,

  (title, company, isRemote, location) => `${company} söker nu en ${title}! Vi är ett ledande företag i Sverige som letar efter erfarna medarbetare för att stärka vår verksamhet i Norden.

${isRemote ? "Denna distansbaserade roll gör det möjligt för dig att arbeta var som helst i Sverige med flexibla arbetstider." : `Du kommer att arbeta från vårt ${location}-kontor med ett dynamiskt team.`}

Om rollen:
Som ${title} hos ${company} kommer du att spela en nyckelroll i att utveckla våra produkter och tjänster. Du arbetar nära ledningen och kollegor för att genomföra vår mission i en av världens snabbast växande ekonomier.

Vad du kommer att göra:
• Driva viktiga ${title.toLowerCase()}-initiativ från planering till genomförande
• Bygga och underhålla relationer med viktiga intressenter
• Rapportera KPI:er och bidra till strategisk planering
• Håll dig uppdaterad om branschtrender globalt och i Sverige
• Representera ${company} med professionalism och integritet

Vad du bidrar med:
• 2–6 års bevisad erfarenhet som ${title.toLowerCase()}
• Stark analytisk och kommunikativ förmåga
• Lagspelare med ett utvecklingsorienterat tänkande
• Relevant examen eller certifiering meriterande

Erbjudande:
• Konkurrenskraftig lön • Förmåner • Hälsovårdsförsäkring • 30 dagars semester • Utbildningsbidrag`,

  (title, company, isRemote, location) => `Bli en del av ${company} som ${title} och var med i ett av Sveriges mest spännande företag!

${isRemote ? "🌐 Distans | Arbeta var som helst i Sverige" : `📍 ${location}`}

Vi bygger framtidens verksamhet i Norden och behöver exceptionell talang som dig. Detta är en sällsynt möjlighet att arbeta med ett världsklassföretag samtidigt som du njuter av den svenska livsstilen.

Möjligheten:
Du kommer att ta rollen som ${title} i en kritisk tillväxtfas. Ditt arbete kommer direkt att påverka miljontals kunder i regionen.

Dagliga arbetsuppgifter:
• Genomföra och förbättra arbetsflöden inom ${title.toLowerCase()}
• Samarbeta med produkt-, teknik- och affärsteam
• Följa upp mätvärden och optimera prestanda
• Bidra till en kultur av excellens och innovation
• Stödja ledningen med rapportering och strategi

Din profil:
• 3+ års erfarenhet inom ${title.toLowerCase()} eller relaterat område
• Bekväm i en snabb global affärsmiljö
• Goda sociala färdigheter och professionell arbetsmoral
• Examen inom relevant disciplin (Master är meriterande)

Förmåner hos ${company}:
Konkurrenskraftig lön | Friskvårdsbidrag | Pension | 30 dagars semester | Prestationsbonus | Utbildningsbudget`
];

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function getJobData(id) {
  const seed = id * 7919;
  const r = (offset = 0) => seededRandom(seed + offset);

  const isRemote = id <= TOTAL_JOBS / 2;

  const companyIndex = Math.floor((id - 1) / Math.ceil(TOTAL_JOBS / companies.length)) % companies.length;

  const titleIndex   = Math.floor(r(1) * jobTitles.length);
  const locationIndex= Math.floor(r(3) * swedishLocations.length);
  const salaryIndex  = Math.floor(r(4) * salaryRanges.length);
  const jobTypeIndex = Math.floor(r(5) * jobTypes.length);
  const expIndex     = Math.floor(r(6) * experienceLevels.length);
  const industryIndex= Math.floor(r(7) * industries.length);
  const descIndex    = Math.floor(r(8) * jobDescriptions.length);

  const title    = jobTitles[titleIndex];
  const company  = companies[companyIndex];
  const location = isRemote ? "Distans — Sverige" : swedishLocations[locationIndex];
  const salary   = salaryRanges[salaryIndex];
  const jobType  = jobTypes[jobTypeIndex];
  const exp      = experienceLevels[expIndex];
  const industry = industries[industryIndex];
  const description = jobDescriptions[descIndex](title, company, isRemote, swedishLocations[locationIndex]);

  const daysAgo = Math.floor(r(9) * 60);
  const postedDate = new Date();
  postedDate.setDate(postedDate.getDate() - daysAgo);
  const validThrough = new Date(postedDate);
  validThrough.setDate(validThrough.getDate() + 90);

  return {
    id,
    title,
    company,
    location,
    salary: salary.display,
    salaryMin: salary.min,
    salaryMax: salary.max,
    jobType,
    jobTypeDisplay: jobTypeDisplay[jobType],
    experience: exp.display,
    experienceSchema: exp.schema,
    industry,
    isRemote,
    description,
    postedDate: postedDate.toISOString().split('T')[0],
    validThrough: validThrough.toISOString().split('T')[0],
    slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id}`
  };
}

function getJobSchema(job) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": job.company,
      "value": `JOB-SE-${String(job.id).padStart(6, '0')}`
    },
    "datePosted": job.postedDate,
    "validThrough": `${job.validThrough}T00:00:00Z`,
    "employmentType": job.jobType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "sameAs": `https://www.google.com/search?q=${encodeURIComponent(job.company)}`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.isRemote ? "Stockholm" : job.location.split(',')[0],
        "addressCountry": "SE"
      }
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "Sweden"
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "SEK",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salaryMin,
        "maxValue": job.salaryMax,
        "unitText": "MONTH"
      }
    },
    "experienceRequirements": {
      "@type": "OccupationalExperienceRequirements",
      "monthsOfExperience": job.experienceSchema === "no requirements" ? 0
        : parseInt(job.experienceSchema) * 12
    },
    "industry": job.industry,
    "url": `/jobb/${job.id}`,
    "directApply": true
  };

  if (job.isRemote) {
    schema.jobLocationType = "TELECOMMUTE";
  }

  return schema;
}

module.exports = { getJobData, getJobSchema, TOTAL_JOBS, jobTitles, companies, swedishLocations, industries };
