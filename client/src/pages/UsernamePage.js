import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './styles.css'

const socket = io('http://localhost:3001');

const UsernamePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSetUsername = () => {
    if (username) {
      socket.emit('set-username', username);
      navigate('/audioplayer', { state: { username } });
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>INSIRA SEU NOME</h1>
      <input
        className='username'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Exemplo da silva"
      />
      <button className='send' onClick={handleSetUsername}>Enter</button>
    </div>
  );
};

export default UsernamePage;
