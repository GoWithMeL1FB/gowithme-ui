import React, { Component } from 'react';
import { Row, Input, Button, Icon, Modal } from 'react-materialize';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUsername } from '../../ReduxActions/setUsername.js';
import url from '../../../config';

import Home from '../Home/Home.jsx';

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
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  loginUser() {
    const { username, password } = this.state;
    const payload = {
      username,
      password,
    }
    axios.post(`${url.restServer}/api/auth/login`, payload)
    .then((results) => {
      this.props.setUsername(this.state.username);
      //console.log(localStorage.getItem('authentication'));
      localStorage.setItem('authentication', results.headers.authentication);
      localStorage.setItem('id', results.data.id);
      localStorage.setItem('username', results.data.username);
      this.props.redirectToHome();
      console.log('Log in Successful!');
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
            type="password"
            label="Password"
            name="password"
            onChange={this.onChangeHandler}
          />
          <Button onClick={this.loginUser}>Log in</Button>
        </Row>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUsername: state.username,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setUsername: setUsername,
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(LoginPage)
