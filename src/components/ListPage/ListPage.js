import React from 'react';
import PageApiService from '../../services/page-api-service';
import { Link } from 'react-router-dom';
import './ListPage.css';
import UserContext from '../../user-context/UserContext';

export default class ListPage extends React.Component {
  
  state = {
    pageList: [],
    sort: {
      by: 'date_modified',
      sign: -1
    },
    filterTerm: ''
  }

  static contextType = UserContext;

  changeFilter(event) {
      this.setState({
        filterTerm: event.target.value
      })
  }

  changeOrder(event) {
    const newSort = {};
    switch(event.target.value) {
      case 'Most Recently Modified':
        newSort.by = 'date_modified';
        newSort.sign = -1;
        break;
      case 'Least Recently Modified':
        newSort.by = 'date_modified';
        newSort.sign = 1;
        break;
      case 'Most Recently Created':
        newSort.by = 'date_created';
        newSort.sign = -1;
        break;
      case 'Least Recently Created':
        newSort.by = 'date_created';
        newSort.sign = 1;
        break;
      case 'Alphabetical':
        newSort.by = 'alphabetical';
        newSort.sign = 1;
        break;
      case 'Reverse Alphabetical':
        newSort.by = 'alphabetical';
        newSort.sign = -1;
        break;
      default:
        newSort.by = 'date_modified';
        newSort.sign = -1;
    }

    this.setState({
      sort: newSort
    });
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
    let pageList;

    if (this.state.sort.by !== 'alphabetical') {
      pageList = this.state.pageList.sort((page1, page2) => {
        const date1 = page1[this.state.sort.by];
        const date2 = page2[this.state.sort.by];
        if (date1 > date2) {
          return this.state.sort.sign;
        } else {
          return -this.state.sort.sign;
       }
      });
    } else {
      pageList = this.state.pageList.sort((page1, page2) => {
        if (page1.page_name > page2.page_name) {
          return this.state.sort.sign;
        }
        
        return -this.state.sort.sign;
      });
    }   

    pageList = pageList.filter(ele => ele.page_name.includes(this.state.filterTerm));

    const listElements = pageList.map((ele, i) => {
      return (
        <li key={ele.id}>
          <Link to={'/pages/' + ele.id}>{ele.page_name}</Link>
          {this.context.homepage !== `/pages/${ele.id}` && <button onClick={() => this.handleDelete(ele.id)}>Delete</button>}
          <button onClick={() => this.handleEdit(ele.id)}> Edit </button>
        </li>
      );
    });

    return (
     <>
      <main role="main">
        <header role="banner" className="list-header">
          Page List<br/>
          Ordering by
          <select onChange={(event) => this.changeOrder(event)}>
            <option>Most Recently Modified</option>
            <option>Least Recently Modified</option>
            <option>Most Recently Created</option>
            <option>Least Recently Created</option>
            <option>Alphabetical</option>
            <option>Reverse Alphabetical</option>
          </select>
          <label htmlFor="filter-term">Filter By:</label>
          <input type="text" name="filter-term" id="filter-term" value={this.state.filterTerm} onChange={event => this.changeFilter(event)}></input>
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