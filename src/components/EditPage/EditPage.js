//copied from NewPage, need to change this

import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav role="navigation">
          <a href="#">Home</a>
          <Link to='/logout'>Log out</Link>
        </nav>
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