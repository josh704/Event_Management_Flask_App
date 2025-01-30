// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create Event</Link></li>
        <li><Link to="/my-events">My Events</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
