import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm';
import LandingPage from './components/LandingPage'
import PrivateRoute from './components/PrivateRoute'
import Axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
function App() {

  const [ user, setUser ] = useState(null);
  const [ message, setMessage ] = useState({message:"", severity: ""});

  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = async () => {
    const response = await Axios.get("http://localhost:5000/user")
    console.log(`inside App: ${response.data.user}`)
    setUser(response.data.user)
  }

  return (
    <Router>
    <div className="App">
      <Switch>

        {/* <PrivateRoute exact path='/' component={LandingPage} 
            user={user}
            setUser={setUser}
            setMessage={setMessage}
            /> */}
        <Route path='/'
          render={() => user
          ? <LandingPage 
              user={user}
              message={message}
              setUser={setUser}
              setMessage={setMessage}
               />
          : <Redirect to={{pathname: '/login'}} />}
        />
        <Route path='/login'
            render={() => (
              <LoginForm 
                user={user}
                message={message}
                setUser={setUser}
                setMessage={setMessage}
              />
          )}    
        />
        <Route path='/register' component={RegisterForm} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
