import React from 'react';
import './LandingPage.css';

export default class LandingPage extends React.Component {
  render() {
    return(
      <main role="main">
        <header role="banner">
          Automated Personal Wiki
        </header>
        <section className="page-content">
          Organize your ideas with a personal wiki. A link will automatically be generated whenever one page mentions the title of another page, eliminating the need to remember to add links manually. Create an account from the navigation bar to get started, or sign in as 'demo-user' with the password 'password1' to view some potential use cases.
        </section>
      </main>
    );
  }
}