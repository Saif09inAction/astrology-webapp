import { SITE_URL, PANDIT_NAME, PHONE_DISPLAY, PHONE_RAW } from '../constants'

export const SEO = {
  siteName: `${PANDIT_NAME} – Love Back & Relationship Astrologer`,
  brandName: PANDIT_NAME,
  siteUrl: SITE_URL,
  phone: `+${PHONE_RAW}`,
  phoneDisplay: PHONE_DISPLAY,

  title:
    'Love Back Astrologer | Ex Love Back Solution | Online Relationship Guidance – Dheeraj Shastri Ji',

  description:
    'Get your ex back with Dheeraj Shastri Ji — India\'s trusted love back astrologer & vashikaran specialist. Ex love back solution, breakup help, marriage problem remedy & online astrology consultation. Results in 24 hrs. Mumbai, Delhi, Pune, Bangalore & India. प्यार वापस | pyar wapas kaise laye.',

  ogTitle: 'Love Back Astrologer – Ex Love Back Solution | Dheeraj Shastri Ji',
  ogDescription:
    'Expert love problem solution astrologer. Ex love back, breakup help, vashikaran & online relationship guidance across India. 15+ years · 5000+ clients · Results in 24 hours.',

  image: `${SITE_URL}/pandit1.jpeg`,
  imageAlt:
    'Dheeraj Shastri Ji – Best love back astrologer, ex love specialist & online vashikaran consultant in India',

  locale: 'en_IN',
  languages: ['en-IN', 'hi-IN', 'mr-IN'],
  defaultLanguage: 'en-IN',

  geo: {
    region: 'IN',
    placename: 'India',
    latitude: '20.5937',
    longitude: '78.9629',
  },
}

/** Primary + long-tail keywords for meta and schema */
export const KEYWORDS = {
  english: [
    'love back astrologer',
    'ex love back solution',
    'how to get ex back',
    'love problem solution',
    'relationship problem astrologer',
    'online love astrologer',
    'breakup solution astrologer',
    'best astrologer for love problems',
    'ex love specialist',
    'online relationship guidance',
    'vashikaran specialist',
    'online tantrik consultation',
    'spiritual love guidance',
    'marriage problem solution astrologer',
    'love marriage specialist',
    'online astrology consultation',
    'relationship astrology',
    'emotional healing astrologer',
    'get ex girlfriend back',
    'get ex boyfriend back',
    'lost love back specialist',
    'breakup help astrologer',
    'love back solution baba',
    'online jyotish for love problems',
    'best tantrik near me',
    'relationship breakup remedy',
    'husband wife dispute astrologer',
    'intercaste love marriage astrologer',
    'long distance relationship astrology',
    'one sided love solution',
  ],
  hindi: [
    'प्यार वापस कैसे लाएं',
    'लव प्रॉब्लम सॉल्यूशन',
    'एक्स वापस कैसे लाएं',
    'रिश्तों की समस्या समाधान',
    'ऑनलाइन ज्योतिष सलाह',
    'प्रेम समस्या ज्योतिष',
    'वशीकरण विशेषज्ञ',
    'प्रेम विवाह समाधान',
    'पति पत्नी विवाद समाधान',
    'टूटे रिश्ते को जोड़ना',
  ],
  hinglish: [
    'pyar wapas kaise laye',
    'ex ko wapas kaise laye',
    'love problem solution baba',
    'breakup solution astrologer',
    'ex love back specialist near me',
    'online love astrologer India',
    'vashikaran specialist baba',
    'relationship problem ka solution',
    'marriage problem solution astrologer',
    'tantrik consultation online',
  ],
  marathi: [
    'प्रेम परत मिळवण्यासाठी उपाय',
    'नातेसंबंध समस्या उपाय',
    'प्रेम समस्या ज्योतिष',
    'माजी प्रेम परत मिळवणे',
    'लग्न समस्या उपाय',
    'ऑनलाइन ज्योतिष सल्ला',
  ],
}

export const ALL_KEYWORDS = [
  ...KEYWORDS.english,
  ...KEYWORDS.hindi,
  ...KEYWORDS.hinglish,
  ...KEYWORDS.marathi,
].join(', ')

export const ALTERNATE_NAMES = [
  PANDIT_NAME,
  'Dheeraj Shastri',
  'Pandit Dheeraj Shastri Ji',
  'Love Back Astrologer India',
  'Ex Love Back Specialist',
  'Best Love Problem Solution Astrologer',
  'Online Vashikaran Specialist',
  'Relationship Astrologer',
  'प्यार वापस लाने वाले ज्योतिषी',
  'प्रेम समस्या समाधान',
  'pyar wapas kaise laye astrologer',
  'प्रेम परत मिळवण्यासाठी ज्योतिष',
]
