import React from 'react';
import './NotificationTab.css';

function NotificationTab() {
    return (
        <div>
            <div className="notification-tab">
                <div className="notification-tab-content">
                    <div className="notification-icon">
                        <i className="icon-notification"></i>
                    </div>
                    <div className="notification-message">
                        You're all caught up.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationTab;
