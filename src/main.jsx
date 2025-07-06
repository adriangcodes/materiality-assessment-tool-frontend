// Entry point of the React application

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './styles/index.css'

import Home from './pages/Home.jsx'
import Survey from './pages/Survey.jsx'

// Define App routes
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

// Mount App into the DOM using the div with id="root" (as defined in index.html)
createRoot(document.getElementById('root')).render(
  <App />
)