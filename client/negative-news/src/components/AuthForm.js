import Axios from 'axios';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
Axios.defaults.withCredentials = true


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User name"
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}



























/*
const AuthForm = (props) => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const onLogin = async (event) => {

        event.preventDefault()

        try {
            const response = await Axios.post(`http://localhost:5000/login`, {username,password})
            const { message, user } = response.data
            props.setUser(user)
            props.setMessage({ message, variant: "success" })
        } catch (err) {
            const { message } = err.response.data
            props.setMessage({ message , variant: "danger"})
        } finally {
            setUsername("")
            setPassword("")
        }
    }

    const onLogout = async (event) => {
        event.preventDefault()
        try {
            const response = await Axios.get(`http://localhost:5000/logout`)
            
            const { message } = response.data
            props.setUser(null)
            props.setMessage({message, variant: "success"})
        } catch (err) {
            const { message } = err.response.data
            props.setMessage({ message , variant: "danger"})
        }
    }

    return (
        <>
        <Navbar bg="light" variant="light">
            <Nav className="mr-auto"/>
            {!props.user ? 
                <Form onSubmit={onLogin} inline>
                    <Form.Control 
                        size="sm" 
                        type="text" 
                        placeholder="Username" 
                        className="mr-sm-2" 
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        />
                    <Form.Control 
                    size="sm" 
                    type="password" 
                    placeholder="Password" 
                    className="mr-sm-2"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button 
                    variant="link"
                    type="submit"
                    >
                        Login
                        </Button>
                </Form>
                :
                <Form onSubmit={onLogout}>
                    <Button 
                    variant="link" 
                    type="submit"
                    >
                        Logout
                        </Button>
                </Form>
                }
        </Navbar>
        </>
    )
}

export default AuthForm;
*/