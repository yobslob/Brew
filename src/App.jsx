import React, { useEffect, useState } from 'react';
import Header from './header.jsx';
import MainContent from './MainContent.jsx';
import Sidebar from './Sidebar.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Fetched User:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  return (
    <div className="app">
      <Header user={user} />

      <div className="content-wrapper">
        <MainContent user={user} />
        <Sidebar user={user} />
      </div>
    </div>
  );
}

export default App;
