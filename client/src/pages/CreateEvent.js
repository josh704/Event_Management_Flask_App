// src/pages/CreateEvent.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';

const CreateEvent = () => {
  const [event, setEvent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventId');

  useEffect(() => {
    if (eventId) {
      fetch(`http://127.0.0.1:5000/event/${eventId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Event not found');
          }
          return response.json();
        })
        .then((data) => {
          setEvent(data);
        })
        .catch((err) => {
          console.error('Error fetching event details:', err);
          alert('Error fetching event details: ' + err.message);
        });
    }
  }, [eventId]);

  const handleSubmit = (values) => {
    const url = eventId
      ? `http://127.0.0.1:5000/event/${eventId}`
      : 'http://127.0.0.1:5000/events';
    const method = eventId ? 'PATCH' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Failed to save event: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Event saved successfully!');
        navigate('/');
      })
      .catch((err) => {
        alert('Error saving event: ' + err.message);
      });
  };

  return (
    <div className="create-event-container">
      <h1>{eventId ? 'Update Event' : 'Create Event'}</h1>
      <div className="event-form-container">
        {event && <EventForm onSubmit={handleSubmit} initialValues={event} />}
        {!event && !eventId && <EventForm onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default CreateEvent;
