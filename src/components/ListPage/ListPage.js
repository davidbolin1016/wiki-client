import React from 'react';
import PageApiService from '../../services/page-api-service';
import './ListPage.css';
import UserContext from '../../user-context/UserContext';
import List from '../../components/List/List';

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

    console.log(this.state.filterTerm);
    pageList = pageList.filter(ele => ele.page_name.toLowerCase().includes(this.state.filterTerm.toLowerCase()));

    return (
      <main role="main">
        <header role="banner" className="sub-header">
          Pages
        </header>
        <section>
          Order By
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
        </section>     
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
          <List pageList={pageList} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
        </section>
      </main>
    );
  }
}