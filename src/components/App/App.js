import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import './App.css';

function App() {
  return (
    <main className='App'>
      <LandingPage exact path={'/'} />
    </main>
  );
}

export default App;