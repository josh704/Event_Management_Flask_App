import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';

const CreateEvent = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventId'); 

  useEffect(() => {
    if (eventId) {
      setLoading(true);
      fetch(`http://127.0.0.1:5000/event/${eventId}`) 
        .then((response) => {
          if (!response.ok) {
            throw new Error('Event not found');
          }
          return response.json();
        })
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching event details:', err);
          setLoading(false);
          alert('Error fetching event details: ' + err.message); 
        });
    }
  }, [eventId]); 

  const handleSubmit = (values) => {
    const url = eventId
      ? `http://127.0.0.1:5000/event/${eventId}`
      : 'http://127.0.0.1:5000/events';
    const method = eventId ? 'PATCH' : 'POST';
  
    setLoading(true);
  
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
        setLoading(false);
        console.error('Error saving event:', err);
        alert('Error saving event: ' + err.message);
      });
  };

  return (
    <div className="create-event-container">
      <h1>{eventId ? 'Update Event' : 'Create Event'}</h1>
      <div className="event-form-container">
        {event && (
          <EventForm
            onSubmit={handleSubmit}
            initialValues={event} 
          />
        )}
        {!event && !eventId && <EventForm onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default CreateEvent;
