import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import CityLanding from './pages/CityLanding'
import MetaPixel from './components/analytics/MetaPixel'
import { CITY_PAGES } from './seo/cityPages'

export default function App() {
  return (
    <BrowserRouter>
      <MetaPixel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        {CITY_PAGES.map((page) => (
          <Route key={page.slug} path={`/${page.slug}`} element={<CityLanding slug={page.slug} />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
