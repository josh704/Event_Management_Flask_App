// src/pages/Home.js
import React from 'react';
import EventList from '../components/EventList';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Event List</h1>
      <EventList />
    </div>
  );
};

export default Home;
