import { SEO, KEYWORDS, ALTERNATE_NAMES } from './config'
import { buildAreaServedSchema } from './locations'
import { SEO_FAQS } from './faqs'

const { siteUrl, brandName, phone, image } = SEO

const SERVICES = [
  {
    name: 'Love Problem Solution',
    description:
      'Reunite with lost love through proven Vedic astrology remedies. Love back solution for breakups, one-sided love, and relationship conflicts. Results in 24 hours.',
    keywords: 'love problem solution, love back astrologer, relationship problem astrologer',
  },
  {
    name: 'Ex Love Back',
    description:
      'Restore broken relationships and get your ex back permanently using ancient Vedic and vashikaran techniques. Ex love specialist serving Mumbai, Delhi, Pune, Bangalore & India.',
    keywords: 'ex love back solution, how to get ex back, ex love specialist, pyar wapas kaise laye',
  },
  {
    name: 'Vashikaran & Tantrik Consultation',
    description:
      'Ethical vashikaran specialist and online tantrik consultation for love, marriage, and emotional healing. Confidential spiritual guidance available 24/7.',
    keywords: 'vashikaran specialist, online tantrik consultation, best tantrik near me, spiritual love guidance',
  },
  {
    name: 'Marriage Problem Solution',
    description:
      'Vedic astrology for marriage problems, husband-wife disputes, love marriage specialist guidance, and compatibility remedies.',
    keywords: 'marriage problem solution astrologer, love marriage specialist, marriage consultation',
  },
  {
    name: 'Online Astrology Consultation',
    description:
      'Online love astrologer and relationship guidance via WhatsApp. English, Hindi, Marathi & Hinglish. प्यार वापस | प्रेम समस्या | ex ko wapas kaise laye.',
    keywords: 'online astrology consultation, online love astrologer, online relationship guidance',
  },
  {
    name: 'Breakup Help & Emotional Healing',
    description:
      'Breakup solution astrologer offering emotional healing, relationship astrology, and remedies to overcome heartbreak and restore love.',
    keywords: 'breakup help, breakup solution astrologer, emotional healing, relationship astrology',
  },
  {
    name: 'Kundli Matching',
    description: 'In-depth birth chart analysis for harmonious love marriage and long-term relationship compatibility.',
    keywords: 'kundli matching, love marriage astrologer, relationship compatibility',
  },
  {
    name: 'Career & Business Guidance',
    description: 'Align career and business path with cosmic birth chart for lasting success and prosperity.',
    keywords: 'career guidance jyotish, business problem solution astrologer',
  },
]

const REVIEWS = [
  {
    author: 'Priya Sharma',
    datePublished: '2025-11-10',
    reviewBody:
      'Dheeraj Shastri Ji helped me reunite with my husband within 2 weeks. His love back guidance was incredibly accurate and the remedies actually worked. Best astrologer for love problems in India.',
  },
  {
    author: 'Rahul Verma',
    datePublished: '2025-12-05',
    reviewBody:
      'Got my ex back after 3 months of breakup. Genuine ex love back specialist — very confidential online consultation. Highly recommended for relationship problems.',
  },
  {
    author: 'Anjali Mehta',
    datePublished: '2026-01-20',
    reviewBody:
      'My marriage was on the verge of divorce. Pandit Ji\'s vashikaran and marriage problem remedies restored peace within 3 weeks. Worth every penny.',
  },
  {
    author: 'Sneha Patil',
    datePublished: '2026-02-14',
    reviewBody:
      'Online love astrologer who actually delivers results. Consulted from Pune in Marathi — प्रेम समस्या solved. Thank you Dheeraj Shastri Ji.',
  },
]

function buildReviewsSchema() {
  return REVIEWS.map((r) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: r.author },
    datePublished: r.datePublished,
    reviewBody: r.reviewBody,
  }))
}

function buildFaqSchema() {
  return SEO_FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  }))
}

function buildServicesCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Love Back, Relationship & Vedic Astrology Services',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@id': `${siteUrl}/#business` },
        areaServed: buildAreaServedSchema(),
        serviceType: s.keywords,
      },
    })),
  }
}

/** Full JSON-LD @graph for StructuredData component */
export function buildSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: SEO.siteName,
        description: SEO.description,
        inLanguage: ['en-IN', 'hi-IN', 'mr-IN'],
        publisher: { '@id': `${siteUrl}/#business` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: SEO.title,
        description: SEO.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#business` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: image,
          caption: SEO.imageAlt,
        },
        inLanguage: 'en-IN',
        keywords: [
          ...KEYWORDS.english,
          ...KEYWORDS.hinglish,
          ...KEYWORDS.hindi.slice(0, 5),
          ...KEYWORDS.marathi.slice(0, 3),
        ].join(', '),
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${siteUrl}/#business`,
        name: `${brandName} – Love Back & Relationship Astrologer`,
        alternateName: ALTERNATE_NAMES,
        description: SEO.description,
        url: siteUrl,
        telephone: phone,
        image,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon.svg`,
          width: 60,
          height: 60,
        },
        priceRange: '₹₹',
        currenciesAccepted: 'INR, USD, GBP, AUD, CAD',
        paymentAccepted: 'Cash, UPI, Bank Transfer, PayPal',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
          addressRegion: 'Maharashtra',
          addressLocality: 'India',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SEO.geo.latitude,
          longitude: SEO.geo.longitude,
        },
        areaServed: buildAreaServedSchema(),
        hasOfferCatalog: buildServicesCatalog(),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1200',
          bestRating: '5',
          worstRating: '1',
        },
        review: buildReviewsSchema(),
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        sameAs: [`https://wa.me/${phone.replace('+', '')}`],
        knowsAbout: [
          'Love Back Astrology',
          'Ex Love Back Solution',
          'Vashikaran',
          'Tantrik Remedies',
          'Relationship Astrology',
          'Marriage Problem Solution',
          'Breakup Help',
          'Online Astrology Consultation',
          'Vedic Jyotish',
          'Kundli Matching',
          'Emotional Healing',
          'प्यार वापस',
          'प्रेम समस्या',
          'pyar wapas kaise laye',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: buildFaqSchema(),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Love Back Astrologer', item: `${siteUrl}/#services` },
          { '@type': 'ListItem', position: 3, name: 'FAQ', item: `${siteUrl}/#faq` },
          { '@type': 'ListItem', position: 4, name: 'Contact', item: `${siteUrl}/#contact` },
        ],
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: brandName,
        jobTitle: 'Love Back Astrologer, Vashikaran Specialist & Spiritual Healer',
        description:
          'India\'s trusted love back astrologer with 15+ years experience. Expert in ex love back, relationship problems, marriage remedies, vashikaran, and online astrology consultation.',
        url: siteUrl,
        telephone: phone,
        image,
        knowsAbout: [
          'Vedic Astrology',
          'Love Problem Solution',
          'Ex Love Back',
          'Vashikaran Specialist',
          'Relationship Astrology',
          'Marriage Consultation',
          'Breakup Remedies',
          'Online Jyotish',
        ],
        worksFor: { '@id': `${siteUrl}/#business` },
      },
    ],
  }
}
