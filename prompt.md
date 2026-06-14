# Master Prompt — Love Back Astrology Website + Admin Panel

Use this prompt to build (or rebuild) a production-ready astrology consultation website identical in scope, design, and functionality to **lovebackastro.in** — a premium dark-themed Vedic astrology landing site with multi-page SEO, Firebase lead capture, JyotiMitra chatbot, Meta/Google ads tracking, and a full admin panel.

---

## Copy-paste prompt (give this to an AI agent or developer)

```
Build a complete production astrology consultation website + Firebase admin panel with the specifications below. Match the premium dark cosmic aesthetic, conversion-focused lead capture, and SEO architecture described here.

---

## 1. PROJECT OVERVIEW

**Brand:** Dheeraj Shastri Ji — Vedic Astrologer specializing in love back, ex love back, relationship problems, vashikaran, marriage problems, and online spiritual consultation.

**Domain:** lovebackastro.in (configurable via constants)

**Business model:** Free first consultation · Pay after results · 24×7 WhatsApp/phone · Online worldwide

**Target audience:** India (Mumbai, Delhi, Pune, Bangalore) + NRI clients. Languages: English, Hindi, Hinglish, Marathi.

**Key stats to display:** 5000+ clients · 15+ years · 4.9★ rating · 50+ countries

**Phone/WhatsApp:** +91 77376 69336 (configurable in admin)

---

## 2. TECH STACK

- **Frontend:** React 19 + Vite 8 + React Router 7
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), custom CSS for animations
- **Animation:** Framer Motion 12
- **Icons:** Lucide React
- **Backend/DB:** Firebase (Firestore + Auth)
- **Hosting:** Vercel (SPA rewrites, www→non-www redirect)
- **Analytics:** Google Ads gtag (AW-18179328793) + Meta Pixel + Meta Conversion API (Vercel serverless)
- **Build:** `node scripts/generate-sitemap.mjs && vite build`

**Do NOT use:** Next.js, TypeScript (use JSX), heavy UI libraries beyond Headless UI if needed.

---

## 3. DESIGN SYSTEM

### Color palette
- Background: `#030712` (navy-950), `#0a0f1e` (navy-900)
- Gold accent: `#fbbf24`, `#f59e0b`, `#fde68a`, `#d97706`
- Purple accent: `#a78bfa`, `#8b5cf6`, `#7c3aed`
- Text: white at various opacities (88%, 55%, 35%, 20%)

### Typography
- **Headings:** Cinzel (serif, spiritual/premium feel)
- **Body:** Poppins (sans-serif)
- **Optional accent:** Playfair Display

Load fonts via Google Fonts preload in `index.html`.

### Visual language
- Dark starfield canvas background on hero
- Floating gold/purple glow orbs
- Glass-morphism cards (`backdrop-filter: blur`, rgba borders)
- Gold gradient buttons with shadow glow
- Decorative orbit rings around pandit portrait
- ॐ (Om) symbol as brand mark throughout
- Subtle Framer Motion fade-up stagger on scroll sections
- Custom gold scrollbar

### Mobile-first
- Responsive grid: single column mobile, two-column hero on lg+
- Fixed navbar (64px mobile, 90px desktop)
- Floating WhatsApp + Call FABs bottom-right
- Full-screen-ish chatbot on mobile; centered modal on desktop

---

## 4. SITE ARCHITECTURE & ROUTING

Single `AppProvider` wraps entire app. Admin route is OUTSIDE `SiteLayout`.

```
/admin                          → Admin (login or dashboard)
/                               → Homepage
/about                          → About page
/contact                        → Contact page (full contact section)
/services                       → Services grid overview
/blog                           → Blog index
/blog/:slug                     → Blog post (4 posts)
/:service-slug                 → 10 service SEO landing pages
/:location-slug                → 10 location SEO landing pages
*                              → 404 page
```

**Total indexable URLs:** ~29 (5 core + 10 services + 10 locations + 4 blog)

All public pages share `SiteLayout`: Navbar + Footer + LeadModal + FloatingButtons + SpiritGuideWidget.

---

## 5. HOMEPAGE SECTIONS (in order)

1. **Hero** — Full viewport, starfield, two-column grid:
   - Left: eyebrow badge, headline "India's Most Trusted Astrologer for Love & Life", subtext, trust pills (Results in 24 Hours · Pay After Work Done · Lifetime Fix), CTA buttons (Free WhatsApp modal + Call), stats row
   - Right: Pandit portrait with floating info cards (Available 24×7, 4.9★ reviews, Free First Consultation), decorative orbit rings
   - Primary CTA opens lead modal (NOT direct WhatsApp)

2. **MantraBanner** — Sanskrit mantra strip

3. **GuaranteeBanner** — Pay after results promise

4. **About** — Pandit bio, experience, credentials, CTA

5. **Services** — Grid of service cards linking to individual SEO pages; cards open modal or navigate to slug

6. **WhyChooseUs** — Feature cards + CTA

7. **Testimonials** — Client reviews (can load from Firestore or static fallback)

8. **FAQ** — Accordion FAQ section with schema markup

9. **Contact** — Full lead form (name, phone, problem type, message) + direct WhatsApp/phone links + trust promises

---

## 6. MULTI-PAGE SEO SYSTEM

### Data-driven pages (`src/seo/`)

**10 Service pages** (slugs like `love-problem-solution`, `ex-love-back`, `relationship-problems`, `breakup-solution`, `vashikaran-specialist`, `marriage-problem-solution`, `husband-wife-problems`, `kundli-matching`, `black-magic-removal`, `online-astrology-consultation`):

Each page object contains:
- `slug`, `title`, `description`, `h1`, `eyebrow`, `intro`
- `sections[]` with `h2` + `body` content blocks
- `faqs[]` with `q` + `a`
- `keywords[]` (English + Hindi + Hinglish terms)
- `relatedSlugs[]` for internal linking

**10 Location pages** (e.g. `astrologer-in-mumbai`, `love-problem-solution-in-delhi`, `vashikaran-specialist-in-bangalore`):

City-specific SEO content with local keywords.

**4 Blog posts** under `/blog/:slug` with article schema.

### SEO components
- `SeoHead` — dynamic `<title>`, meta description, canonical, OG tags per page
- `StructuredData` — JSON-LD for LocalBusiness, Service, FAQPage, Article, BreadcrumbList
- `SeoPageTemplate` — reusable shell: PremiumPageHero → MantraBanner → GuaranteeBanner → Content sections → WhyChooseUs → Testimonials → FAQ → RelatedServicesNav → Contact
- `PremiumPageHero` — breadcrumbs, h1, intro, keywords pills, WhatsApp + Book Call Back CTAs
- `PageBreadcrumbs`, `PageMiniFAQ`, `PageMiniTestimonials`, `PageCTA`, `PageTrustStrip`

### Sitemap
- `scripts/generate-sitemap.mjs` generates `public/sitemap.xml` at build time from `src/seo/sitemapUrls.js`
- `robots.txt` allows all, points to sitemap

### Meta tags in index.html
- Primary title/description optimized for "love back astrologer", "ex love back solution"
- hreflang: en-IN, hi-IN, mr-IN
- geo tags for India
- OG image: pandit portrait
- Google Ads gtag in head

---

## 7. NAVIGATION

**Navbar (fixed):**
- Logo: ॐ + Pandit name + "Vedic Astrology"
- Links: Home, About, Services, Blog, Testimonials (#testimonials), FAQ (#faq), Contact (#contact scroll)
- Desktop CTAs: Call Now (tel:) + Free Consultation (opens lead modal)
- Mobile: hamburger menu with same links + WhatsApp CTA button

**Footer (5 columns):**
- Brand blurb
- Navigation links
- Service links (6)
- Location links (5)
- Contact info + Free Consultation button (opens modal)

Hash navigation: if on homepage, smooth scroll to section; if on other page, navigate to `/#section`.

---

## 8. LEAD CAPTURE SYSTEM

All leads save to Firebase Firestore. Three capture paths:

### A. Lead Modal (global)
Triggered by: Hero CTA, Floating WhatsApp FAB, Navbar/Footer Free Consultation, service cards, SEO page CTAs.

**Form fields (minimal friction):**
1. WhatsApp number (with country code selector, default +91 India)
2. Name
3. Optional concern chips: Love Problem · Ex Love Back · Marriage · Other

**Flow:**
- Validate name + phone
- Save to `leads` collection with `{ name, phone, service, message, source, status: 'new', createdAt }`
- Fire Meta `Lead` event + Google conversion tracking
- Show success animation
- Auto-open WhatsApp with pre-filled message
- Service defaults to "General Consultation" if not selected

**Modal design:**
- Dark glass modal, centered, backdrop blur
- Green "FIRST Consultation is FREE" banner with shimmer
- Trust strip: Confidential · Pay After Results · Instant Reply
- ॐ header icon

### B. Contact Section Form
Full form at bottom of homepage and SEO pages:
- Name, phone, problem type dropdown, optional message
- Submit → Firestore → Meta Lead event → open WhatsApp

### C. JyotiMitra Chatbot ("Spirit Guide")
Premium spiritual assistant widget:

**FAB:** Draggable ॐ button, bottom-right above WhatsApp FAB, label "Need Guidance?"

**Chat panel:**
- Desktop: centered modal (440×680px max)
- Mobile: near full-screen with margins
- Header: JyotiMitra · Your Spiritual Guidance Assistant

**Conversation flow:**
1. Welcome + options:
   - **"Connect on WhatsApp Now — takes 30 seconds"** (quick path, highlighted gold)
   - Category buttons: Love & Relationship, Ex Love Back, Marriage, Family, Career, Other
   - Common Questions (FAQ mode)
2. Quick path: name → phone → save → WhatsApp (skip qualification)
3. Full path: category → 1–2 qualification questions → name → phone → optional concern → save → WhatsApp
4. FAQ mode: answer common questions, then offer "Book Personal Consultation"

**On lead save:**
- Write to BOTH `leads` AND `chatbot_leads` collections
- `chatbot_leads` includes: category, chatPath, sourcePage, concern
- Track Meta Lead + WhatsApp click events
- Open WhatsApp with structured message

**Ad traffic auto-open:**
- Detect `gclid`, `fbclid`, or UTM paid params
- After 3 seconds, auto-open quick-connect flow (once per session via sessionStorage)

---

## 9. FIREBASE SETUP

### Collections

**`leads`**
```js
{ name, phone, service, message, source, status, createdAt }
// source examples: 'website-modal', 'contact_section', 'jyotimitra-chatbot', 'navbar_whatsapp_desktop'
```

**`chatbot_leads`**
```js
{ name, phone, concern, category, chatPath, sourcePage, source, status, createdAt }
```

**`services`**
```js
{ title, description, icon, order, slug, createdAt }
```

**`testimonials`**
```js
{ name, location, text, rating, createdAt }
```

**`settings/main`** (single document)
```js
{ panditName, phoneRaw, phoneDisplay, phoneTel, whatsappBase, hours, ctaText, consultText }
```

### Firestore Security Rules
```
leads, chatbot_leads: create = anyone; read/update/delete = authenticated admin only
services, testimonials: read = anyone; write = authenticated admin only
settings: read = anyone; write = authenticated admin only
```

### Client config
Standard Firebase web app config in `src/firebase/config.js`. Website loads settings from Firestore on mount, falls back to constants.

---

## 10. ADMIN PANEL (`/admin`)

### Authentication
- Firebase Email/Password auth
- Login page: dark glass card, email + password, show/hide password toggle
- `onAuthStateChanged` guard — show spinner while checking, then login or dashboard
- Create admin user manually in Firebase Console

### Layout
- Dark navy sidebar (collapsible on desktop, overlay on mobile)
- Top header with section title + refresh button
- Main content area

### Sidebar sections

#### 1. Overview
- Dashboard summary cards: total leads, new leads today, contacted, converted
- Recent leads list (last 5–10)
- Quick stats visualization

#### 2. Lead Management
- Full leads table (desktop) + card list (mobile)
- Columns: Name (with avatar initial), Phone, Service, Source, Status, Date
- JyotiMitra badge on chatbot-sourced leads
- Search by name/phone
- Filter by status (new / contacted / converted)
- Sort by date asc/desc
- Inline status dropdown to update
- Quick actions: Call (tel:), WhatsApp (wa.me), Delete
- Bulk refresh

#### 3. Chatbot Leads
- Separate section for JyotiMitra leads from `chatbot_leads` collection
- Shows: name, phone, category, concern, chat path, source page, date
- Same status management + WhatsApp/call/delete actions

#### 4. Services
- CRUD for services displayed on website
- Fields: title, description, icon name, order, slug
- Add / edit / delete with Firestore sync

#### 5. Testimonials
- CRUD for client testimonials
- Fields: name, location, review text, star rating
- Add / edit / delete

#### 6. Settings
- Edit pandit name, phone number (raw + display), WhatsApp base URL (auto-sync from phone), business hours, CTA text
- Save to `settings/main` in Firestore
- Changes reflect on live website immediately (AppContext fetches on load)

### Admin design
- Same dark theme as website
- Gold accents, Cinzel + Poppins fonts
- Glass cards, subtle borders
- Sign out button in sidebar footer
- Responsive: mobile sidebar overlay with hamburger toggle

---

## 11. ANALYTICS & AD TRACKING

### Google Ads
- gtag.js with conversion ID `AW-18179328793` in index.html
- Track page views on route change

### Meta Pixel (client)
- Env: `VITE_META_PIXEL_ID`, `VITE_META_DEBUG`
- Init on app load via `MetaPixel` component
- Track on route change: PageView
- Events:
  - `WhatsAppClick` (custom) — modal opens, CTA clicks
  - `Lead` (standard) — form/chatbot submit with advanced matching (hashed phone/name)
  - `Contact` (standard) — phone/call clicks
- Dual tracking: browser pixel + server CAPI with shared eventId

### Meta Conversion API (server)
- Vercel serverless function: `api/meta-conversion.js`
- Env: `META_PIXEL_ID`, `META_CONVERSION_API_TOKEN`
- SHA-256 hash user data before sending
- CORS allowlist for production domain + localhost

### Ad traffic detection (`src/utils/adTraffic.js`)
- Detect gclid, fbclid, utm_source (google/facebook/meta), utm_medium (cpc/paid)
- Used for chatbot auto-open

---

## 12. GLOBAL STATE (AppContext)

```js
{
  modalOpen, preselectedService,
  openModal(service?), closeModal(),
  settings: { panditName, phoneDisplay, phoneTel, whatsappBase, hours, ctaText },
  settingsLoaded
}
```

`openModal` also fires Meta WhatsAppClick tracking.

---

## 13. FILE STRUCTURE

```
src/
├── App.jsx                    # Router
├── main.jsx
├── index.css                  # Tailwind theme + custom animations
├── constants.js               # SITE_URL, phone, pandit name
├── context/AppContext.jsx
├── firebase/
│   ├── config.js
│   └── firestore.js           # All CRUD helpers
├── analytics/meta/            # Pixel + CAPI + events
├── chatbot/
│   ├── config.js              # Categories, flows, FAQ, prompts
│   ├── useSpiritGuide.js      # Chat state machine
│   └── useDraggableFab.js     # FAB drag position
├── components/
│   ├── admin/                 # Login, Dashboard, Layout, Sidebar, sections/
│   ├── analytics/MetaPixel.jsx
│   ├── chatbot/SpiritGuideWidget.jsx
│   ├── layout/Navbar.jsx, Footer.jsx
│   ├── sections/              # Hero, About, Services, Contact, FAQ, etc.
│   ├── seo/                   # SeoHead, SeoPageTemplate, StructuredData, etc.
│   └── ui/                    # Button, LeadModal, FloatingButtons, StarField, etc.
├── layout/SiteLayout.jsx
├── pages/                     # HomePage, Admin, ServiceLanding, etc.
├── seo/                       # services.js, locationPages.js, blogPosts.js, schema.js, sitemapUrls.js
└── utils/adTraffic.js
api/meta-conversion.js          # Vercel serverless
scripts/generate-sitemap.mjs
firestore.rules
vercel.json
.env.example
public/                         # sitemap.xml, robots.txt, manifest.json, images
index.html                      # Meta tags, gtag, font preload
```

---

## 14. DEPLOYMENT

**Vercel:**
- Build: `npm run build`
- Output: `dist`
- SPA rewrite: all routes → index.html
- www → non-www 301 redirect
- Environment variables for Meta Pixel + CAPI

**Firebase:**
- Deploy rules: `firebase deploy --only firestore:rules`
- Create admin user in Authentication
- Enable Email/Password sign-in

---

## 15. CONTENT & SEO REQUIREMENTS

- Every page must have unique title, description, h1, canonical URL
- Include Hindi/Hinglish/Marathi keywords naturally in content
- Internal linking between related services and locations
- FAQ schema on pages with FAQs
- LocalBusiness + Person schema on homepage
- Mobile-friendly, fast loading (lazy-load below-fold sections)
- Accessible: skip link, aria labels, semantic HTML

---

## 16. CONVERSION BEST PRACTICES (built-in)

- Main CTAs open lead form BEFORE WhatsApp (captures phone in admin)
- Minimal form fields (phone + name only required)
- Quick-connect chatbot path for impatient visitors
- Auto-open chatbot for paid ad traffic
- Trust signals everywhere: free consultation, pay after results, 24×7, confidential
- WhatsApp handoff with pre-filled personalized message after every form submit

---

## 17. CONSTRAINTS

- Do NOT redesign homepage layout unless asked — match existing premium dark cosmic style
- Do NOT use emojis in chatbot UI (professional spiritual tone)
- Do NOT commit `.env` or Firebase secrets
- Keep bundle optimized: lazy-load heavy sections, code-split vendors
- Admin panel must work on mobile
- All lead writes must handle errors gracefully (still open WhatsApp if Firestore fails, show error note)

---

## 18. ACCEPTANCE CRITERIA

✅ Homepage loads with all 9 sections, responsive, animated
✅ 29 SEO pages indexable with unique meta + sitemap entry
✅ Lead modal captures name + phone → saves to Firestore → opens WhatsApp
✅ Contact form saves leads
✅ JyotiMitra chatbot full flow works with quick-connect option
✅ Admin login with Firebase auth
✅ Admin can view/search/filter/update/delete leads
✅ Admin can manage chatbot leads separately
✅ Admin can CRUD services and testimonials
✅ Admin settings update live site phone/name
✅ Meta Pixel + CAPI fire on lead submit
✅ Google Ads gtag present
✅ Deploys to Vercel as SPA
✅ Firestore rules secure (public create leads, admin-only read)

Build the complete project from scratch following this specification.
```

---

## Quick reference

| Item | Value |
|------|-------|
| Live site | https://lovebackastro.in |
| GitHub | astrology-webapp |
| Pandit | Dheeraj Shastri Ji |
| Phone | +91 77376 69336 |
| Firebase project | astrology-3add3 |
| Google Ads ID | AW-18179328793 |
| Chatbot name | JyotiMitra |
| Admin route | `/admin` |
| Lead collections | `leads`, `chatbot_leads` |
| SEO pages | 10 services + 10 locations + 4 blog + 5 core |

---

## Optional follow-up prompts

**To rebuild admin only:**
> Build the Firebase admin panel described in Section 10 of prompt.md. Dark gold theme, sidebar navigation, leads CRUD with search/filter/status, chatbot leads section, services CRUD, testimonials CRUD, settings editor. Use Firebase Auth email/password and Firestore.

**To rebuild chatbot only:**
> Build JyotiMitra spiritual chatbot per Section 8C of prompt.md. React hook state machine, draggable FAB, centered desktop panel, quick-connect path, category flows, FAQ mode, Firebase dual-save, WhatsApp handoff, ad traffic auto-open.

**To add new SEO pages:**
> Add a new service page to `src/seo/services.js` following existing structure (slug, title, description, h1, intro, sections, faqs, keywords, relatedSlugs). Register route in App.jsx. Rebuild sitemap.
