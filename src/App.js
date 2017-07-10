import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Example1 from "./Example1";
//import( /* webpackChunkName: "templates" */ './Example1')
import universal from "react-universal-component"

const UniversalComponent = universal(() => import(/* webpackChunkName: 'example' */ './Example1'), {
    resolve: () => require.resolveWeak('./Example1'),
    chunkName: 'example'
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <UniversalComponent />
      </div>
    );
  }
}

export default App;
