import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import PersonalPage from './PersonalPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/pages/5']} initialIndex={0} >
      <PersonalPage match={{params: {page: 5}}}/>
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
