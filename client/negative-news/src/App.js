import AuthForm from './components/AuthForm'

function App() {

  const [ user, setUser ] = useState(null);
  const [ message, setMessage ] = useState({message:"", variant: ""});

  useEffect(() => {
    getUser();
    getTenants({});
  }, []);
  
  const getUser = async () => {
    const response = await Axios.get("http://localhost:5000/user")
    setUser(response.data.user)
  }

  return (
    <div className={"container"}>
        <AuthForm
          user={user}
          setUser={setUser}
          setMessage={setMessage}
        />
      </div>
  );
}

export default App;
