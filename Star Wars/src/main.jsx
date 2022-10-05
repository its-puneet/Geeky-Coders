import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import People from './pages/People'
import Species from './pages/Species'
import Vehicle from './pages/Vehicles'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='/people' element={<People />} />
        <Route path='/species' element={<Species />} />
        <Route path='/vehicles' element={<Vehicle />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </Router>
)
