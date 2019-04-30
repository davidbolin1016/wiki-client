import React from 'react';
import TokenService from '../../services/token-service';

export default class LogOut extends React.Component {
  
  componentDidMount() {
    TokenService.clearAuthToken();
    this.props.history.push('/');
  }
  
  render() {
    return <div></div>;
  }
}