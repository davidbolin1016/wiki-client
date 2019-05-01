import React from 'react';
import PageApiService from '../../services/page-api-service';

export default class NewPage extends React.Component {
  
  state = {
    fetchedPage: false,
    title: '',
    content: ''
  }

  componentDidMount() {
    if (!this.state.fetchedPage) {
      const pageId = this.props.match.params.page;
      PageApiService.getPage(pageId)
        .then(page => {
          const { page_name, page_content } = page[0];
          this.setState({
            fetchedPage: true,
            title: page_name,
            content: page_content
          });
        });
    }     
    
  }

  cancel = () => {
    this.props.history.goBack();
  }

  save = () => {
    const pageId = this.props.match.params.page;
    PageApiService.updatePage(pageId, {
      page_name: this.state.title,
      page_content: this.state.content
    })
      .then(() => {
        this.props.history.push(`/pages/${pageId}`);
      });
  }

  changeFields(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    return (
      <>
        <main role="main">
          <header role="banner">
            <form>
              <h1>
                <input type="text" name="title" value={this.state.title} onChange={event => this.changeFields(event)}/>
              </h1>
              <textarea rows="6" cols="50" name="content" value={this.state.content} onChange={event => this.changeFields(event)}></textarea>
            </form>
          </header>
       <section>
         <button onClick={this.save}>Save</button>
       <button onClick={this.cancel}>Cancel</button>
       </section>
       </main>
      </>
    );
  }
}