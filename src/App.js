import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import New from './pages/New';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import Attendance from './pages/Attendance';
import "./App.css" ;

function App() {

  return (
    <div className='home'>
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/new" element={<New />} />
      <Route exact path="/attendance" element={<Attendance />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
