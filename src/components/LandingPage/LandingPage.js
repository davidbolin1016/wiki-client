import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return(
      <>
        <nav role="navigation">
          <Link to="/register">Create Account</Link>
          <a href="#">Sign In</a>
        </nav>
        <main role="main">
          <header role="banner">
            Automated Personal Wiki
          </header>
          <section>
            Organize your ideas with a personal wiki. By default, a page will automatically be linked when other pages contain references to the name of the page, eliminating the need to remember to add each individual link.
          </section>
        </main>
      </>
    );
  }
}