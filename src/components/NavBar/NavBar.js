import React from 'react';
import './NavBar.css';
import UserContext from '../../user-context/UserContext';
import { Link } from 'react-router-dom';
import Emoji from '../Emoji/Emoji';

export default class NavBar extends React.Component {
  static contextType = UserContext;

  render() {
    let navDiv = [
      <li className="nav-li">
        <Link to="/register">
          <Emoji symbol="🔨" />Create Account
        </Link>
      </li>,
      <li className="nav-li">
        <Link to="/login">
          <Emoji symbol="🔑" />Sign In
        </Link>
      </li>
    ];

    if (this.context.homepage !== '/') {
      navDiv = [
          <li className="nav-li">
            <Link to="/newpage">
              <Emoji symbol="🆕" />New Page
            </Link>
          </li>,
          <li className="nav-li">
            <Link to="/list">
              <Emoji symbol="📖" />All Pages
            </Link>
          </li>,
          <li className="nav-li">
            <Link to="/logout">
              <Emoji symbol="🚪" />Logout
            </Link>
          </li>,
      ];
    } 
    return (
      <nav role="navigation">
        <ul className="controls">
          <li>
            <strong>
              <Link to={"/"}>Automated Personal Wiki</Link>
            </strong>
          </li>
        <li className="nav-li">
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

