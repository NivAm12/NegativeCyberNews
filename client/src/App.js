import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage'
import Axios from "axios";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {

  const [ user, setUser ] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await Axios.get("http://localhost:5000/user")
    setUser(response.data.user)
  }

  return (
    <div>
      <Switch>
        <Route exact path='/login' render={(props) => (<LoginPage {...props} user={user} setUser={setUser}/>)}/>
        <Route exact path='/register' render={(props) => (<RegisterPage {...props} user={user} setUser={setUser}/>)}/>
        <Route
          render={(props) => user != null 
            ? <LandingPage user={user} setUser={setUser} {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
      </Switch>
    </div>
  )
}

export default App;
