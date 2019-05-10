import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
import NotFound from '../NotFound/NotFound';
import UserContext from '../../user-context/UserContext';
import AuthApiService from '../../services/auth-api-service';

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
  
  componentDidMount() {
    // ensure that if we have a jwt we also have username and homepage
    AuthApiService.whoamI()
      .then(user => {
        if (this.state.username !== user.username) {
          this.setState({
            homepage: `/pages/${user.home_page_id}`,
            username: user.username
          });
        }
      })
  }

  render() {
    return (
      <UserContext.Provider value={{
        homepage: this.state.homepage,
        username: this.state.username,
        setUser: this.setUser
      }}>
        <NavBar />
        <Switch>
          <Route exact path={'/'} component={LandingPage} />
          <Route path={'/register'} component={RegistrationPage} />
          <Route path={'/login'} component ={SignIn} /> 
          <Route path={'/pages/:page'} component={PersonalPage} />
          <Route path={'/logout'} component={LogOut} />
          <Route path={'/newpage'} component={NewPage} />
          <Route path={'/list'} component={ListPage} />
          <Route path={'/edit/:page'} component={EditPage} />
          <Route path="*" component={NotFound} />
        </Switch>        
      </UserContext.Provider>
    );
  }
}

export default App;