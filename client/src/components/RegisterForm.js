// src/components/RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = ({ eventId, userId }) => {
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, event_id: eventId }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage('Error registering for event'));
  };

  return (
    <div>
      <button onClick={handleRegister}>Register for Event</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
