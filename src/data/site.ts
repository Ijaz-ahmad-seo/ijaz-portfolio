// Central data file — all real content for the portfolio site

export const siteConfig = {
  name: 'Ijaz Ahmed',
  title: 'Ijaz Ahmed — SEO Expert & Digital Growth Strategist',
  description:
    'SEO Manager at Trickle Up with 4+ years of experience. Scaled Mydecorya.com to 500K+ monthly organic visits. Expert in Technical SEO, Local SEO, AEO, GEO & AI Optimization.',
  url: 'https://ijazahmed.com',
  email: 'seowithejoo@gmail.com',
  phone: '+92-330-5929561',
  tagline: 'SEO expert who builds the websites he ranks.',
  currentRole: 'SEO Manager',
  currentCompany: 'Trickle Up',
  yearsExperience: '4+',
  location: 'Pakistan',
}

export const stats = [
  { value: '500K+', label: 'Monthly Organic Visits', note: 'Mydecorya.com' },
  { value: '4+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Delivered' },
]

export interface ServiceEntry {
  id: string
  title: string
  subtitle?: string
  description: string
  tagline: string
  longDescription: string
  offerings: string[]
  iconType: string
}

export const services: ServiceEntry[] = [
  {
    id: 'on-page-seo',
    title: 'On-Page SEO',
    description:
      'Strategic optimization of content, meta tags, headings, and internal linking to maximize search visibility and relevance.',
    tagline: 'Every page pulling its full weight.',
    longDescription:
      'I optimize the elements search engines read first: titles, headings, content structure, meta descriptions, and internal linking. Each page gets tuned to match the exact intent of your target audience, turning organic traffic into qualified leads.',
    offerings: [
      'Keyword mapping and intent matching',
      'Title tag and meta description writing',
      'Heading hierarchy and content structuring',
      'Internal linking strategy',
      'Image optimization and page experience',
    ],
    iconType: 'lens',
  },
  {
    id: 'off-page-seo',
    title: 'Off-Page SEO',
    description:
      'Authority building through high-quality backlink acquisition, digital PR, and strategic brand mention campaigns.',
    tagline: 'Build the authority Google cannot ignore.',
    longDescription:
      'Rankings follow trust, and trust is built off-page. Through strategic outreach, digital PR, and targeted link acquisition, I help your site earn the signals that move it up the rankings and keep it there long-term.',
    offerings: [
      'Manual outreach link building',
      'Broken link and resource page targeting',
      'Digital PR and brand mention campaigns',
      'Competitor backlink gap analysis',
      'Guest post strategy and placement',
    ],
    iconType: 'globe',
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    description:
      'Dominate local search with optimized Google Business Profiles, local citations, and geo-targeted content strategies.',
    tagline: 'Dominate your city before your competitors do.',
    longDescription:
      'I get local businesses to the top of Google Maps and local search results. From Google Business Profile optimization to citation building and review strategy, every signal tells Google you are the authority in your area.',
    offerings: [
      'Google Business Profile setup and optimization',
      'Local citation building and cleanup',
      'Geo-targeted content creation',
      'Review strategy and reputation management',
      'Local schema markup',
    ],
    iconType: 'pin',
  },
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    description:
      'Deep-dive audits and fixes for crawlability, Core Web Vitals, site speed, schema markup, and indexation issues.',
    tagline: 'If Google cannot crawl it, it does not exist.',
    longDescription:
      'Most SEO problems start in the code. I run deep technical audits covering crawlability, Core Web Vitals, rendering, schema markup, and indexation to remove the hidden barriers that are holding your rankings back.',
    offerings: [
      'Core Web Vitals and page speed optimization',
      'Crawlability and indexing audits',
      'Schema markup and structured data',
      'Site architecture and URL structure',
      'Log file analysis and render debugging',
    ],
    iconType: 'gear',
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing',
    description:
      'Data-driven content strategies that attract, engage, and convert your target audience at scale.',
    tagline: 'Content that ranks, reads well, and compounds.',
    longDescription:
      'Scaling Mydecorya from zero to 500K monthly visits was built on a content system, not luck. I create strategies grounded in topical authority, search intent, and long-form content that grows its traffic value over time.',
    offerings: [
      'Topical authority mapping',
      'Search-intent-driven content briefs',
      'Long-form pillar content creation',
      'Content audits and strategic consolidation',
      'Content calendar development',
    ],
    iconType: 'document',
  },
  {
    id: 'aeo',
    title: 'AEO',
    subtitle: 'Answer Engine Optimization',
    description:
      'Optimizing content to appear in featured snippets, People Also Ask, and voice search results.',
    tagline: 'Win the answer, not just the ranking.',
    longDescription:
      'Featured snippets, People Also Ask boxes, and voice search results go to whoever answers best. I restructure your content to claim those positions and become the default answer in your niche.',
    offerings: [
      'Featured snippet targeting and formatting',
      'FAQ and People Also Ask optimization',
      'Voice search optimization',
      'Structured markup for direct answers',
      'Question-based content creation',
    ],
    iconType: 'bubble',
  },
  {
    id: 'geo',
    title: 'GEO',
    subtitle: 'Generative Engine Optimization',
    description:
      'Future-proofing your brand presence in AI-generated search results and LLM-powered answer engines.',
    tagline: 'Be the source AI models cite.',
    longDescription:
      'When ChatGPT, Perplexity, and Google AI Overviews answer a question, they pull from trusted sources. I position your brand as one of those sources through content authority, citation signals, and entity optimization.',
    offerings: [
      'AI citation and sourcing optimization',
      'Entity-based content strategy',
      'Brand mention and co-citation building',
      'Structured data for LLM readability',
      'Perplexity and AI Overview targeting',
    ],
    iconType: 'robot',
  },
  {
    id: 'aio',
    title: 'AIO',
    subtitle: 'AI Optimization',
    description:
      'Leveraging AI tools and workflows to accelerate SEO outcomes, automate analysis, and scale content production.',
    tagline: 'AI as a multiplier, not a shortcut.',
    longDescription:
      'AI tools done right dramatically speed up research, content production, and analysis without sacrificing quality. I integrate AI strategically into your SEO workflow so you get more output at the same standard.',
    offerings: [
      'AI-assisted content workflow setup',
      'Automated rank tracking and reporting',
      'Programmatic SEO strategy',
      'AI-powered keyword clustering',
      'SEO workflow automation and tooling',
    ],
    iconType: 'neural',
  },
  {
    id: 'wordpress-development',
    title: 'WordPress Development',
    description:
      'Fast, SEO-optimized WordPress websites built from the ground up with performance and search rankings in mind.',
    tagline: 'Websites built to rank from day one.',
    longDescription:
      'I build fast, clean WordPress sites with SEO baked in from the start. No bloated page builders, no lazy shortcuts. Just well-structured code that loads fast, ranks well, and converts visitors into clients.',
    offerings: [
      'Custom WordPress builds from scratch',
      'Core Web Vitals optimization',
      'On-page SEO pre-configuration',
      'WooCommerce and e-commerce setups',
      'Performance audits and speed optimization',
    ],
    iconType: 'code',
  },
]

export interface CaseStudy {
  id: string
  name: string
  year: string
  headlineMetric: string
  description: string
  keyWins: string[]
  tags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'mydecorya',
    name: 'MYDECORYA',
    year: '2022 to 2025',
    headlineMetric: '500K+ monthly organic visits scaled from zero',
    description:
      'From 2023 to 2025, I scaled my own SEO project to over 500K monthly organic visits. My work focused on understanding search intent, fixing technical gaps, and building content clusters that actually rank.',
    keyWins: [
      'Researched keywords deeply with focus on real user intent, not just volume',
      'Wrote SEO-focused content aligned with search behavior',
      'Built topical clusters for authority',
      'Fixed technical SEO and Core Web Vitals',
      'Audited and refreshed existing content for higher CTR',
      'Adapted strategy to Google updates',
    ],
    tags: ['Personal Project', 'Content Strategy', 'Technical SEO'],
  },
  {
    id: 'care-pharmacy',
    name: 'THE CARE PHARMACY',
    year: '2025 to 2026',
    headlineMetric: '40% organic traffic increase via AEO strategy',
    description:
      'Drove growth for The Care Pharmacy with advanced Technical SEO and Off-page SEO strategies that improved organic visibility and authority. Worked closely with content and dev teams to optimize crawl efficiency, fix site-wide issues, and strengthen the backlink profile.',
    keyWins: [
      'Comprehensive technical audits (Core Web Vitals, indexability)',
      'Optimized structured data and internal linking',
      'Implemented AEO strategy targeting featured snippets and People Also Ask',
      'Achieved 40% increase in organic traffic',
      'Executed authority outreach and digital PR campaigns',
    ],
    tags: ['AEO', 'Technical SEO', 'Off-page SEO', 'Healthcare'],
  },
  {
    id: 'batley-pharmacy',
    name: 'BATLEY PHARMACY',
    year: '2025 to 2026',
    headlineMetric: 'Healthcare e-commerce SEO and content optimization',
    description:
      'Improved organic visibility and content performance for a UK healthcare e-commerce site through targeted SEO, on-page optimization, and search-intent driven content.',
    keyWins: [
      'Keyword research with Ahrefs, SEMrush, and Google Keyword Planner',
      'Optimized product and category pages for search intent',
      'On-page SEO improvements (titles, meta, headings, internal links)',
      'Content gap analysis via Search Console and competitor research',
      'Sustained local dominance and lead generation',
    ],
    tags: ['E-commerce', 'On-page SEO', 'Healthcare'],
  },
  {
    id: 'exeter-diesels',
    name: 'EXETER DIESELS',
    year: '2026',
    headlineMetric: 'Built a UK used vans website ranking on Google UK',
    description:
      'Designed and developed a professional website for a UK business specializing in used vans. Focused on user-friendly digital presence, inventory showcase, and organic traffic through strategic SEO.',
    keyWins: [
      'Designed a responsive site for desktop and mobile',
      'Implemented full SEO strategy targeting high-intent queries',
      'Optimized meta titles, descriptions, headings, image alt texts',
      'Improved page speed and Core Web Vitals',
      'Built high-quality backlinks and local citations',
      'Measurable growth in organic traffic and lead generation',
    ],
    tags: ['Web Development', 'Local SEO', 'Automotive'],
  },
  {
    id: 'hope-welfare-trust',
    name: 'HOPE WELFARE TRUST',
    year: '2026',
    headlineMetric: 'UK charity SEO with on-page and technical optimization',
    description:
      'Worked on the official site of Hope Welfare Trust, a UK-based charity. Focused on improving digital presence through modern SEO practices, content optimization, and performance enhancements to grow visibility and engagement.',
    keyWins: [
      'On-page SEO including keyword mapping, meta optimization, internal linking',
      'Improved technical SEO (site speed, mobile, crawlability)',
      'Keyword research and competitor analysis',
      'Content optimized for search intent and higher SERP rankings',
      'Performance tracking via Google Analytics and Search Console',
    ],
    tags: ['Non-profit', 'Technical SEO', 'On-page SEO'],
  },
]

export const builtByMe = [
  { name: 'Sahil Pak Networks', url: 'https://sahilpaknetworks.com' },
  { name: 'Ammar Networks', url: 'https://ammarnetworks.com' },
  { name: 'MG Transportation LLC', url: 'https://mgtransportationllc.com' },
  { name: 'Alpha Medi Assist', url: 'https://alphamediassist.com' },
  { name: 'Best Homes and Kitchens', url: 'https://besthomesandkitchens.com' },
  { name: 'New York Timez', url: 'https://newyorktimez.com' },
  { name: 'Mydecorya', url: 'https://mydecorya.com' },
]

export const certifications = [
  {
    id: 'semrush-seo',
    name: 'SEMrush SEO Toolkit Course',
    issuer: 'SEMrush',
    description:
      'Comprehensive SEO certification covering all major aspects of search engine optimization strategy and execution.',
  },
  {
    id: 'semrush-brian-dean',
    name: 'Link Building with Brian Dean',
    issuer: 'SEMrush × Brian Dean',
    description:
      "Advanced link building strategies co-created with one of the world's leading SEO authorities.",
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics Certification',
    issuer: 'Google',
    description:
      'Official Google certification for Analytics data analysis, reporting, and conversion tracking.',
  },
]

export const tools = [
  { name: 'SEMrush', category: 'All-in-One SEO' },
  { name: 'Ahrefs', category: 'Backlink Analysis' },
  { name: 'Screaming Frog', category: 'Technical Audit' },
  { name: 'Moz', category: 'Domain Authority' },
  { name: 'Google Search Console', category: 'Performance Tracking' },
  { name: 'Google Analytics', category: 'Traffic Analysis' },
  { name: 'Google Keyword Planner', category: 'Keyword Research' },
]

export const contact = {
  email: 'seowithejoo@gmail.com',
  phone: '+92-330-5929561',
  linkedin: 'https://linkedin.com/in/ijaz-ahmed-seo',
}
