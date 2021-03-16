import SignInSide from './components/AuthForm'
import SignUp from './components/RegisterForm';
import LandingPage from './components/LandingPage'
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [ user, setUser ] = useState(null);
  const [ message, setMessage ] = useState({message:"", severity: ""});

  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = async () => {
    const response = await Axios.get("http://localhost:5000/user")
    setUser(response.data.user)
  }

  return (
    <div>
        { user ? 
          <LandingPage
            user={user}
            setUser={setUser}
            setMessage={setMessage}
          />
          :
          <SignInSide
            user={user}
            message={message}
            setUser={setUser}
            setMessage={setMessage}
          />
        }
      </div>
  );
}

export default App;
