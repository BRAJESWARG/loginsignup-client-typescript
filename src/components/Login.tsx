import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    // useEffect(() =>{
    //     console.log(message);
    // })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message);
        // console.log(data.message);
        // console.log(message);
        
        

        if (response.ok && data.token) {
            dispatch(login(data.token));            
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={(e)=>handleLogin(e)} className="login-form">
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
            {message && <p className="message-text">{message}</p>}
        </div>
    );
};

export default Login;
