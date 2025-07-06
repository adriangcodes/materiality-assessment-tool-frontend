// Modular header component that imports Logo.

import Logo from './Logo'

function HomePageHeader() {
  return (
    <header className="landing-header">
      <div className="logo-container">
        <a href="/" aria-label="Go to home page">
          <Logo />
        </a>
        <span className="header-title">Materiality Assessment Tool</span>
      </div>
      <div className="header-buttons">
        <button className="btn btn-secondary">LOGIN</button>
        <button className="btn btn-primary">REGISTER</button>
      </div>
    </header>
  )
}

export default HomePageHeader