import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import PersonalPage from './LandingPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PersonalPage />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
