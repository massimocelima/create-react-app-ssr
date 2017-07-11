import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Example1 from "./Example1";
//import( /* webpackChunkName: "templates" */ './Example1')
import universal from "react-universal-component"

const UniversalComponent1 = universal(() => import(/* webpackChunkName: 'example' */ './Example1'), {
    resolve: () => require.resolveWeak('./Example1'),
    chunkName: 'example'
})

const UniversalComponent11 = universal(() => import(/* webpackChunkName: 'example' */ './Example1_1'), {
    resolve: () => require.resolveWeak('./Example1_1'),
    chunkName: 'example'
})

const UniversalComponent2 = universal(() => import(/* webpackChunkName: 'example2' */ './Example2'), {
    resolve: () => require.resolveWeak('./Example2'),
    chunkName: 'example2'
})

class App extends Component {

    componentDidMount() {
        console.log("Mounted")
    }

    handleClick = () => {
        alert("Hello!")
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, hot module replacement. That seemed too easy!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <UniversalComponent1 />
          <UniversalComponent11 />
          <UniversalComponent2 />
          <button onClick={this.handleClick}>Press Me</button>
      </div>
    );
  }
}

export default App;
