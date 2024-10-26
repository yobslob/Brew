import React from 'react';
import './ProfileMenu.css'; // Import the CSS for the modal

function ProfileMenu({ user }) {
    const handleSignOutButtonClick = () => {
        localStorage.removeItem('user');
        window.location.href = 'http://localhost:5173';
    };
    return (
        <div>
            {/* Modal */}
            <div className="profile-modal">
                <div className="profile-modal-content">
                    {/* Profile menu items */}
                    <div className="menu-section">
                        <div className="menu-item">
                            <i className="icon-profile"></i>👤 Profile
                        </div>
                        <div className="menu-item">
                            <i className="icon-library"></i>🔖 Library
                        </div>
                        <div className="menu-item">
                            <i className="icon-stories"></i>📖 Stories
                        </div>
                        <div className="menu-item">
                            <i className="icon-stats"></i>📊 Stats
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Settings, Help */}
                    <div className="menu-section">
                        <div className="menu-item">Settings</div>
                        <div className="menu-item">Refine recommendations</div>
                        <div className="menu-item">Manage publications</div>
                        <div className="menu-item">Help</div>
                    </div>

                    <div className="divider"></div>

                    {/* Membership section */}
                    <div className="menu-section">
                        <div className="menu-item">Become a Brew member</div>
                        <div className="menu-item">Create a Mastodon account</div>
                        <div className="menu-item">Apply for author verification</div>
                    </div>

                    <div className="divider"></div>

                    {/* Sign out section */}
                    <div className="menu-section">
                        <div className="menu-item" onClick={handleSignOutButtonClick}>Sign out (Only this button Works)</div>
                        {user && ( // Check if user is defined before displaying email
                            <div className="menu-item">{user.email}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileMenu;
