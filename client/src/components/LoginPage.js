import Axios from 'axios';
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import {useStyles} from '../styles/LoginPage'


Axios.defaults.withCredentials = true

export default function LoginForm(props) {

  const classes = useStyles();

  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ message, setMessage ] = useState("");

    const onLogin = async (event) => {
       
        event.preventDefault()
        try {
            const response = await Axios.post(`http://localhost:5000/login`, {username,password})
            const { user } = response.data
            props.setUser(user)
            props.history.push("/");

        } catch (err) {
            setMessage(err.response.data.message)
        } finally {
            setPassword("")
        }
    }

  return (
    <Container fixed className={classes.root}>
      <CssBaseline />
      <Grid container>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {message ? <Alert severity='error'>{message}</Alert> : null}
          <form className={classes.form} onSubmit={onLogin} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User name"
              name="userName"
              value={username}
              autoComplete="userName"
              autoFocus
              onChange={(event) => setUsername(event.target.value)}
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
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
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
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      </Grid>
      </Container>  
      );
}
