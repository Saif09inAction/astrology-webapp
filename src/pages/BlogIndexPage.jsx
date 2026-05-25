import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { lazy, Suspense } from 'react'
import PremiumPageHero from '../layout/PremiumPageHero'
import MantraBanner from '../components/ui/MantraBanner'
import SeoHead from '../components/seo/SeoHead'
import StructuredData from '../components/seo/StructuredData'
import GlowOrb from '../components/ui/GlowOrb'
import { BLOG_POSTS } from '../seo/blogPosts'

const Contact = lazy(() => import('../components/sections/Contact'))
const GuaranteeBanner = lazy(() => import('../components/sections/GuaranteeBanner'))

const META = {
  title: 'Love & Relationship Astrology Blog | Guides & Remedies – Dheeraj Shastri Ji',
  description: 'Expert guides on ex love back, love problem solution, relationship healing & Vedic astrology. pyar wapas kaise laye, breakup help & more.',
  path: '/blog',
}

export default function BlogIndexPage() {
  return (
    <>
      <SeoHead title={META.title} description={META.description} path={META.path} />
      <StructuredData pageType="blog-index" pageData={META} />
      <main id="main-content" role="main">
        <PremiumPageHero
          breadcrumbs={[{ label: 'Blog' }]}
          eyebrow="ॐ · Wisdom · Guidance"
          h1="Love & Relationship – Astrology Blog"
          intro="Expert spiritual guides on ex love back, love problems, relationship healing, and Vedic astrology remedies — written to help you find clarity and peace."
          waMessage="I read your blog and need personal consultation."
          analyticsTag="blog_hero"
          compact
        />
        <MantraBanner />
        <Suspense fallback={null}><GuaranteeBanner /></Suspense>

        <section className="relative section-padding overflow-hidden"
          style={{ background: 'linear-gradient(180deg, rgba(10,15,35,1) 0%, rgba(3,7,18,1) 100%)' }}>
          <GlowOrb color="gold" size={400} top="20%" left="90%" opacity={0.05} />
          <div className="site-container relative z-10">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
              ॐ · Articles · Insights
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center font-cinzel text-3xl md:text-4xl font-bold text-white mb-12">
              Spiritual <span className="text-gradient-gold">Guidance</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.map((post, i) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Link to={`/blog/${post.slug}`}
                    className="group block rounded-3xl overflow-hidden h-full transition-all duration-300 hover:scale-[1.01]"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #f59e0b, #a78bfa, transparent)' }} />
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-poppins text-[10px] uppercase tracking-wider px-2 py-1 rounded-full"
                          style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}>
                          {post.category}
                        </span>
                        <span className="font-poppins text-[11px] text-white/25 flex items-center gap-1">
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-gold-400 transition-colors mb-3 leading-snug">
                        {post.h1}
                      </h3>
                      <p className="font-poppins text-[13px] text-white/40 leading-relaxed mb-5">{post.excerpt}</p>
                      <span className="font-poppins text-[12px] text-gold-400/70 group-hover:gap-2 flex items-center gap-1 transition-all">
                        Read article →
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={null}><Contact /></Suspense>
      </main>
    </>
  )
}
