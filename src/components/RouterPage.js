import React, {Component} from 'react'
import { Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import FailedPage from './FailedPage';

import PrivateRouteAuth from './privateroutes/PrivateRouteAuth';
import { connect } from 'react-redux';

import {checkLogin} from '../actions/loginAction'; 



class RouterPage extends Component {

    // Sayfamız render edilmeden önce local storage'da token durumunu sorguluyor.
    componentWillMount() {
        this.props.dispatch(checkLogin());
    }
    

    render() {
    return (
        <div>
            <Route path="/" exact component={LoginPage} />
            <PrivateRouteAuth path="/welcome" authed={this.props.user.loginStatus} component={WelcomePage} />
            <Route path="/failed" component={FailedPage} />
        </div>
           )
    }
}

const mapStateToProps = state => {
    return ({
        user : state.userReducer
            })
}

export default connect(mapStateToProps)(RouterPage);