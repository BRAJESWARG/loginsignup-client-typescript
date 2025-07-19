import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { AppDispatch } from '../store';
import Modal from './UI/Modal';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
            const response = await fetch(`${apiUrl}/login`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            setMessage(data.message || 'Unexpected response');
            setShowModal(true);

            if (response.ok && data.token) {
                // Delay to show modal before switching screen
                setTimeout(() => {
                    dispatch(login(data.token));
                }, 2000);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setMessage('Something went wrong. Please try again.');
            setShowModal(true);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            <Modal
                title="Login Status"
                message={message}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default Login;
