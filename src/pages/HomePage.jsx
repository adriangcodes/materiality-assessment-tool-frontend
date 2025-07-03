import '../styles/HomePage.css'
import HomePageHeader from '../components/HomePageHeader'
import HomePageFooter from '../components/HomePageFooter'

function HomePage() {
  return (
    <div className="landing-root">
      <HomePageHeader />
      <main className="landing-main">
        <section className="home-hero">
          <div className="hero-content">
            <section className="survey-section">
              <h2 className="survey-title">Complete Your Survey</h2>
              <div className="survey-input-row">
                <input type="text" className="survey-input" placeholder="Enter your survey code" />
                <button className="btn btn-tertiary">START</button>
              </div>
            </section>
            <p className="hero-blurb small-blurb">
              The Materiality Assessment Tool empowers organizations to identify, prioritize, and manage the environmental, social, and governance (ESG) issues that matter most to their stakeholders. With an intuitive interface and data-driven insights, our platform streamlines the assessment process, helping you align your strategy with stakeholder expectations and regulatory requirements. Whether you're just starting your sustainability journey or looking to enhance your reporting, our tool provides actionable guidance and robust analytics to support informed decision-making and drive long-term value for your business.
            </p>
          </div>
        </section>
      </main>
      <HomePageFooter />
    </div>
  )
}

export default HomePage
