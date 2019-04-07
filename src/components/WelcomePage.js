import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class WelcomePage extends Component {

  render() {

    // Bir yerden mi geliyor ona bakıyoruz.
        try {
          return (
            <div>
              <p>Welcome Page</p>
              <Link to="/"> Logine Git </Link>
              <p>{this.props.location.state.from.pathname} dan geliyorsun...</p>
            </div>
          )
      }
        catch{
          return (
            <div>
              <p>Welcome Page</p>
              <Link to="/"> Logine Git </Link>
              <p>Bir yerden gelmiyorsun...</p>
            </div>
          )
        }

  } 
}

export default WelcomePage;
