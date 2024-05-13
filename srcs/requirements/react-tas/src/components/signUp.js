import React, { useState } from 'react';
import '../App.css';

function SignUp({ onSignUp }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, confirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignUp({ name, username, password });
  };

  return (
    <form onSubmit={handleSubmit} className='formular'>
      <label>
        Nom:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Nom d'utilisateur:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        MDP:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        confirmation MDP:
        <input type="confirmation" value={confirmation} onChange={e => confirmPassword(e.target.value)} />
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default SignUp;
