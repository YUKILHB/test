import React from 'react';
import logo from './logo.svg';
import './App.css';
import Badge from '../packages/Badge';
import Badge2 from '../packages/Badge2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Badge />
        <Badge2 />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
