import '../styles/HomePage.css'
import HomePageHeader from '../components/HomePageHeader'
import HomePageFooter from '../components/HomePageFooter'

function HomePage() {
  return (
    <div className="landing-root">
      <HomePageHeader />
      <main className="landing-main">
        {/* You can add a hero section or tagline here if needed */}
      </main>
      <HomePageFooter />
    </div>
  )
}

export default HomePage
