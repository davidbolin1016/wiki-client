import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from './EditPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <EditPage match={{params: {page: 1}}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
