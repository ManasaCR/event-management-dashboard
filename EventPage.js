import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', location: '', date: '' });

  const fetchEvents = async () => {
    const response = await axios.get('http://localhost:5000/api/events');
    setEvents(response.data);
  };

  const createEvent = async () => {
    await axios.post('http://localhost:5000/api/events', newEvent);
    fetchEvents();
    setNewEvent({ name: '', description: '', location: '', date: '' });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Manage Events</h2>
      <input placeholder="Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
      <input placeholder="Location" onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
      <input type="date" onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
      <button onClick={createEvent}>Add Event</button>
      <div>
        {events.map((event) => (
          <div key={event._id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
