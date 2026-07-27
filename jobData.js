// Job data generator - deterministically generates 100,000 jobs for Sweden
const TOTAL_JOBS = 100000;

// DOMAIN for absolute URLs in schema
const DOMAIN = 'https://rightwingsweden.up.railway.app';

const jobTitles = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Data Analyst", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer",
  "Cloud Architect", "Mobile Developer", "Android Developer", "iOS Developer",
  "Product Manager", "Project Manager", "Scrum Master", "Business Analyst",
  "UI/UX Designer", "Graphic Designer", "Brand Designer", "Web Designer",
  "Marketing Manager", "Digital Marketing Specialist", "SEO Specialist", "Content Writer",
  "Copywriter", "Social Media Manager", "Community Manager", "Growth Hacker",
  "Sales Manager", "Account Manager", "Business Development Manager", "Sales Executive",
  "Financial Analyst", "Accountant", "Finance Manager", "Auditor",
  "HR Manager", "HR Generalist", "Recruiter", "Talent Acquisition Specialist",
  "Operations Manager", "Supply Chain Manager", "Logistics Coordinator", "Procurement Officer",
  "Customer Success Manager", "Customer Support Specialist", "Technical Support Engineer",
  "Network Engineer", "Cybersecurity Analyst", "Information Security Officer",
  "Database Administrator", "Systems Administrator", "IT Manager", "CTO",
  "Legal Counsel", "Compliance Officer", "Risk Manager", "Contract Manager",
  "Healthcare Administrator", "Clinical Research Associate", "Pharmacist", "Nurse",
  "Teacher", "Education Consultant", "Instructional Designer", "Training Manager",
  "Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Structural Engineer",
  "Architect", "Urban Planner", "Environmental Consultant", "Safety Officer",
  "Real Estate Agent", "Property Manager", "Facilities Manager", "Construction Manager",
  "Research Analyst", "Policy Analyst", "Communications Manager", "Public Relations Officer",
  "Executive Assistant", "Administrative Officer", "Office Manager", "Receptionist",
  "Video Editor", "Motion Graphics Designer", "Content Strategist", "Brand Manager",
  "Partnerships Manager", "Customer Experience Manager", "Data Engineer", "BI Developer",
  "Scrum Master", "Agile Coach", "Release Manager", "Site Reliability Engineer",
  "Penetration Tester", "Cloud Engineer", "Platform Engineer", "API Developer",
  "Hotel Manager", "Restaurant Manager", "Chef", "Sommelier", "Event Manager",
  "Aviation Engineer", "Pilot", "Flight Attendant", "Airport Manager"
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
  "Swedish Match", "Absolut Vodka", "Electrolux", "Securitas",
  "Stockholm Exergi", "Systembolaget", "PostNord", "SJ",
  
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
  "LVMH", "Kering", "Chanel", "Gucci"
];

const swedishLocations = [
  // Stockholm region
  "Stockholm, Stockholm County", "Solna, Stockholm County", "Sundbyberg, Stockholm County",
  "Huddinge, Stockholm County", "Södertälje, Stockholm County", "Nacka, Stockholm County",
  "Täby, Stockholm County", "Danderyd, Stockholm County", "Sollentuna, Stockholm County",
  "Tyresö, Stockholm County", "Upplands Väsby, Stockholm County", "Järfälla, Stockholm County",
  "Vallentuna, Stockholm County", "Österåker, Stockholm County", "Vaxholm, Stockholm County",
  "Norrtälje, Stockholm County", "Nykvarn, Stockholm County",
  
  // Gothenburg region
  "Gothenburg, Västra Götaland County", "Mölndal, Västra Götaland County",
  "Partille, Västra Götaland County", "Kungsbacka, Västra Götaland County",
  "Kungälv, Västra Götaland County", "Uddevalla, Västra Götaland County",
  "Trollhättan, Västra Götaland County", "Borås, Västra Götaland County",
  "Skövde, Västra Götaland County", "Lidköping, Västra Götaland County",
  
  // Skåne region
  "Malmö, Skåne County", "Helsingborg, Skåne County", "Lund, Skåne County",
  "Landskrona, Skåne County", "Trelleborg, Skåne County", "Kristianstad, Skåne County",
  "Ängelholm, Skåne County", "Ystad, Skåne County", "Hässleholm, Skåne County",
  "Eslöv, Skåne County", "Staffanstorp, Skåne County",
  
  // Östergötland
  "Linköping, Östergötland County", "Norrköping, Östergötland County",
  "Motala, Östergötland County", "Finspång, Östergötland County",
  
  // Jönköping
  "Jönköping, Jönköping County", "Värnamo, Jönköping County", "Nässjö, Jönköping County",
  "Gislaved, Jönköping County", "Vetlanda, Jönköping County",
  
  // Dalarna
  "Falun, Dalarna County", "Borlänge, Dalarna County", "Ludvika, Dalarna County",
  "Mora, Dalarna County", "Avesta, Dalarna County",
  
  // Gävleborg
  "Gävle, Gävleborg County", "Sandviken, Gävleborg County", "Hudiksvall, Gävleborg County",
  
  // Norrbotten
  "Luleå, Norrbotten County", "Boden, Norrbotten County", "Piteå, Norrbotten County",
  "Kiruna, Norrbotten County", "Gällivare, Norrbotten County",
  
  // Västerbotten
  "Umeå, Västerbotten County", "Skellefteå, Västerbotten County", "Lycksele, Västerbotten County",
  
  // Västernorrland
  "Sundsvall, Västernorrland County", "Härnösand, Västernorrland County",
  "Örnsköldsvik, Västernorrland County",
  
  // Örebro
  "Örebro, Örebro County", "Karlskoga, Örebro County", "Kumla, Örebro County",
  
  // Uppsala
  "Uppsala, Uppsala County", "Enköping, Uppsala County", "Knivsta, Uppsala County",
  
  // Västmanland
  "Västerås, Västmanland County", "Sala, Västmanland County", "Köping, Västmanland County",
  
  // Södermanland
  "Nyköping, Södermanland County", "Eskilstuna, Södermanland County",
  "Trosa, Södermanland County", "Katrineholm, Södermanland County",
  
  // Blekinge
  "Karlskrona, Blekinge County", "Karlshamn, Blekinge County", "Ronneby, Blekinge County",
  
  // Gotland
  "Visby, Gotland County",
  
  // Halland
  "Halmstad, Halland County", "Varberg, Halland County", "Falkenberg, Halland County",
  
  // Kalmar
  "Kalmar, Kalmar County", "Västervik, Kalmar County", "Oskarshamn, Kalmar County",
  
  // Kronoberg
  "Växjö, Kronoberg County", "Ljungby, Kronoberg County",
  
  // Jämtland
  "Östersund, Jämtland County", "Strömsund, Jämtland County",
  
  // Remote
  "Remote — Sweden", "Remote — Stockholm, Sweden"
];

const salaryRanges = [
  { display: "SEK 25,000 – 30,000/month", min: 25000, max: 30000 },
  { display: "SEK 30,000 – 35,000/month", min: 30000, max: 35000 },
  { display: "SEK 35,000 – 42,000/month", min: 35000, max: 42000 },
  { display: "SEK 42,000 – 50,000/month", min: 42000, max: 50000 },
  { display: "SEK 50,000 – 60,000/month", min: 50000, max: 60000 },
  { display: "SEK 60,000 – 75,000/month", min: 60000, max: 75000 },
  { display: "SEK 75,000 – 90,000/month", min: 75000, max: 90000 },
  { display: "SEK 90,000 – 110,000/month", min: 90000, max: 110000 },
  { display: "SEK 110,000+/month", min: 110000, max: 150000 },
  { display: "SEK 20,000 – 25,000/month", min: 20000, max: 25000 },
  { display: "SEK 15,000 – 20,000/month", min: 15000, max: 20000 }
];

const jobTypes = ["FULL_TIME", "CONTRACTOR", "PART_TIME", "INTERN", "TEMPORARY"];
const jobTypeDisplay = { 
  "FULL_TIME": "Full-time", 
  "CONTRACTOR": "Contract", 
  "PART_TIME": "Part-time", 
  "INTERN": "Internship", 
  "TEMPORARY": "Temporary" 
};

const experienceLevels = [
  { display: "Entry Level", schema: "no requirements" },
  { display: "1–3 Years Experience", schema: "1 year experience" },
  { display: "3–5 Years Experience", schema: "3 years experience" },
  { display: "5–7 Years Experience", schema: "5 years experience" },
  { display: "7–10 Years Experience", schema: "7 years experience" },
  { display: "10+ Years Experience", schema: "10 years experience" },
  { display: "Senior", schema: "5 years experience" },
  { display: "Lead", schema: "7 years experience" },
  { display: "Manager", schema: "5 years experience" },
  { display: "Director", schema: "8 years experience" },
  { display: "Executive", schema: "10 years experience" }
];

const industries = [
  "Technology", "Fintech", "E-commerce", "Banking & Finance", "Oil & Gas",
  "Real Estate", "Healthcare", "Education", "Consulting", "Aviation",
  "Construction", "Logistics & Shipping", "Hospitality", "Retail", "Media & Entertainment",
  "Renewable Energy", "Automotive", "Telecommunications", "Legal", "Public Sector",
  "Pharmaceuticals", "Forestry & Paper", "Steel & Metal", "Mining", "Defense"
];

const jobDescriptions = [
  (title, company, isRemote, location) => `We are seeking an experienced ${title} to join the team at ${company} in Sweden. ${isRemote ? "This is a fully remote role open to qualified candidates across Sweden." : `This role is based in ${location}.`}

You will be responsible for delivering high-quality work that drives business outcomes and contributes to ${company}'s growing operations in Sweden and the Nordic region.

Key Responsibilities:
• Lead and execute core ${title.toLowerCase()} functions across the organization
• Collaborate with cross-functional teams to deliver on strategic objectives
• Analyze data and provide actionable insights to improve performance
• Mentor junior team members and contribute to knowledge sharing
• Ensure best practices are followed in all deliverables

Requirements:
• 3–5 years of experience in a similar ${title.toLowerCase()} role
• Strong communication and problem-solving skills
• Experience working in fast-paced global tech/business environment
• Bachelor's degree in a relevant field
• Proficiency with modern tools and platforms

What We Offer:
• Competitive salary in SEK
• Collective agreement benefits
• 30 days annual leave
• Remote work allowance
• Annual performance bonus
• Wellness allowance (friskvårdsbidrag)
• Occupational pension (tjänstepension)`,

  (title, company, isRemote, location) => `${company} is hiring a ${title}! We are a leading company in Sweden looking for experienced professionals to scale our impact across the Nordics.

${isRemote ? "This remote-first position allows you to work from anywhere in Sweden with flexible hours." : `You will work from our ${location} office with a dynamic, ambitious team.`}

About the Role:
As a ${title} at ${company}, you will play a key role in shaping our products and services. You'll work closely with leadership and peers to execute on our mission in one of the world's most innovative economies.

What You'll Do:
• Drive key ${title.toLowerCase()} initiatives from planning to execution
• Build and maintain relationships with key stakeholders
• Report on KPIs and contribute to strategic planning
• Stay updated on industry trends globally and in Sweden
• Represent ${company} with professionalism and integrity

What You Bring:
• 2–6 years proven experience as a ${title.toLowerCase()}
• Strong analytical and communication skills
• Team player with a growth mindset
• Relevant degree or certification preferred

Compensation & Benefits:
• Competitive SEK salary • Benefits package • Health insurance • 30 days annual leave • Education allowance`,

  (title, company, isRemote, location) => `Join ${company} as a ${title} and be part of one of Sweden's most exciting companies!

${isRemote ? "🌐 Remote | Work from anywhere in Sweden" : `📍 ${location}`}

We're building the future of business in the Nordics and need exceptional talent like you. This is a rare opportunity to work with a world-class brand while enjoying the Swedish lifestyle.

The Opportunity:
You'll be taking on the ${title} role at a critical growth stage. Your work will directly impact millions of customers across the region.

Day-to-Day Responsibilities:
• Execute and improve key workflows within the ${title.toLowerCase()} function
• Collaborate with product, engineering, and business teams
• Track metrics and optimize for performance
• Contribute to a culture of excellence and innovation
• Support senior leadership with reporting and strategy

Your Profile:
• 3+ years in ${title.toLowerCase()} or related field
• Comfortable in a fast-moving global business ecosystem
• Strong interpersonal skills and professional work ethic
• Degree in relevant discipline (Master's is a plus)

Perks at ${company}:
Competitive salary | Wellness allowance | Pension | 30 days leave | Performance bonus | Learning budget`
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
  const location = isRemote ? "Remote — Sweden" : swedishLocations[locationIndex];
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
    "url": `${DOMAIN}/jobs/${job.id}`,
    "directApply": true
  };

  if (job.isRemote) {
    schema.jobLocationType = "TELECOMMUTE";
  }

  return schema;
}

module.exports = { getJobData, getJobSchema, TOTAL_JOBS, jobTitles, companies, swedishLocations, industries };
