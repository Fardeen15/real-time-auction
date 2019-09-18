import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './component/home/home';
import SignIN from './component/signin/signIn';
import "antd/dist/antd.css";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <Home />} />

      </Router>
    )
  }
}

export default App;
