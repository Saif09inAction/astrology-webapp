import { Link } from 'react-router-dom'
import PremiumPageHero from '../layout/PremiumPageHero'
import SeoHead from '../components/seo/SeoHead'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <>
      <SeoHead title="Page Not Found | Dheeraj Shastri Ji" description="Page not found." path="/404" noindex />
      <main id="main-content">
        <PremiumPageHero
          breadcrumbs={[{ label: 'Not Found' }]}
          eyebrow="ॐ · Lost Path"
          h1="Page Not Found – Return to Light"
          intro="The page you are looking for does not exist. Return to the homepage for love, relationship, and spiritual guidance."
          compact
          waMessage="I need consultation."
          analyticsTag="404"
        />
        <div className="site-container section-padding text-center">
          <Button as={Link} to="/" variant="primary">Return Home</Button>
        </div>
      </main>
    </>
  )
}
