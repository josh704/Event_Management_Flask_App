// src/pages/MyEvents.js
import React, { useState, useEffect } from 'react';

const MyEvents = ({ userId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/${userId}/events`)
      .then(response => response.json())
      .then(data => setEvents(data));
  }, [userId]);

  return (
    <div className="my-events-container">
      <h1>My Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
