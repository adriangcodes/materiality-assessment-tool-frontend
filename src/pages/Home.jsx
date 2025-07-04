import '../styles/Home.css'
import HomePageHeader from '../components/HomePageHeader'
import HomePageFooter from '../components/HomePageFooter'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const handleStart = (e) => {
    e.preventDefault()
    if (code.trim()) {
      navigate(`/survey/${code.trim()}`)
    }
  }

  return (
    <div className="landing-root">
      <HomePageHeader />
      <main className="landing-main">
        <section className="home-hero">
          <div className="hero-content">
            <section className="survey-section">
              <h2 className="survey-title">Complete Your Survey</h2>
              <form className="survey-input-row" onSubmit={handleStart}>
                <input
                  type="text"
                  className="survey-input"
                  placeholder="Enter your survey code"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
                <button type="submit" className="btn btn-tertiary">START</button>
              </form>
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

export default Home
