import React from 'react';
import './PersonalPage.css';
import PageApiService from '../../services/page-api-service';
import { Link } from 'react-router-dom';
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

  componentWillReceiveProps(newProps) {
    const pageId = newProps.match.params.page;
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
    const pageId = this.props.match.params.page;

    return(
      <>
        <main role="main">
          <header role="banner">
            <Link to={`/edit/${pageId}`}>
              {this.state.title}
            </Link> 
          </header>
          <section>
            <Link to={`/edit/${pageId}`}>
              {this.state.content}
            </Link>  
          </section>
        </main>
      </>
    );
  }
}