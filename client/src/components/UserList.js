import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.on('update-user-list', (users) => {
      setUserList(users);
    });

    return () => {
      socket.off('update-user-list');
    };
  }, []);

  const handleSetUsername = () => {
    if (username) {
      console.log(`Emitindo nome de usuário: ${username}`)
      socket.emit('set-username', username);
    }
  };

  return (
    <div>
      <h1>Usuários Conectados</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite seu nome"
      />
      <button onClick={handleSetUsername}>Entrar</button>
      <ul>
        {userList.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
