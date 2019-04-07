import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import FailedPage from './FailedPage';

import PrivateRouteAuth from './privateroutes/PrivateRouteAuth';



class RouterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            authed : false,
            domain : 'http://localhost:3001/'
        }
    }

    signIn = () => {
        this.setState({
            authed : true
        })
    }

    componentWillMount() {
        const token = localStorage.getItem('jwttoken');
        if (token) {
            // Burada axios ile headerımıza token'ımızı koyup bir get request alarak 
            // serverdan acaba tokenımızın onay alıp almayacagına bakacagız.

            const AuthStr = 'Bearer '.concat(token); 
            axios.get(this.state.domain + 'getir/reactonay', {headers : { Authorization : AuthStr }})
                .then(response => {
                        if (response.data.status === 200) {
                            this.setState({authed : true})
                        } 
                    })
                .catch(err => console.log(err))

        } else {
            console.log('token bulamadım knk')
        }
    }

    render() {
    return (
        <Router>
            <Route path="/" exact render={(props) => <LoginPage {...props} Domain={this.state.domain} auth={this.signIn} loginStatus={this.state.authed} />} />
            <PrivateRouteAuth path="/welcome" authed={this.state.authed} component={WelcomePage} />
            <Route path="/failed" component={FailedPage} />
        </Router>
           )
    }
}

export default RouterPage;