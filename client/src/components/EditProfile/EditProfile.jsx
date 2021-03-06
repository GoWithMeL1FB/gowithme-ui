import React, { Component } from 'react';
import { Row, Input, Button, Toast, SideNav, SideNavItem } from 'react-materialize';
import { connect } from 'react-redux';
import axios from 'axios';
import url from '../../../config';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      bio: '',
      birthday: 0,
      image: '',

    }
    this.submitUpdate = this.submitUpdate.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentWillMount() {
    this.setState({
      username: localStorage.getItem('username')
    })
  }

  componentDidMount() {
    //this.props.authUsername.username,
    // console.log(this.state.username);
    axios.get(`${url.restServer}/api/user/fetchUsersInfo/${this.props.authUsername.username}`)
      .then((data) => {
        const { firstname, lastname, email, bio, birthday, image } = data.data[0];
        this.setState({
          firstname,
          lastname,
          email,
          bio,
          birthday,
          image
        });
      })
      .catch((err) => {
        console.log('edit profile - failed to fetch user data', err.message);
      });
  }

  // send an update to the database
  async submitUpdate() {
    try {
      const payload = this.state;
      const data = await axios.put(`${url.restServer}/api/user/updateUser`, payload);
      // console.log(data);
      if (data) { Materialize.toast('Info Updated!', 4000, 'rounded') }
    } catch(err) {
      console.log('Failed to update user info', err);
    }
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h4>Edit Profile</h4>
        <Row>
          <Input s={6} name="firstname" label="First Name" onChange={this.onChangeHandler}/>
          <Input s={6} name="lastname" label="Last Name" onChange={this.onChangeHandler}/>
          <Input s={6} type="email" name="email" label="Email" onChange={this.onChangeHandler}/>
          <Input s={6} name="birthday" label="Birthday" onChange={this.onChangeHandler}/>
          <Input s={12} name="bio" label="Bio" onChange={this.onChangeHandler}/>
          <Input s={12} name="image" label="Profile Image" onChange={this.onChangeHandler}/>
          <div className="center-align"><Button waves='light' onClick={this.submitUpdate}>submit</Button></div>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authUsername: state.username,
  };
}

export default connect(mapStateToProps)(EditProfile);