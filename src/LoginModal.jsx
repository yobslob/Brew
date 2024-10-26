import React, { useState } from 'react';
import './LoginModal.css';
import { useNavigate } from 'react-router-dom';

function LoginModal({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const userToStore = {
          email: data.user.email,
          name: data.user.name,
        };

        localStorage.setItem('user', JSON.stringify(userToStore));
        console.log("Logged-in User:", userToStore);
        closeModal();
        navigate('/app');
      } else if (response.status === 401) {
        setEmailError(false);
        setPasswordError(true);
      } else if (response.status === 404) {
        setPasswordError(false);
        setEmailError(true);
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred during login.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2 className="heading">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className='invEmail'>User does not exist.</p>}
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className='invPass'>Invalid Password.</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
