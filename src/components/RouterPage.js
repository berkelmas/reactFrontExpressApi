import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import FailedPage from './FailedPage';

import PrivateRouteAuth from './privateroutes/PrivateRouteAuth';



class RouterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            authed : false
        }
    }

    signIn = () => {
        this.setState({
            authed : true
        })
    }

    render() {
    return (
        <Router>
            <Route path="/" exact render={(props) => <LoginPage {...props} Domain="http://localhost:3001/" auth={this.signIn} loginStatus={this.state.authed} />} />
            <PrivateRouteAuth path="/welcome" authed={this.state.authed} component={WelcomePage} />
            <Route path="/failed" component={FailedPage} />
        </Router>
           )
    }
}

export default RouterPage;