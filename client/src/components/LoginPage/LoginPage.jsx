import React, { Component } from 'react';
import { Row, Input, Button, Icon, Modal } from 'react-materialize';
import axios from 'axios';
import {
  Redirect
} from 'react-router-dom';

import Home from '../Home/index.jsx'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logState = this.logState.bind(this);
  }

  logState() {
    console.log(this.state);
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  loginUser() {
    const { username, password } = this.state;
    const payload = {
      username,
      password
    }
    axios.post('http://localhost:3050/api/augh/login', payload)
    .then((results) => {
      console.log('Log in Successful! res:', results);
      this.props.redirectToHome();
      //this.props redux bs setting edit login state to be true
    })
    .catch((err) => {
      console.log('Log in Failed err:', err);
    })
  }
  
  render() {
    return (
      <Modal
        header="Log in"
        trigger={<Button waves='light'>Login</Button>}
      >
        <Row>
          <Input
            s={6}
            label="Username"
            name="username"
            onChange={this.onChangeHandler}
          />
          <Input
            s={6}
            label="Password"
            name="password"
            onChange={this.onChangeHandler}
          />
          <Button onClick={this.loginUser}>Submit</Button>
          <Button onClick={this.logState}>state</Button>
        </Row>
      </Modal>
    );
  }
}

export default LoginPage;
