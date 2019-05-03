import React from 'react';
import PageApiService from '../../services/page-api-service';
import { Link } from 'react-router-dom';
import './ListPage.css';

export default class ListPage extends React.Component {
  
  state = {
    pageList: [],
    sort: {
      by: 'date_modified',
      sign: -1
    },
    filterTerm: ''
  }

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

    const pageList = this.state.pageList.sort((page1, page2) => {
      const date1 = page1[this.state.sort.by];
      const date2 = page2[this.state.sort.by];
      if (date1 > date2) {
        return 1 * this.state.sort.sign
      } else {
        return -1 * this.state.sort.sign
      }
    }).filter(ele => ele.page_name.includes(this.state.filterTerm));

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
      <main role="main">
        <header role="banner" className="list-header">
          Page List<br/>
          Ordering by<br/>
          <select onChange={(event) => this.changeOrder(event)}>
            <option>Most Recently Modified</option>
            <option>Least Recently Modified</option>
            <option>Most Recently Created</option>
            <option>Least Recently Created</option>
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