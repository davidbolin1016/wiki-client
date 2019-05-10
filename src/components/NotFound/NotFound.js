import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../user-context/UserContext';

export default class NotFound extends React.Component {

  static contextType = UserContext;

  render() {
    return (
      <main role="main">
        <header role="banner">
          <Link to={`${this.context.homepage}`}>
            Page Not Found
          </Link>
        </header>
      </main>
    );
  }
}