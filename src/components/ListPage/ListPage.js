import React from 'react';
import PageApiService from '../../services/page-api-service';
import { Link } from 'react-router-dom';

export default class ListPage extends React.Component {
  
  state = {
    pageList: []
  }

  componentDidMount() {
    PageApiService.getPageList()
      .then(list => {
        console.log(list, typeof list);
        this.setState( {
          pageList: list
        });
      });
  }
  
  render() {
    const pageList = this.state.pageList;
    console.log(pageList.length);
    const listElements = pageList.map(ele => {
      return (
        <li>
          <Link to={'/pages/' + ele.id}>{ele.page_name}</Link>
          <button>Edit</button>
          <button>Delete</button>
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
          <h2>Ordering by most recent edit</h2>
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