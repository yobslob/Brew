import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import brewLogo from './assets/brew.png';
import profileIcon from './assets/pfp.jpg';
import notificationIcon from './assets/notif.jpg';
import ProfileMenu from './ProfileMenu.jsx';
import NotificationTab from './NotificationTab.jsx';
import { faker } from '@faker-js/faker';

function Header({ user }) {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const toggleNotificationTab = () => {
        setIsNotificationTabOpen(!isNotificationTabOpen);
    };

    const handleWriteButtonClick = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const authorName = parsedUser.name;

            if (authorName) {
                window.location.href = `http://localhost:3000/write?author=${encodeURIComponent(authorName)}`;
            } else {
                alert("Author name not found! Please log in again.");
            }
        } else {
            alert("User not found! Please log in again.");
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            const fakeSuggestions = Array.from({ length: 5 }, () => faker.lorem.words(2));
            setSuggestions(fakeSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
    };

    return (
        <header className="medium-header">
            <div className="header-container">
                <div className="logo">
                    <a href="/app">
                        <img src={brewLogo} alt="Brew Logo" className="medium-logo" />
                    </a>
                </div>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="⌕ Search Brew"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="header-right">
                    <button className="write-button" onClick={handleWriteButtonClick}>🖉 Write</button>
                    <button className="notifications-button" onClick={toggleNotificationTab}>
                        <img src={notificationIcon} alt="Notifications" className="notifications-icon" />
                    </button>
                    <button className="profile-button" onClick={toggleProfileMenu}>
                        <img src={profileIcon} alt="Profile" className="profile-icon" />
                    </button>
                </div>
            </div>
            {isProfileMenuOpen && <ProfileMenu user={user} />}
            {isNotificationTabOpen && <NotificationTab user={user} />}
        </header>
    );
}

export default Header;
