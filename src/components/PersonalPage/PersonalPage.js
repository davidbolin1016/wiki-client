import React from 'react';
import { Link } from 'react-router-dom'; 
import './PersonalPage.css';

export default class PersonalPage extends React.Component {
  
  state = {
    title: '',
    content: ''
  }

  componentDidMount() {
    fetch()
  }

  render() {
    return(
      <>
        <nav role="navigation">
          <Link to="/logout">Log out</Link>
        </nav>
        <main role="main">
          <header role="banner">
            Personal Home Page
          </header>
          <section>
            Personal text will go here.
          </section>
        </main>
      </>
    );
  }
}