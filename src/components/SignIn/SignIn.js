import React from 'react';
import './SignIn.css';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import UserContext from '../../user-context/UserContext';

export default class SignIn extends React.Component {

  state = {
    username: '',
    password: '',
    error: ''
  }

  static contextType = UserContext;

  changeFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: '' });
    const { username, password } = this.state;
    AuthApiService.postLogin({
        username: username,
        password: password
      })
        .then(res => {
          TokenService.saveAuthToken(res.authToken);
          const home_page_id = res.homepage;
          this.context.setUser(`/pages/${home_page_id}`, username);
          this.props.history.push(`/pages/${home_page_id}`);
        })
        .catch(res => {
          this.setState({ error: res.error});
        });
    }
  
  render() {
    return(
        <main role="main">
          <header role="banner">
            Automated Personal Wiki
          </header>
          <form>
            <fieldset>
              <legend>Sign In</legend>
              <label htmlFor="username">Username:</label>
              <input autoComplete="username" type="text" name="username" id="username" onChange={event => this.changeFields(event)} />
              <label htmlFor="password">Password:</label>
              <input autoComplete="current-password" type="password" name="password" id="password" onChange={event => this.changeFields(event)} />
              <button className="login-button" onClick={event => this.handleSubmit(event)}>Submit</button>
            </fieldset>
          </form>
          <section className="error-message">
            {this.state.error}
          </section>
        </main>
    );
  }
}