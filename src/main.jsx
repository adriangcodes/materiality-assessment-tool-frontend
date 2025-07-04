import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Home from './pages/Home.jsx'
import Survey from './pages/Survey.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey/:id" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

createRoot(document.getElementById('root')).render(
  <App />
)