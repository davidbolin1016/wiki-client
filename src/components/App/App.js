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
import EditPage from '../EditPage/EditPage';
import NavBar from '../NavBar/NavBar';
import UserContext from '../../user-context/UserContext';

class App extends React.Component {

  state = {
    homepage: '/',
    username: null
  }

  setUser = (homepage, username) => {
    this.setState({
      homepage, username
    });
  }
  
  render() {
    return (
      <UserContext.Provider value={{
        homepage: this.state.homepage,
        username: this.state.username,
        setUser: this.setUser
      }}>
        <NavBar />
        <Route exact path={'/'} component={LandingPage} />
        <Route path={'/register'} component={RegistrationPage} />
        <Route path={'/login'} component ={SignIn} /> 
        <Route path={'/pages/:page'} component={PersonalPage} />
        <Route path={'/logout'} component={LogOut} />
        <Route path={'/newpage'} component={NewPage} />
        <Route path={'/list'} component={ListPage} />
        <Route path={'/edit/:page'} component={EditPage} />
      </UserContext.Provider>
    );
  }
}

export default App;