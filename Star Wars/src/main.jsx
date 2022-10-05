import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import People from './pages/People'
// import Planets from './pages/Planets'
// import Starships from './pages/Starships'
// import Films from './pages/Films'
// import Species from './pages/Species'
// import Vehicles from './pages/Vehicles'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='/people' element={<People />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </Router>
)
