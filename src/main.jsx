import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Home from './pages/Home.jsx'
import Survey from './pages/Survey.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <HomePage />
//   </StrictMode>,
// )

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey/:id" element={<SurveyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
