import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import SignIn from '../SignIn/SignIn';
import PersonalPage from '../PersonalPage/PersonalPage';
import LogOut from '../LogOut/LogOut';
import NewPage from '../NewPage/NewPage';
import ListPage from '../ListPage/ListPage';

class App extends React.Component {
  
  render() {
    return (
      <>
        <Route exact path={'/'} component={LandingPage} />
        <Route path={'/register'} component={RegistrationPage} />
        <Route path={'/login'} component ={SignIn} /> 
        <Route path={'/pages/:page'} component={PersonalPage} />
        <Route path={'/logout'} component={LogOut} />
        <Route path={'/newpage'} component={NewPage} />
        <Route path={'/list'} component={ListPage} />
      </>
    );
  }
}

export default App;