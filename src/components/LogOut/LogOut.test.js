import React from 'react';
import ReactDOM from 'react-dom';
import LogOut from './LogOut';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const historyMock = { push: jest.fn() };

  ReactDOM.render(
        <LogOut history={historyMock}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
