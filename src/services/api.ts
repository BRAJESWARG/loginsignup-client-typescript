import { AuthResponse } from '../types/auth';

export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8040';


    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
};