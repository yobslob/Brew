import React, { useState } from 'react';
import './RegisterModal.css'; // You can use the same CSS file
import { useNavigate } from 'react-router-dom';

function RegisterModal({ closeModal }) {
    const [registeredUser, setRegisteredUser] = useState(null);
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Construct the registration data
        const userData = {
            name,
            email,
            password
        };

        try {
            // Send a POST request to the backend
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Handle successful registration
                const data = await response.json();
                setRegisteredUser(data.user); // Update the state with user data

                // Save the registered user to localStorage immediately after receiving it
                localStorage.setItem('user', JSON.stringify(data.user)); // Use data.user instead
                console.log("Registered User:", data.user); // Log the stored user for verification

                closeModal(); // Close the modal after submission
                navigate('/app');
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            alert('An error occurred during registration.');
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2 className="heading">New to Brew?</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Name' id="name" name="name" required />
                    <input type="email" placeholder='Email' id="email" name="email" required />
                    <input type="password" placeholder='Password' id="password" name="password" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterModal;
