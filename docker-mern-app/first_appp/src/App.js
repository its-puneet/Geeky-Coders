import react, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './login';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/home' element={<Home />}></Route>
        {/* <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
