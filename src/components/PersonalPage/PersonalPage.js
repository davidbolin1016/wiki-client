import React from 'react';
import './PersonalPage.css';
import PageApiService from '../../services/page-api-service';
import { Link } from 'react-router-dom';
import UserContext from '../../user-context/UserContext';

export default class PersonalPage extends React.Component {
  
  state = {
    title: '',
    content: '',
    error: null
  }

  static contextType = UserContext;

  componentDidMount() {
    const pageId = this.props.match.params.page;
    PageApiService.getPage(pageId)
      .then(page => {
        const { page_name, page_content } = page[0];
        this.setState({
          title: page_name,
          content: page_content
        });
      })
      .catch(e => {
        this.setState({
          error: e.error
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
          content: page_content,
          error: null
        });
      })
      .catch(e => {
        this.setState({
          error: e.error
        });
      });
  }

  render() {
    const pageId = this.props.match.params.page;

    //structure will be ...text...<IntLink ##>...text...<IntLink />...text

    const dividedContent = this.state.content.split('<IntLink ');
    let content = [
      <Link key="0" to={`/edit/${pageId}`}>
        {dividedContent[0]}
      </Link>
    ];

    //text, ##>text, />text , ##>text, />text etc

    for (let i = 1; i < dividedContent.length; i = i + 2) {
      const linkedPageId = dividedContent[i].split('>')[0];
      const linkText = dividedContent[i].slice(linkedPageId.length + 1)
      let postText;
      if (dividedContent[i + 1]) {
        postText = dividedContent[i + 1].slice(2);
      } else {
        postText = '';
      }
       
      
      content.push(
        <Link key={content.length} className="int-link" to={`/pages/${linkedPageId}`}>
          {linkText}
        </Link>,
        <Link key={content.length + 1} to={`/edit/${pageId}`}>
          {postText}
        </Link>
      );  
    }
    if (!this.state.error) {
      return(
        <>
          <main role="main">
            <header className="sub-header" role="banner">
              <Link to={`/edit/${pageId}`}>
                {this.state.title}
              </Link> 
            </header>
            <section className="page-content">
                {content}
            </section>
          </main>
        </>
      );
    } else {
      return(
        <>
          <main role="main">
            <header role="banner">
              <Link to={`${this.context.homepage}`}>
                {this.state.error}
              </Link>
            </header>
          </main>
        </>
      );
    }
  }
}