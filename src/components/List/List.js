import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../user-context/UserContext';

export default class List extends React.Component {

  static contextType = UserContext;
  
  render() {
    const listElements = this.props.pageList.map((ele, i) => {
      return (
        <li className="listed-page" key={ele.id}>
          <Link to={'/pages/' + ele.id}>{ele.page_name}</Link>
          <div className="edit-or-delete">
            <button disabled={this.context.homepage === `/pages/${ele.id}`} onClick={() => this.props.handleDelete(ele.id)}>Delete</button>
            <button onClick={() => this.props.handleEdit(ele.id)}> Edit </button>
          </div>
        </li>
      );
    });
  
    return (
      <ul className="page-list">
        {listElements}
      </ul>
    );
  }
}
  
  