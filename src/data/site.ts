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

export const caseStudies = [
  {
    id: 'mydecorya',
    client: 'Mydecorya.com',
    type: 'Personal Project',
    highlight: '0 → 500K+ monthly organic visits',
    description:
      'Built and scaled a home decor content site from zero to 500K+ monthly organic visitors through systematic content marketing and technical SEO.',
    tags: ['Content Marketing', 'Technical SEO', 'On-Page SEO'],
    featured: true,
  },
  {
    id: 'care-pharmacy',
    client: 'The Care Pharmacy',
    type: 'Client',
    highlight: 'Organic growth + local dominance',
    description:
      'Comprehensive SEO strategy for a UK pharmacy improving local and organic search visibility in a competitive healthcare niche.',
    tags: ['Local SEO', 'On-Page SEO', 'Technical SEO'],
    featured: false,
  },
  {
    id: 'batley-pharmacy',
    client: 'Batley Pharmacy',
    type: 'Client',
    highlight: 'Top local rankings achieved',
    description:
      'Local SEO campaign targeting pharmacy-related keywords in the Batley area, driving foot traffic and online enquiries.',
    tags: ['Local SEO', 'Google Business Profile'],
    featured: false,
  },
  {
    id: 'exeter-diesels',
    client: 'Exeter Diesels',
    type: 'Client',
    highlight: 'Increased organic traffic',
    description:
      'Technical and on-page SEO for an automotive business in Exeter, UK, competing in a geographically targeted market.',
    tags: ['Technical SEO', 'On-Page SEO'],
    featured: false,
  },
  {
    id: 'hope-welfare-trust',
    client: 'Hope Welfare Trust',
    type: 'Client',
    highlight: 'Expanded online presence',
    description:
      'Digital growth strategy for a non-profit to increase donations, volunteer sign-ups, and brand awareness organically.',
    tags: ['Content Marketing', 'On-Page SEO'],
    featured: false,
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
