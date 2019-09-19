import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './component/home/home';
import AuctionerForm from './component/auctionerForm/Form';
import "antd/dist/antd.css";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/AuctionForm" render={() => <AuctionerForm />}/>

      </Router>
    )
  }
}

export default App;
