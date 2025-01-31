import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events. Please try again later.');
        setLoading(false);
      });
  }, []);

  function handleDelete(eventId) {
    if (window.confirm('Are you sure you want to delete this event?')) {
      fetch(`http://127.0.0.1:5000/event/${eventId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || 'Failed to delete event');
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === 'Event deleted successfully!') {
            setEvents(events.filter((event) => event.id !== eventId));
            alert('Event deleted successfully!');
          }
        })
        .catch((err) => {
          alert('Error deleting event: ' + err.message);
        });
    }
  }

  return (
    <div className="home-container">
      <h1>All Events</h1>
      
      {/* Display loading message */}
      {loading && <p>Loading events...</p>}

      {/* Display error message */}
      {error && <p>{error}</p>}

      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <h3 className="event-title">
              <Link to={`/events/${event.id}`}>{event.name}</Link>
            </h3>
            <p className="event-description">{event.description}</p>
            <p className="event-details">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="event-details">
              <strong>Location:</strong> {event.location}
            </p>
            <div className="event-actions">
              <button onClick={() => navigate(`/create?eventId=${event.id}`)}>Update</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
