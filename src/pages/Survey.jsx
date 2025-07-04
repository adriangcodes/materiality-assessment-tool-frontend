import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../components/Logo'
import HomePageFooter from '../components/HomePageFooter'
import '../styles/Survey.css'

const countryList = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
  'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia',
  'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine',
  'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
  'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe'
];

const stakeholderOptions = [
  'Employee',
  'Customer',
  'Investor',
  'Supplier',
  'Community Member',
  'Government / Regulator',
  'NGO / Civil Society',
  'Other'
];

function Survey() {
  const { id: surveyId } = useParams()
  const [form, setForm] = useState({
    stakeholderType: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    region: '',
    consentToContact: false,
    consentToStorePII: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    // Basic validation
    if (!form.firstName || !form.lastName || !form.emailAddress || !form.stakeholderType) {
      setError('Please fill in all required fields.')
      setLoading(false)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailAddress)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('https://materiality-assessment-tool.onrender.com/respondent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, surveyId })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Submission failed')
      }
      setSuccess('Respondent details submitted!')
      setForm({
        stakeholderType: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        region: '',
        consentToContact: false,
        consentToStorePII: false
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
          <p>Survey ID: {surveyId}</p>
          <form className="respondent-form" onSubmit={handleSubmit}>
            <h2>Respondent Details</h2>
            <div className="form-row">
              <label>First Name*:
                <input name="firstName" value={form.firstName} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label>Last Name*:
                <input name="lastName" value={form.lastName} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label>Email Address*:
                <input name="emailAddress" value={form.emailAddress} onChange={handleChange} required type="email" />
              </label>
            </div>
            <div className="form-row">
              <label>Region:
                <select name="region" value={form.region} onChange={handleChange}>
                  <option value="">Select a country</option>
                  {countryList.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>Stakeholder Type*:</label>
              <div className="stakeholder-options">
                {stakeholderOptions.map(option => (
                  <label key={option} className="stakeholder-checkbox">
                    <input
                      type="radio"
                      name="stakeholderType"
                      value={option}
                      checked={form.stakeholderType === option}
                      onChange={handleChange}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-row">
              <label>
                <input type="checkbox" name="consentToContact" checked={form.consentToContact} onChange={handleChange} />
                Consent to being contacted about your answers
              </label>
            </div>
            <div className="form-row">
              <label>
                <input type="checkbox" name="consentToStorePII" checked={form.consentToStorePII} onChange={handleChange} />
                Consent to store personal data (if unchecked, your answers remain anonymous)
              </label>
            </div>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          </form>
        </div>
      </main>
      <HomePageFooter />
    </div>
  )
}

export default Survey