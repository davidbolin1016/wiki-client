import React from 'react';
import TokenService from '../../services/token-service';
import UserContext from '../../user-context/UserContext';

export default class LogOut extends React.Component {
  
  static contextType = UserContext;

  componentDidMount() {
    TokenService.clearAuthToken();
    this.context.setUser('/', null)
    this.props.history.push('/');
  }
  
  render() {
    // this component simply redirects to landing page so no need to return any content
    return <div></div>;
  }
}