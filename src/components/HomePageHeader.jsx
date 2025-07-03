import Logo from './Logo'

function HomePageHeader() {
  return (
    <header className="landing-header">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="header-buttons">
        <button className="btn btn-secondary">LOGIN</button>
        <button className="btn btn-primary">REGISTER</button>
      </div>
    </header>
  )
}

export default HomePageHeader