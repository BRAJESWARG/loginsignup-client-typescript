import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './About.css';

const About: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="about-wrapper">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="about-section">
                <h2>About Section</h2>
                <p>Welcome! You are now logged in. This is the protected About section of the site.</p>
            </div>
        </div>
    );
};

export default About;