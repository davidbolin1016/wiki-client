import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ListPage from './ListPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ListPage />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
