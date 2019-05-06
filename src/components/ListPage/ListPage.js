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
    filterTerm: '',
    searchTerm: '',
    currentlySearching: false
  }

  static contextType = UserContext;

  changeFilter(event) {
      this.setState({
        filterTerm: event.target.value
      })
  }

  changeSearch(event) {
    this.setState({
      searchTerm: event.target.value
    });
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

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      currentlySearching: true
    });
  }

  handleReset = (e) => {
    e.preventDefault();
    PageApiService.getPageList()
      .then(list => {
        this.setState( {
          pageList: list,
          searchTerm: '',
          currentlySearching: false
        });
      }); 
  }

  componentDidMount() {
      PageApiService.getPageList()
      .then(list => {
        this.setState( {
          pageList: list
        });
      }); 
  }
  
  componentDidUpdate() {
    if(this.state.currentlySearching) {
      PageApiService.getSearchedList(this.state.searchTerm)
        .then(list => {
          this.setState({
            pageList: list,
            currentlySearching: false
          });
        });
    }
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
          <button disabled={this.context.homepage === `/pages/${ele.id}`} onClick={() => this.handleDelete(ele.id)}>Delete</button>
          <button onClick={() => this.handleEdit(ele.id)}> Edit </button>
        </li>
      );
    });

    return (
     <>
      <main role="main">
        <header role="banner" className="list-header">
          Page List<br />
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
          <form onSubmit={event => this.handleSearch(event)} onReset={event => this.handleReset(event)}>
            <label htmlFor="search-term">Search Full Content:</label>
            <input type="text" name="search-term" id="search-term" value={this.state.searchTerm} onChange={event => this.changeSearch(event)}></input>
            <input type="submit"></input>
            <input type="reset" value="Clear" ></input>
          </form>
          {this.state.currentlySearching && 'Searching...'}
        </section>
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