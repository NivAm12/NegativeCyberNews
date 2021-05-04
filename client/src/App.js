import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage'
import Axios from "axios";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const getUser = async () => {
    const response = await Axios.get("http://localhost:5000/user")
    return response.data.user;
  }

  return (
    <div>
      <Switch>
        <Route exact path='/'
          render={(props) => getUser() != null 
            ? <LandingPage {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
        <Route exact path='/login'
          render={(props) => getUser() != null
            ? <Redirect to={{pathname: '/', state: {from: props.location}}} />
            : <LoginPage {...props} />}
        />
        {/* <Route exact path='/login' render={(props) => (<LoginPage {...props}/>)}/> */}
        <Route exact path='/register' render={(props) => (<RegisterPage {...props}/>)}/>
      </Switch>
    </div>
  )
}

export default App;
