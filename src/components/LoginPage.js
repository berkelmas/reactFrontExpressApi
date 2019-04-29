import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {usernameAction, passwordAction, submitAction} from '../actions/loginAction';


class LoginPage extends Component {

  constructor(props) {
    super(props);
    
    this.sendUsername = this.sendUsername.bind(this);
    this.sendPassword = this.sendPassword.bind(this);
    this.submitFunc = this.submitFunc.bind(this);
  }


  sendUsername(e) {
    const data = {username : e.target.value}
    this.props.dispatch(usernameAction(data));
  }

  sendPassword(e){
    const data = {password : e.target.value}
    this.props.dispatch(passwordAction(data))
  }

  submitFunc(e) {
    this.props.dispatch(submitAction());
    e.preventDefault();
  }


  render() {

    const loginScreen = (
      <div style={{margin : 30}}>
      <h2>Giriş Ekranı</h2>
      <form onSubmit={this.submitFunc}>
    <input name='username' value={this.props.user.username} onChange={this.sendUsername.bind(this)} placeholder='username'/>
    <input name='password' value={this.props.user.password} onChange={this.sendPassword.bind(this)} placeholder='password' type="password"/>
    <button type="submit">Giriş Yap</button>
      </form> 
      <p>{this.props.user.username}</p>
      <p>{this.props.user.password}</p> 
    </div>
    )

    if (this.props.user.loginStatus)
      { return(<Redirect to={{pathname : '/welcome'}} />) } 
    
      else if (this.props.user.loginFailed) 
        { return (<Redirect to={{pathname : '/failed'}} />) }
      
      else 
        {return loginScreen;}
  }
}

const mapStateToProps = state => {
  return {
    user : state.userReducer
  }
}

export default connect(mapStateToProps)(LoginPage);


