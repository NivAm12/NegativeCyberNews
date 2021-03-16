import SignInSide from './components/AuthForm'
import SignUp from './components/RegisterForm';
import Axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [ user, setUser ] = useState(null);
  const [ message, setMessage ] = useState({message:"", variant: ""});

  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = async () => {
    const response = await Axios.get("http://localhost:5000/user")
    setUser(response.data.user)
  }

  return (
    <div className={"container"}>
        {/* <AuthForm
          user={user}
          setUser={setUser}
          setMessage={setMessage}
        /> */}
        <SignUp/>
      </div>
  );
}

export default App;
