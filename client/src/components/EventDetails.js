import React, { useState } from 'react';

const EventDetails = ({ event, userId }) => {
  const [message, setMessage] = useState('');
  
  const handleRegister = () => {
    fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        event_id: event.id
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setMessage(data.message); 
      } else if (data.error) {
        setMessage(data.error);
      }
    })
    .catch(error => setMessage('Error registering for event.'));
  };

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>

      {/* Register button */}
      <button onClick={handleRegister}>Register for Event</button>

      {/* Message display */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default EventDetails;
