import React, { Component } from 'react';
import axios from 'axios';
import './LandingPage.scss';
import Parallax from 'react-materialize';
import { Button } from 'react-materialize';
import Signup from '../SignupPage/SignupPage.jsx';
import Login from '../LoginPage/LoginPage.jsx';

class LandingPage extends Component {

  render() {
    return (
      <div className='landingpage'>
        <Signup></Signup>
        <Login></Login>
        <div id='logo'>&#9736;</div>
        <h2>GO</h2>
        <h2>WITH</h2>
        <h2>ME</h2>
        <h3>we plan. you play.</h3>
      </div>

    )
  }
}

export default LandingPage;