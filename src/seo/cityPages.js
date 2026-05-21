/** City/service landing pages — separate indexable URLs for local SEO */
export const CITY_PAGES = [
  {
    slug: 'love-astrologer-mumbai',
    city: 'Mumbai',
    region: 'Maharashtra',
    title: 'Love Astrologer in Mumbai | Ex Love Back Specialist – Dheeraj Shastri Ji',
    description:
      'Best love astrologer in Mumbai for ex love back, breakup help & vashikaran. Online consultation for relationship & marriage problems. Results in 24 hrs. Call +91 72578 57609.',
    h1: 'Love Astrologer in Mumbai – Ex Love Back & Relationship Expert',
    intro:
      'Looking for a trusted love astrologer in Mumbai? Dheeraj Shastri Ji offers confidential online consultation for ex love back, breakup recovery, vashikaran remedies, and marriage problem solutions — serving Mumbai, Navi Mumbai, Thane & all Maharashtra.',
    keywords: [
      'love astrologer in Mumbai',
      'ex love back specialist Mumbai',
      'vashikaran specialist Mumbai',
      'relationship astrologer Mumbai',
      'love problem solution Mumbai',
    ],
  },
  {
    slug: 'love-astrologer-delhi',
    city: 'Delhi',
    region: 'Delhi NCR',
    title: 'Love Astrologer in Delhi | Ex Love Back Solution – Dheeraj Shastri Ji',
    description:
      'Top relationship astrologer in Delhi NCR. Ex love back, love marriage, breakup help & online vashikaran consultation. 15+ years experience. Free WhatsApp consultation available 24/7.',
    h1: 'Love Astrologer in Delhi – Ex Love Back & Marriage Problem Expert',
    intro:
      'Delhi NCR clients trust Dheeraj Shastri Ji for ex love back solutions, husband-wife disputes, intercaste love marriage guidance, and breakup recovery through proven Vedic astrology — available online across Delhi, Gurgaon, Noida & Faridabad.',
    keywords: [
      'relationship astrologer Delhi',
      'ex love back Delhi',
      'love problem solution Delhi NCR',
      'love marriage specialist Delhi',
      'online astrologer Delhi',
    ],
  },
  {
    slug: 'love-astrologer-pune',
    city: 'Pune',
    region: 'Maharashtra',
    title: 'Love Astrologer in Pune | Love Problem Solution – Dheeraj Shastri Ji',
    description:
      'Best love problem solution astrologer in Pune. Ex love back, breakup help, vashikaran & marriage remedies. Online consultation in English, Hindi & Marathi. Results guaranteed.',
    h1: 'Love Astrologer in Pune – प्रेम समस्या & Ex Love Back Expert',
    intro:
      'Pune residents seeking प्रेम समस्या उपाय or ex love back guidance consult Dheeraj Shastri Ji online via WhatsApp. Expert in relationship astrology, vashikaran, love marriage, and emotional healing — serving Pune, Pimpri-Chinchwad & Maharashtra.',
    keywords: [
      'love problem solution Pune',
      'love astrologer Pune',
      'ex love back Pune',
      'vashikaran specialist Pune',
      'प्रेम समस्या ज्योतिष Pune',
    ],
  },
  {
    slug: 'love-astrologer-bangalore',
    city: 'Bangalore',
    region: 'Karnataka',
    title: 'Love Astrologer in Bangalore | Ex Love Back Specialist – Dheeraj Shastri Ji',
    description:
      'Online love astrologer for Bangalore & Karnataka. Ex love back solution, breakup help, relationship guidance & vashikaran specialist. Confidential consultation — results in 24 hours.',
    h1: 'Love Astrologer in Bangalore – Relationship & Ex Love Back Expert',
    intro:
      'Bangalore clients connect with Dheeraj Shastri Ji for love back astrology, breakup recovery, and marriage problem remedies through secure online WhatsApp consultation — serving Bangalore, Mysore & all Karnataka.',
    keywords: [
      'love astrologer Bangalore',
      'vashikaran specialist Bangalore',
      'ex love back Bangalore',
      'relationship astrologer Karnataka',
      'online love astrologer Bangalore',
    ],
  },
  {
    slug: 'ex-love-back-specialist-india',
    city: 'India',
    region: 'Pan India',
    title: 'Ex Love Back Specialist India | Love Back Astrologer – Dheeraj Shastri Ji',
    description:
      'India\'s trusted ex love back specialist & love back astrologer. How to get ex back, pyar wapas kaise laye, vashikaran & breakup solution. Online consultation 24/7 across India & worldwide.',
    h1: 'Ex Love Back Specialist India – Love Back Astrologer Online',
    intro:
      'How to get your ex back? Dheeraj Shastri Ji is a renowned ex love back specialist serving all India — Mumbai, Delhi, Pune, Bangalore, Hyderabad, Chennai & worldwide NRI clients. Consult in English, Hindi, Marathi & Hinglish. प्यार वापस कैसे लाएं | pyar wapas kaise laye | ex ko wapas kaise laye.',
    keywords: [
      'ex love back specialist',
      'love back astrologer India',
      'how to get ex back',
      'pyar wapas kaise laye',
      'online love astrologer India',
      'vashikaran specialist India',
    ],
  },
]

export function getCityPage(slug) {
  return CITY_PAGES.find((p) => p.slug === slug) ?? null
}
