import React from "react";
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute ({component: Component, user, ...rest}){
    return (
      <Route
        render={(props) => user != null 
          ? <Component {...rest} {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }