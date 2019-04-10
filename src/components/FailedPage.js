import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Redirect} from 'react-router-dom'; 

import {removeFailedState} from '../actions/loginAction';

class FailedPage extends Component {

  goLogin() {
    this.props.dispatch(removeFailedState());
  }

  render() {
    if (!this.props.user.loginFailed) { return (<Redirect to={{pathname : '/'}} />) } else 
{    return (
      <div>
        <p>Giriş Başarısız...</p>
        <button onClick={this.goLogin.bind(this)}>Tekrar Dene</button>
      </div>
    )}
  }
}

const mapStateToProps = state => ({
    user : state.userReducer 
})

export default connect(mapStateToProps)(FailedPage);