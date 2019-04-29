import React from 'react';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return(
      <>
        <nav role="navigation">
          <a href="#">Create Account</a>
          <a href="#">Sign In</a>
        </nav>
        <main role="main">
          <header role="banner">
            <h1>Automated Personal Wiki</h1>
          </header>
          <section>
            Organize your ideas with a personal wiki. By default, a page will automatically be linked when other pages contain references to the name of the page, eliminating the need to remember to add each individual link.
          </section>
        </main>
      </>
    );
  }
}