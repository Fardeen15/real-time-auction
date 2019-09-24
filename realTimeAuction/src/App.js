import React from 'react';
import { connect } from 'react-redux'
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './component/home/home';
import AuctionerForm from './component/auctionerForm/Form';
import Profile from './component/profile/viewProfile';
import "antd/dist/antd.css";
import BidderHomePAge from './component/bidder/bidderHome';
import { GetData } from './action/action';
import { storage } from './firebaseConfige';
class App extends React.Component {
  componentWillMount() {
    this.props.GetData()
    // storage.ref('profileImages/').listAll().then((res) => {
    //   res.items.forEach(function (itemRef) {
    //     console.log(itemRef.toString())
    //   });
    // })

  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/AuctionForm" render={() => <AuctionerForm />} />
        <Route exact path="/Profile" render={() => <Profile />} />
        <Route exact path="/BiderHomePage" render={() => <BidderHomePAge />} />
        <Route exact path="/BiderHomePage/:id" render={() => <BidderHomePAge />} />
      </Router>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state,
  }
}
const mapDispatchToProps = { GetData }


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

