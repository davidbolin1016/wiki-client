import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import SignIn from '../SignIn/SignIn';

function App() {
  return (
    <>
      <Route exact path={'/'} component={LandingPage} />
      <Route path={'/register'} component={RegistrationPage} />
      <Route path={'/login'} component={SignIn} /> 
    </>
  );
}

export default App;