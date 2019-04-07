import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PrivateRouteAuth ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} Domain="http://localhost:3001/" />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
    )
  }

export default PrivateRouteAuth;