import React from 'react';
import './NewPage.css';
import PageApiService from '../../services/page-api-service';

export default class NewPage extends React.Component {
  
  state = {
    title: 'New Page ' + new Date(),
    content: ''
  }

  cancel = () => {
    this.props.history.goBack();
  }

  save = () => {
    PageApiService.submitPage({
      page_name: this.state.title,
      page_content: this.state.content
    })
      .then((res) => {
        console.log(res);
        this.props.history.push(`/pages/${res.page_id}`);
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
            <form className="input-fields">
                <label htmlFor="page-title">{this.state.title}</label>
                <input type="text" id="page-title" name="title" value={this.state.title} onChange={event => this.changeFields(event)}/>
              <textarea rows="6" cols="50" name="content" value={this.state.content} onChange={event => this.changeFields(event)}></textarea>
            </form>
          </header>
       <section className="save-or-cancel">
         <button onClick={this.save}>Save</button>
       <button onClick={this.cancel}>Cancel</button>
       </section>
       </main>
      </>
    );
  }
}