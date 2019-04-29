import React from 'react';
import {Link} from 'react-router-dom';
import './RegistrationPage.css';

export default class RegistrationPage extends React.Component {
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
              <input type="text" name="username" id="username" />
              <label htmlFor="password">New Password:</label>
              <input type="text" name="password" id="password" />
              <label htmlFor="confirm">Confirm New Password:</label>
              <input type="text" name="confirm" id="confirm" />
            </fieldset>
          </form>
        </main>
      </>
    );
  }
}