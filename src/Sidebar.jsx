// Sidebar.jsx

import React from 'react';
import './Sidebar.css'; // You can style this separately

function Sidebar() {
    return (
        <aside className="sidebar">
            <section className="recommended-section">
                <h3>Recommended for you</h3>
                <ul>
                    <li><a>React vs Angular: Which One to Choose?</a></li>
                    <li><a>How to Improve Your CSS Skills</a></li>
                    <li><a>Building Scalable Web Apps</a></li>
                </ul>
            </section>

        </aside>
    );
}

export default Sidebar;
