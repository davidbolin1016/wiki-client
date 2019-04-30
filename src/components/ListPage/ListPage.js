import React from 'react';
import PageApiService from '../../services/page-api-service';
import { Link } from 'react-router-dom';

export default class ListPage extends React.Component {
  
  state = {
    pageList: []
  }

  handleDelete = (id) => {
    PageApiService.deletePage(id)
      .then(() => {
        const newPageList = this.state.pageList.filter(ele => ele.id !== id);
        this.setState({
          pageList: newPageList
        });
      })
  }

  handleEdit = (id) => {
    this.props.history.push(`/edit/${id}`);
  }

  componentDidMount() {
    PageApiService.getPageList()
      .then(list => {
        this.setState( {
          pageList: list
        });
      });
  }
  
  render() {
    const pageList = this.state.pageList;
    console.log(pageList.length);
    const listElements = pageList.map((ele, i) => {
      return (
        <li key={ele.id}>
          <Link to={'/pages/' + ele.id}>{ele.page_name}</Link>
          <button onClick={() => this.handleEdit(ele.id)}>Edit</button>
          <button onClick={() => this.handleDelete(ele.id)}>Delete</button>
        </li>
      );
    });
    return (
     <>
      <nav role="navigation">
       <a href="#">Home</a>
       <a href="#">Log out</a>
      </nav>
      <main role="main">
        <header role="banner">
          <h1>Page List</h1>
          <h2>Ordering by oldest created</h2>
          <h3><a href="#">(change)</a></h3>
        </header>
        <section>
         <ul>
          {listElements}
        </ul>
        </section>
      </main>
   </>
    );
  }
}