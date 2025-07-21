import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [showRegister, setShowRegister] = useState(false);

  if (isLoggedIn) return <About />;

  return (
    <div className="app-container">
      {showRegister ? <Register /> : <Login />}
      <p style={{ textAlign: 'center' }}>
        {showRegister ? (
          <span>Already have an account? <button onClick={() => setShowRegister(false)}>Login</button></span>
        ) : (
          <span>Don't have an account? <button onClick={() => setShowRegister(true)}>Register</button></span>
        )}
      </p>
    </div>
  );
};

export default App;
