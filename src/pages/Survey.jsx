import { useParams } from 'react-router-dom'
import Logo from '../components/Logo'
import HomePageFooter from '../components/HomePageFooter'

function Survey() {
  const { id } = useParams()

  return (
    <div className="landing-root">
      <header className="landing-header">
        <div className="logo-container">
          <a href="/" aria-label="Go to home page">
            <Logo />
          </a>
          <span className="header-title">Materiality Assessment Tool</span>
        </div>
      </header>
      <main className="landing-main">
        <div className="survey-content">
          <h1>Survey Form</h1>
          <p>Survey ID: {id}</p>
          {/* Survey form will go here */}
        </div>
      </main>
      <HomePageFooter />
    </div>
  )
}

export default Survey