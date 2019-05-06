import React from 'react';
import './NavBar.css';
import UserContext from '../../user-context/UserContext';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  static contextType = UserContext;

  render() {
    let navDiv = (
      <>
         <Link to="/register">Create Account</Link>
         <Link to="/login">Sign In</Link>
        </>
    );

    if (this.context.homepage !== '/') {
      navDiv = (
        <>
          <Link to="/logout">Log Out</Link>
          <Link to="/newpage">New Page</Link>
          <Link to="/list">Page List</Link>
        </>
      );
    } 
    return (
      <nav role="navigation">
        <div>
          <Link to={"/"}>Automated Personal Wiki</Link>
        </div>
        <Link to={this.context.homepage}>Home Page</Link>
        {navDiv}
      </nav>
    );
  }
}

