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
          <Emoji label="Create Account" symbol="🔨" /><span className="hide-too-small">Create Account</span>
        </Link>
      </li>,
      <li className="nav-li">
        <Link to="/login">
          <Emoji label="Sign In" symbol="🔑" /><span className="hide-too-small">Sign In</span>
        </Link>
      </li>
    ];

    if (this.context.homepage !== '/') {
      navDiv = [
          <li className="nav-li">
            <Link to="/newpage">
              <Emoji label="New Page" symbol="🆕" /><span className="hide-too-small">New Page</span>
            </Link>
          </li>,
          <li className="nav-li">
            <Link to="/list">
              <Emoji label="All Pages" symbol="📖" /><span className="hide-too-small">All Pages</span>
            </Link>
          </li>,
          <li className="nav-li">
            <Link to="/logout">
              <Emoji label="Logout" symbol="🚪" /><span className="hide-too-small">Logout</span>
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
            <Emoji label="Home Page" symbol="🏠" /><span className="hide-too-small">Home</span>
          </Link>
        </li>
        {navDiv}
        </ul>
      </nav>
    );
  }
}

