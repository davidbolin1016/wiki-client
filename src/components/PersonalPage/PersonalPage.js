import React from 'react';
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