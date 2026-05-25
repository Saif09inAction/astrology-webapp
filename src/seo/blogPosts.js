/** SEO blog posts — static content architecture */
export const BLOG_POSTS = [
  {
    slug: 'how-to-get-ex-back',
    title: 'How to Get Your Ex Back – Complete Astrology Guide | Dheeraj Shastri Ji',
    description: 'Learn how to get your ex back through Vedic astrology. Signs of reunion, remedies, pyar wapas kaise laye & when to consult an ex love back specialist.',
    h1: 'How to Get Your Ex Back – A Spiritual & Astrological Guide',
    date: '2026-05-15',
    readTime: '8 min',
    category: 'Ex Love Back',
    excerpt: 'Heartbreak after a breakup feels final — but Vedic astrology often reveals a path back to love. Here is how ex love back astrology works and what you can do today.',
    sections: [
      {
        h2: 'Why do breakups happen astrologically?',
        body: 'Breakups frequently align with adverse Venus transits, Rahu-Ketu axis activation, or 7th house afflictions. Understanding these planetary periods helps determine whether reunion is supported by your cosmic chart.',
      },
      {
        h2: '5 signs your ex may still have feelings',
        body: 'Sudden contact, asking mutual friends about you, viewing your social media, remembering special dates, and expressing regret — combined with favourable chart timing, these signs suggest reunion potential.',
      },
      {
        h2: 'pyar wapas kaise laye – practical steps',
        body: 'Consult a trusted ex love back specialist, follow personalised mantras and remedies, avoid desperate behaviour, work on self-improvement, and trust divine timing. Pandit Dheeraj Shastri Ji guides clients through each step via WhatsApp.',
      },
      {
        h2: 'When to seek professional astrology help',
        body: 'If months pass without progress, negative energy feels present, or family interference blocks reconciliation — professional chart analysis and vashikaran remedies can remove obstacles blocking love.',
      },
    ],
    keywords: ['how to get ex back', 'pyar wapas kaise laye', 'ex ko wapas kaise laye', 'ex love back guide'],
    relatedSlugs: ['love-problem-solution-guide', 'signs-your-ex-will-return'],
  },
  {
    slug: 'love-problem-solution-guide',
    title: 'Love Problem Solution Guide – Astrology Remedies That Work',
    description: 'Complete guide to love problem solution through Vedic astrology. Types of love problems, remedies, consultation process & multilingual support in Hindi & Marathi.',
    h1: 'Love Problem Solution – Complete Astrology Guide',
    date: '2026-05-10',
    readTime: '7 min',
    category: 'Love Problems',
    excerpt: 'Love problems come in many forms — one-sided love, family opposition, third-person interference, or fading intimacy. This guide explains how astrology identifies and resolves them.',
    sections: [
      {
        h2: 'Types of love problems astrology solves',
        body: 'One-sided love, breakups, long-distance strain, intercaste barriers, communication breakdown, trust issues, and post-marriage love loss — each has distinct planetary signatures in your birth chart.',
      },
      {
        h2: 'Love problem solution remedies',
        body: 'Personalised mantras, gemstone recommendations, puja guidance, fasting protocols, and vashikaran techniques — prescribed only after thorough kundli analysis by an experienced astrologer.',
      },
      {
        h2: 'प्रेम समस्या समाधान – Hindi consultation',
        body: 'Consult in Hindi or Hinglish for love problem solution baba guidance. Share your birth details on WhatsApp and receive remedies tailored to your specific planetary configuration.',
      },
    ],
    keywords: ['love problem solution', 'love problem solution guide', 'प्रेम समस्या', 'relationship astrology guide'],
    relatedSlugs: ['how-to-get-ex-back', 'relationship-healing-through-astrology'],
  },
  {
    slug: 'signs-your-ex-will-return',
    title: '7 Signs Your Ex Will Come Back – Astrological Indicators',
    description: 'Signs your ex will return based on Vedic astrology. Planetary indicators, dream signs, and when to use ex love back remedies. Expert guide by Dheeraj Shastri Ji.',
    h1: '7 Signs Your Ex Will Come Back – What Astrology Reveals',
    date: '2026-05-05',
    readTime: '6 min',
    category: 'Ex Love Back',
    excerpt: 'Waiting for your ex to return? Astrology provides clear indicators in both charts. Here are seven signs that suggest reunion may be written in your destiny.',
    sections: [
      {
        h2: 'Astrological signs of reunion',
        body: 'Strong Venus in Navamsa, 7th lord in favourable transit, ex\'s chart showing return of love planets, and matching dasha periods — these are primary astrological reunion indicators.',
      },
      {
        h2: 'Behavioural signs to watch for',
        body: 'Unexpected messages, nostalgia-driven contact, jealousy when you move on, asking about your wellbeing, and attempts to meet — especially during favourable transits.',
      },
      {
        h2: 'What to do while waiting',
        body: 'Follow prescribed remedies, avoid negative thoughts, do not force contact, and consult an ex love back specialist for personalised guidance rather than guessing.',
      },
    ],
    keywords: ['signs your ex will come back', 'signs ex will return', 'will my ex come back astrology'],
    relatedSlugs: ['how-to-get-ex-back', 'relationship-healing-through-astrology'],
  },
  {
    slug: 'relationship-healing-through-astrology',
    title: 'Relationship Healing Through Astrology – Emotional Recovery Guide',
    description: 'Heal relationship wounds through Vedic astrology. Emotional healing, breakup recovery, trust rebuilding & spiritual guidance for lasting love.',
    h1: 'Relationship Healing Through Astrology – Restore Inner Peace & Love',
    date: '2026-04-28',
    readTime: '7 min',
    category: 'Relationship Healing',
    excerpt: 'Whether reuniting with a partner or healing after loss, Vedic astrology offers powerful tools for emotional recovery and relationship restoration.',
    sections: [
      {
        h2: 'Emotional healing after relationship trauma',
        body: 'Moon and Venus afflictions often cause deep emotional wounds. Specific mantras, meditation practices, and gemstone therapy stabilise emotions and rebuild inner strength.',
      },
      {
        h2: 'Rebuilding trust in relationships',
        body: 'Chart compatibility analysis reveals trust patterns. Remedies for both partners can dissolve suspicion and reopen channels of honest communication.',
      },
      {
        h2: 'Astrology for love – long-term harmony',
        body: 'Beyond crisis intervention, regular astrological guidance helps couples navigate life transitions, financial stress, and family pressures without losing connection.',
      },
    ],
    keywords: ['relationship healing', 'emotional healing astrology', 'breakup recovery', 'astrology for love'],
    relatedSlugs: ['love-problem-solution-guide', 'signs-your-ex-will-return'],
  },
]

export function getBlogPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null
}

export function getRelatedPosts(slug, limit = 3) {
  const post = getBlogPost(slug)
  if (!post) return BLOG_POSTS.slice(0, limit)
  const related = post.relatedSlugs
    .map((s) => getBlogPost(s))
    .filter(Boolean)
  return related.length >= limit ? related.slice(0, limit) : [...related, ...BLOG_POSTS.filter((p) => p.slug !== slug && !related.find((r) => r.slug === p.slug))].slice(0, limit)
}
