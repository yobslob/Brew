import React, { useState } from 'react';
import './home.css';
import bgImage from './assets/bg3.jpg';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const MediumClone = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <div>
            <header>
                <div className="logo">BREW</div>
                <nav>
                    <ul>
                        <li><a onClick={openRegisterModal}>About</a></li>
                        <li><a onClick={openRegisterModal}>Pricing</a></li>
                        <li><a onClick={openModal}>Write</a></li>
                        <li><a onClick={openModal}>Sign In</a></li>
                        <li><a className="register" onClick={openRegisterModal}>Register</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="hero">
                    <div className="text">
                        <h1>Human<br />stories & ideas</h1>
                        <p>Discover stories, thinking, and expertise from writers on any topic.</p>
                        <a className="button" onClick={openRegisterModal}>Start reading</a>
                    </div>
                    <div className="image">
                        <img src={bgImage} alt="Reference image" />
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 Brew. All rights reserved.</p>
            </footer>

            {isRegisterModalOpen && <RegisterModal closeModal={closeRegisterModal} />}
            {isModalOpen && <LoginModal closeModal={closeModal} />}
        </div>
    );
};

export default MediumClone;
