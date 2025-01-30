import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents'; 


const App = () => {
  const userId = 1;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents userId={userId} />} />
      </Routes>
    </Router>
  );
};

export default App;
