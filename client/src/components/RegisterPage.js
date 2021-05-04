import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from '../styles/RegisterPage'
import Axios from 'axios'

export default function RegisterForm(props) {

  const classes = useStyles();

  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ message, setMessage ] = useState({message:"", severity: ""});

  const onRegister = async (event) => {
       
    event.preventDefault()
    try {
        
        const response = await Axios.post(`http://localhost:5000/register`, {username,password})
        const { user } = response.data
        props.setUser(user)
        props.history.push("/");

    } catch (err) {
        const { message } = err.response.data
        setMessage({ message , severity: "error"})
    } finally {
        setUsername("")
        setPassword("")
    }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onRegister} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="UserName"
                label="User name"
                name="UserName"
                autoComplete="UserName"
                className={classes.input}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={classes.input}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}