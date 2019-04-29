import React from 'react';
import {Link} from 'react-router-dom';
import './RegistrationPage.css';

export default class RegistrationPage extends React.Component {
  
  state = {
    username: '',
    password: '',
    confirm: '',
    error: ''
  }

  changeFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, confirm } = this.state;
    if (password !== confirm) {
      this.setState({
        error: 'Password must match confirmation'
      });
    } else {
      this.setState({ error: null });
      AuthApiService.addUser({username, password})
      .then(user => {
        this.setState({
          
        });
      })
      .catch(res => {
        this.setState({ error: res.error });
      })
    }
  };
  
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
              <button onClick={event => this.handleSubmit(event)}>Submit</button>
            </fieldset>
          </form>
          <section className="error-message">
            {this.state.error}
          </section>
        </main>
      </>
    );
  }
}