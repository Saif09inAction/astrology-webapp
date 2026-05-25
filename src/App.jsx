import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SiteLayout from './layout/SiteLayout'
import { AppProvider } from './context/AppContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ServicesOverviewPage from './pages/ServicesOverviewPage'
import ServiceLanding from './pages/ServiceLanding'
import LocationLanding from './pages/LocationLanding'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import NotFoundPage from './pages/NotFoundPage'
import Admin from './pages/Admin'
import MetaPixel from './components/analytics/MetaPixel'
import { SERVICE_PAGES } from './seo/services'
import { LOCATION_PAGES } from './seo/locationPages'
import { BLOG_POSTS } from './seo/blogPosts'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MetaPixel />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesOverviewPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />

            {SERVICE_PAGES.map((p) => (
              <Route key={p.slug} path={`/${p.slug}`} element={<ServiceLanding slug={p.slug} />} />
            ))}

            {LOCATION_PAGES.map((p) => (
              <Route key={p.slug} path={`/${p.slug}`} element={<LocationLanding slug={p.slug} />} />
            ))}

            {BLOG_POSTS.map((p) => (
              <Route key={p.slug} path={`/blog/${p.slug}`} element={<BlogPostPage slug={p.slug} />} />
            ))}

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
