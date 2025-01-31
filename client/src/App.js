// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';  // Ensure this import is correct
import MyEvents from './pages/MyEvents';
import UserDetails from './components/UserDetails';
import UserList from './components/UserList';
import RegisterUser from './components/RegisterUser'; 

const App = () => {
  const [userId] = useState(1);  // Or simply remove this line if it's not needed at all

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />  {/* Ensure this route is correctly linked */}
        <Route path="/my-events" element={<MyEvents userId={userId} />} />
        <Route path="/user/:userId" element={<UserDetails />} />  
        <Route path="/users" element={<UserList />} />  
        <Route path="/register" element={<RegisterUser />} /> 
      </Routes>
    </Router>
  );
};

export default App;
