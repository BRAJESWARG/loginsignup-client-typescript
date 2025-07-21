import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { AppDispatch } from '../store';
import Modal from './UI/Modal';
import '../styles/Login.css';
import { loginUser } from '../services/api';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await loginUser(username, password);
            setMessage(data.message || 'Login successful');
            setShowModal(true);
            const token = data.token;
            if (typeof token === 'string') {
                setTimeout(() => {
                    dispatch(login(token));
                }, 2000);
            }
            // if (data.token) {
            //     setTimeout(() => {
            //         dispatch(login(data.token));
            //     }, 2000);
            // }
        } catch (error: any) {
            setMessage(error.message || 'Something went wrong');
            setShowModal(true);
        } finally {
            setLoading(false);
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
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