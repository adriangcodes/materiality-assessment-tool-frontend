// Survey page.

import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import '../styles/Survey.css'

import Logo from '../components/Logo'
import HomePageFooter from '../components/HomePageFooter'
import { SingleChoiceQuestion, MatrixQuestion, RankingQuestion, TextQuestion } from '../components/questions';

// List of countries used for respondent details section
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

// List of stakeholder options for respondent details section
const stakeholderOptions = [
  'Employee',
  'Customer',
  'Investor',
  'Supplier',
  'Community Member',
  'Government / Regulator',
  'NGO / Charity / Civil Society',
  'Other'
];

// Main component for the stakeholder survey experience & logic
function Survey() {
    const { id: surveyId } = useParams()
    const navigate = useNavigate()
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
    const [respondentId, setRespondentId] = useState(null)
    const [surveySubmitted, setSurveySubmitted] = useState(false)
    const [answers, setAnswers] = useState({})

    // Survey details state
    const [surveyName, setSurveyName] = useState('')
    const [organisation, setOrganisation] = useState('')
    const [frameworkId, setFrameworkId] = useState('')
    const [surveyLoading, setSurveyLoading] = useState(true)

    // Master questions state
    const [questions, setQuestions] = useState([])
    const [questionsLoading, setQuestionsLoading] = useState(true)

    // Fetch survey details
    useEffect(() => {
    setSurveyLoading(true)
    setError('') // Clear any previous errors
    
    fetch(`https://materiality-assessment-tool.onrender.com/survey/${surveyId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Survey not found (${res.status})`)
            }
            return res.json()
        })
        .then(data => {
            setSurveyName(data.name || '')
            setOrganisation(data.organisationId?.name || '')
            setFrameworkId(data.framework || '')
        })
        .catch((error) => {
            console.error('Failed to fetch survey:', error)
        
            // Set user-friendly error message
            if (error.message.includes('not found')) {
                setError('Survey not found. Please check your survey code and try again.')
            } else if (error.name === 'TypeError') {
                setError('Unable to connect to server. Please check your internet connection.')
            } else {
                setError('Unable to load survey. Please try again later.')
            }
        
            // Clear data on error
            setSurveyName('')
            setOrganisation('')
            setFrameworkId('')
        })
        .finally(() => setSurveyLoading(false))
    }, [surveyId])

    // Fetch and filter master questions by frameworkId
    useEffect(() => {
        if (!frameworkId) return;
        setQuestionsLoading(true)
        fetch('https://materiality-assessment-tool.onrender.com/master-question')
        .then(res => res.json())
        .then(data => {
            // Filter by frameworkId
            const filtered = data.filter(q => q.framework === frameworkId)
            setQuestions(filtered)
        })
        .catch(() => setQuestions([]))
        .finally(() => setQuestionsLoading(false))
    }, [frameworkId])

    // Handle respondent form submit
    const handleRespondentSubmit = async e => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)
        // Basic form validation
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
        // Overwrite PII if consent is not given
        let submitForm = { ...form, surveyId }
        if (!form.consentToStorePII) {
            submitForm.firstName = "Anonymous"
            submitForm.lastName = "Anonymous"
            submitForm.emailAddress = "anonymous@anonymous.com"
            submitForm.region = "Anonymous"
        }
        const res = await fetch('https://materiality-assessment-tool.onrender.com/respondent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitForm)
        })
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error || 'Submission failed')
        }
        const data = await res.json()
        setRespondentId(data._id)
        setSuccess('Respondent details submitted!')
        } catch (err) {
        setError(err.message)
        } finally {
        setLoading(false)
        }
    }

    // Handle answer change for each question
    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }))
    }

    // Helper function to parse options string to array
    const parseOptions = (optionsString) => {
        if (!optionsString) return []
        try {
        return JSON.parse(optionsString)
        } catch {
        return optionsString.split(',').map(opt => opt.trim()).filter(opt => opt)
        }
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setForm(f => ({
        ...f,
        [name]: type === 'checkbox' ? checked : value
        }))
    }

    // Handle survey submit
    const handleSurveySubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
        // Submit each answer
        for (const [questionId, answer] of Object.entries(answers)) {
            const responseData = {
            surveyId: surveyId,
            respondentId: respondentId,
            questionId: questionId,
            answer: typeof answer === 'object' ? JSON.stringify(answer) : answer.toString()
            }

            const res = await fetch('https://materiality-assessment-tool.onrender.com/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseData)
            })

        if (!res.ok) {
            throw new Error('Failed to submit response')
        }
        }

        setSurveySubmitted(true)
        } catch {
            setError('There was an error submitting your responses.')
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
            <h1>Materiality Survey</h1>
            <h2>
                {surveyLoading
                ? 'Loading...'
                : `${surveyName}${organisation ? ` by ${organisation}` : ''}`}
            </h2>
            {/* Render respondent form only if respondentId is not set */}
            {!respondentId && (
                <form className="respondent-form" onSubmit={handleRespondentSubmit}>
                <h2>Respondent Details</h2>
                <div className="form-row">
                    <label>First Name:
                    <input name="firstName" type="text" value={form.firstName} onChange={handleChange} required />
                    </label>
                </div>
                <div className="form-row">
                    <label>Last Name:
                    <input name="lastName" type="text" value={form.lastName} onChange={handleChange} required />
                    </label>
                </div>
                <div className="form-row">
                    <label>Email Address:
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
                    <label>Stakeholder Type:</label>
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
                <button type="submit" className="btn btn-primary" disabled={loading || respondentId}>{loading ? 'Submitting...' : respondentId ? 'Details Submitted' : 'Submit Details'}</button>
                </form>
            )}
            {/* Render questions below respondent form only if respondentId exists and survey not yet submitted */}
            {respondentId && !surveySubmitted && (
                <form className="questions-section" onSubmit={handleSurveySubmit}>
                <h2>Survey Questions</h2>
                {questionsLoading ? (
                    <div>Loading questions...</div>
                ) : questions.length === 0 ? (
                    <div>No questions found for this survey.</div>
                ) : (
                    <>
                    {questions.map(q => {
                        const parsedOptions = parseOptions(q.options)
                        switch (q.questionType) {
                        case 'single-choice':
                            return (
                            <SingleChoiceQuestion
                                key={q._id}
                                questionText={q.questionText}
                                options={parsedOptions}
                                value={answers[q._id] || ''}
                                onChange={(value) => handleAnswerChange(q._id, value)}
                            />
                            )
                        case 'matrix-importance':
                        case 'matrix-impact':
                        case 'matrix-performance':
                        case 'matrix':
                            return (
                            <MatrixQuestion
                                questionId={q._id}
                                key={q._id}
                                questionText={q.questionText}
                                options={parsedOptions}
                                value={answers[q._id] || {}}
                                onChange={(topic, val) => {
                                const prev = answers[q._id] || {}
                                handleAnswerChange(q._id, { ...prev, [topic]: val })
                                }}
                                matrixType={q.questionType}
                            />
                            )
                        case 'ranking':
                        case 'ranking-5':
                            return (
                            <RankingQuestion
                                key={q._id}
                                questionText={q.questionText}
                                options={parsedOptions}
                                value={answers[q._id] || []}
                                onChange={(value) => handleAnswerChange(q._id, value)}
                            />
                            )
                        case 'text':
                            return (
                            <TextQuestion
                                key={q._id}
                                questionText={q.questionText}
                                value={answers[q._id] || ''}
                                onChange={(value) => handleAnswerChange(q._id, value)}
                            />
                            )
                        default:
                            return <div key={q._id}>Unsupported question type: {q.questionType}</div>
                        }
                    })}
                    <button type="submit" disabled={loading} className="survey-submit-btn">
                        {loading ? 'Submitting...' : 'Submit Survey'}
                    </button>
                    </>
                )}
                </form>
            )}
            {/* Show thank you message after successful survey submission */}
            {surveySubmitted && (
                <div className="thank-you-message">
                <h2>We greatly appreciate you taking time to respond to this survey.</h2>
                <p>If you gave your consent to be contacted about your responses, we will be in touch.</p>
                <button 
                    className="return-home-btn" 
                    onClick={() => navigate('/')}
                >
                    Return Home
                </button>
                </div>
            )}
            </div>
        </main>
        <HomePageFooter />
        </div>
    )
}

export default Survey