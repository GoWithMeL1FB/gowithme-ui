import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import EditProfile from './components/EditProfile/EditProfile.jsx';
import Search from './components/Search/Search.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('props for App', this.props)
    return (
    
      <div className="container">
      <Switch>
        <Route path='/Home' component={Home} />
        <Route path='/' component={LandingPage} />
      </Switch>
      </div>

    )
  }
}

export default App;