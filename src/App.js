import React, { Component } from 'react';
import LoginCard from './Components/LoginCard';
import './App.css';
import InfoCard from './Components/InfoCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginCard />
          <hr />
          <InfoCard />
        </header>
      </div>
    );
  }
}

export default App;
