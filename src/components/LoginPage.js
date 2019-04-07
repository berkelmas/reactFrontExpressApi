import React, { Component } from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';



export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username : '',
      password : '',
    }
    this.updateFunc = this.updateFunc.bind(this);
    this.submitFunc = this.submitFunc.bind(this);
  }


  updateFunc(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submitFunc(e) {
    axios.post(this.props.Domain + 'login', {
      username : this.state.username,
      password : this.state.password
    })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      if (res.status) {
        this.props.auth();
        localStorage.setItem('jwttoken', res.token);
        this.props.history.push('/welcome') 
      } else {
        this.props.history.push('/failed')
      }
    })
    .catch((err) => {
      console.log(err);
    })
    e.preventDefault();
  }

  render() {

    if (this.props.loginStatus) { return ( <Redirect to={{pathname: '/welcome', state: {from: this.props.location}}} /> ) } else {
    return(
      <div style={{margin : 30}}>
        <h2>Giriş Ekranı</h2>
        <form onSubmit={this.submitFunc}>
      <input name='username' value={this.state.username} onChange={this.updateFunc} placeholder='username'/>
      <input name='password' value={this.state.password} onChange={this.updateFunc} placeholder='password' type="password"/>
      <button>Giriş Yap</button>
        </form> 
      </div>
    )
    }
  }
}


