import React from 'react';
import './App.css';
import Login from './components/Login';
import About from './components/About';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className="app-container">
      {!isLoggedIn ? <Login /> : <About />}
    </div>
  );
};

export default App;
