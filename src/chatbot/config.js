/** JyotiMitra — Premium Spiritual Guidance Assistant */

export const ASSISTANT = {
  name: 'JyotiMitra',
  title: 'Your Spiritual Guidance Assistant',
  subtitle: 'Divine Consultation Assistant',
  tooltip: 'Need Guidance?',
}

export const MAIN_CATEGORIES = [
  { id: 'love', label: 'Love & Relationship' },
  { id: 'ex-love', label: 'Ex Love Back' },
  { id: 'marriage', label: 'Marriage Problems' },
  { id: 'family', label: 'Family Issues' },
  { id: 'career', label: 'Career Guidance' },
  { id: 'other', label: 'Other Guidance' },
]

export const CATEGORY_FLOWS = {
  love: {
    label: 'Love & Relationship',
    steps: [
      {
        question: 'What best describes your situation?',
        options: [
          { id: 'relationship', label: 'Relationship Issues' },
          { id: 'breakup', label: 'Breakup' },
          { id: 'communication', label: 'Communication Problems' },
          { id: 'marriage-concern', label: 'Marriage Concerns' },
        ],
      },
      {
        question: 'How long have you been facing this?',
        options: [
          { id: 'recent', label: 'Less than 1 month' },
          { id: 'months', label: '1–6 months' },
          { id: 'long', label: 'More than 6 months' },
        ],
      },
    ],
  },
  'ex-love': {
    label: 'Ex Love Back',
    steps: [
      {
        question: 'When did the separation happen?',
        options: [
          { id: 'recent', label: 'Recently Broke Up' },
          { id: '3months', label: 'More Than 3 Months Ago' },
          { id: '1year', label: 'More Than 1 Year Ago' },
        ],
      },
      {
        question: 'Are you still in contact with them?',
        options: [
          { id: 'yes', label: 'Yes, occasionally' },
          { id: 'no', label: 'No contact at all' },
          { id: 'blocked', label: 'They blocked me' },
        ],
      },
    ],
  },
  marriage: {
    label: 'Marriage Problems',
    steps: [
      {
        question: 'What type of marriage concern do you have?',
        options: [
          { id: 'compatibility', label: 'Compatibility Issues' },
          { id: 'in-laws', label: 'Family / In-Law Problems' },
          { id: 'delay', label: 'Marriage Delay' },
          { id: 'harmony', label: 'Husband-Wife Disputes' },
        ],
      },
    ],
  },
  family: {
    label: 'Family Issues',
    steps: [
      {
        question: 'What area needs guidance?',
        options: [
          { id: 'parent', label: 'Parent Conflicts' },
          { id: 'sibling', label: 'Sibling Disputes' },
          { id: 'property', label: 'Property / Inheritance' },
          { id: 'other-family', label: 'Other Family Matter' },
        ],
      },
    ],
  },
  career: {
    label: 'Career Guidance',
    steps: [
      {
        question: 'What would you like guidance on?',
        options: [
          { id: 'job', label: 'Job / Career Change' },
          { id: 'business', label: 'Business Decisions' },
          { id: 'stuck', label: 'Feeling Stuck' },
          { id: 'study', label: 'Education / Studies' },
        ],
      },
    ],
  },
  other: {
    label: 'Other Guidance',
    steps: [
      {
        question: 'Please select the closest area:',
        options: [
          { id: 'spiritual', label: 'Spiritual Healing' },
          { id: 'health', label: 'Health Concerns' },
          { id: 'general', label: 'General Life Guidance' },
          { id: 'unsure', label: 'Not Sure Yet' },
        ],
      },
    ],
  },
}

export const FAQ_ITEMS = [
  {
    id: 'fees',
    label: 'Consultation fees?',
    answer: 'The first consultation is free. Pandit Ji follows a pay-after-results model — you only pay once you see meaningful progress. No upfront charges.',
  },
  {
    id: 'process',
    label: 'How does consultation work?',
    answer: 'Share your details via WhatsApp. Pandit Ji analyses your birth chart and situation, then provides personalised Vedic guidance and remedies — all online, no travel needed.',
  },
  {
    id: 'online',
    label: 'Is online consultation available?',
    answer: 'Yes. Consultations are fully online via WhatsApp call or chat. Available 24×7 for clients across India and internationally.',
  },
  {
    id: 'privacy',
    label: 'Is my information private?',
    answer: 'Absolutely. Every consultation is strictly confidential. Your personal details and concerns are never shared with anyone.',
  },
  {
    id: 'availability',
    label: 'When is Pandit Ji available?',
    answer: 'Available 24×7, seven days a week. Most enquiries receive a response within 30 minutes.',
  },
  {
    id: 'language',
    label: 'Which languages are supported?',
    answer: 'Consultations are available in English, Hindi, Marathi, and Hinglish — whichever you are most comfortable with.',
  },
]

export const TRUST_MESSAGE =
  'Pandit Ji has guided 5,000+ souls across 50+ countries with ancient Vedic wisdom. Your journey is sacred — and completely confidential.'

export const LEAD_PROMPTS = {
  name: 'May I know your name, so Pandit Ji can address you personally?',
  phone: 'Please share your WhatsApp number for a private consultation.',
  concern: 'Would you like to briefly describe your concern? (Optional — you can skip)',
}
