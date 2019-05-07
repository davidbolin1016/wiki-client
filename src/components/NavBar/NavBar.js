import React from 'react';
import './NavBar.css';
import UserContext from '../../user-context/UserContext';
import { Link } from 'react-router-dom';
import Emoji from '../Emoji/Emoji';

export default class NavBar extends React.Component {
  static contextType = UserContext;

  render() {
    let navDiv = [
      <li>
        <Link to="/register">
          <Emoji symbol="🔨" />Create Account
        </Link>
      </li>,
      <li>
        <Link to="/login">
          <Emoji symbol="🔑" />Sign In
        </Link>
      </li>
    ];

    if (this.context.homepage !== '/') {
      navDiv = [
          <li>
            <Link to="/newpage">
              <Emoji symbol="🆕" />New Page
            </Link>
          </li>,
          <li>
            <Link to="/list">
              <Emoji symbol="📖" />All Pages
            </Link>
          </li>,
          <li>
            <Link to="/logout">
              <Emoji symbol="🚪" />Logout
            </Link>
          </li>,
      ];
    } 
    return (
      <nav role="navigation">
        <div className="controls1">
          <strong>
            <Link to={"/"}>Automated Personal Wiki</Link>
          </strong>
        </div>
        <ul className="controls2">
        <li>
          <Link to={this.context.homepage}>
            <Emoji symbol="🏠" />Home
          </Link>
        </li>
        {navDiv}
        </ul>
      </nav>
    );
  }
}

