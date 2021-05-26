import React, { Component } from 'react';
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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

const classes = {
  root: { 
    margin: "100px auto"
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/10629546)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    // theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
}


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
      message: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/index");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/index");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

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

              {/* display error message */}
              {this.state.message ? <Alert severity='error'>{this.state.message}</Alert> : null}

              <form className={classes.form} onSubmit={this.onSubmit} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="username"
                  label="User name"
                  autoFocus={true}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  label="Password"
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
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);