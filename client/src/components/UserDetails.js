import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, [userId]);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetails;
