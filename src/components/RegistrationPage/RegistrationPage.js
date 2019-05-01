import React from 'react';
import {Link} from 'react-router-dom';
import './RegistrationPage.css';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../user-context/UserContext';
import TokenService from '../../services/token-service';

export default class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirm: '',
      error: ''
    }
  }

  _isMounted = false;

  static contextType = UserContext;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  changeFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const history = this.props.history;
    const { username, password, confirm } = this.state;
    if (password !== confirm) {
      this.setState({
        error: 'Password must match confirmation'
      });
    } else {
      if (this._isMounted) {
        this.setState({ error: null });
      }
      
      AuthApiService.addUser({
        username: username,
        password: password
      })
      .then(user => {
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
      })
      .catch(res => {
        if (this._isMounted) {
          this.setState({ error: res.error });
        }
      })
      history.push(this.context.homepage);
    }
  };
  
  render() {
    return(
      <>
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