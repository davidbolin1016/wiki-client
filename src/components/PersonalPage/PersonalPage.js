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

    //structure will be ...text...<IntLink ##>...text...<IntLink />...text

    const dividedContent = this.state.content.split('<IntLink ');
    let content = [
      <Link to={`/edit/${pageId}`}>
        {dividedContent[0]}
      </Link>
    ];

    //text, ##>text, />text , ##>text, />text etc

    for (let i = 1; i < dividedContent.length; i = i + 2) {
      const linkedPageId = dividedContent[i].split('>')[0];
      const linkText = dividedContent[i].slice(linkedPageId.length + 1)
    
      const postText = dividedContent[i + 1].slice(2)
      
      content.push(
        <Link className="int-link" to={`/pages/${linkedPageId}`}>
          {linkText}
        </Link>,
        <Link to={`/edit/${pageId}`}>
          {postText}
        </Link>
      );  
    }

    return(
      <>
        <main role="main">
          <header role="banner">
            <Link to={`/edit/${pageId}`}>
              {this.state.title}
            </Link> 
          </header>
          <section>
              {content}
          </section>
        </main>
      </>
    );
  }
}