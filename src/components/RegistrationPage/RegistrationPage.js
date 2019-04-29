import React from 'react';
import {Link} from 'react-router-dom';
import './RegistrationPage.css';

export default class RegistrationPage extends React.Component {
  
  state = {
    username: '',
    password: '',
    confirm: ''
  }

  changeFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    return(
      <>
        <nav role="navigation">
          <Link to="/">Home</Link>
        </nav>
        <main role="main">
          <header role="banner">
            Automated Personal Wiki
          </header>
          <form>
            <fieldset>
              <legend>Create New Account</legend>
              <label htmlFor="username">New Username:</label>
              <input type="text" name="username" id="username" onChange={event => this.changeFields(event)} />
              <label htmlFor="password">New Password:</label>
              <input type="text" name="password" id="password" onChange={event => this.changeFields(event)} />
              <label htmlFor="confirm">Confirm New Password:</label>
              <input type="text" name="confirm" id="confirm" onChange={event => this.changeFields(event)} />
            </fieldset>
          </form>
        </main>
      </>
    );
  }
}