import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import List from './List';

const testList = [
  {
      "id": 69,
      "page_name": "New Page Thu May 02 2019 10:10:03 GMT-0700 (Pacific Daylight Time)",
      "date_created": "2019-05-02T17:10:11.468Z",
      "date_modified": "2019-05-02T17:10:11.468Z"
  },
  {
      "id": 71,
      "page_name": "New Page Thu May 02 2019 11:44:48 GMT-0700 (Pacific Daylight Time)",
      "date_created": "2019-05-02T18:44:57.131Z",
      "date_modified": "2019-05-02T18:44:57.131Z"
  },
  {
      "id": 70,
      "page_name": "Testing internal linking",
      "date_created": "2019-05-02T18:04:01.893Z",
      "date_modified": "2019-05-02T18:49:52.392Z"
  }
];

describe('List component', ()=> {
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <List pageList={[]} handleDelete={handleDelete} handleEdit={handleEdit} />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders as expected when provided with a list of pages', () => {
    const tree = renderer
      .create(<BrowserRouter>
        <List pageList={testList} handleDelete={handleDelete} handleEdit={handleEdit} />
      </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
  });
  
})
