import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import '../styles/Login.css'; // Reuse the same styles

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8040/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok && data.token) {
                setTimeout(() => {
                    dispatch(login(data.token));
                }, 1500);
            }

        } catch (error) {
            setMessage('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);

    return (
        <div className="login-container">
            <h2 className="login-title">Register</h2>
            <form onSubmit={handleRegister} className="login-form">
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {/* Optional message display */}
            {message && <p className="message-text">{message}</p>}
        </div>
    );

};

export default Register;
