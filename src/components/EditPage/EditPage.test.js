import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import App from '../App/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/edit/1']} initialIndex={0} >
      <App />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
