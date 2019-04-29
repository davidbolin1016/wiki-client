import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';
import RegistrationPage from '../RegistrationPage/RegistrationPage';

function App() {
  return (
    <>
      <LandingPage exact path={'/'} />
      <RegistrationPage path={'/register'} />
    </>
  );
}

export default App;