import React, { Component } from "react";
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage'
import PrivateRoute from "./components/PrivateRoute";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Switch>
              <PrivateRoute exact path="/index" component={LandingPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
