import React from 'react';
import { Link } from 'react-router-dom'; 
import './PersonalPage.css';
import PageApiService from '../../services/page-api-service';

export default class PersonalPage extends React.Component {
  
  state = {
    title: '',
    content: ''
  }

  componentDidMount() {
    const pageId = this.props.match.params.page;
    PageApiService.getPage(pageId)
      .then(page => {
        const { page_name, page_content } = page[0];
        this.setState({
          title: page_name,
          content: page_content
        });
      });
  }

  render() {
    return(
      <>
        <nav role="navigation">
          <Link to="/logout">Log out</Link>
          <Link to="/newpage">New Page</Link>
          <Link to="/list">Page List</Link>
        </nav>
        <main role="main">
          <header role="banner">
            {this.state.title}
          </header>
          <section>
            {this.state.content}
          </section>
        </main>
      </>
    );
  }
}