import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null); 

    useEffect(() => {
        if(props.isAuthenticated){
            props.history.push("/");
        }
    });

    function submitForm(e){
        e.preventDefault();
        console.log(email);
        console.log(password);
        props.onAuth(email, password);
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {setEmail(e.target.value)}}
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
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            href = "/profile" //Trying to use function 'SubmitForm' does not work. Could someone investigate why? At a loss -Wolfe
            onClick={(e) => submitForm(e)}>

            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
};
const  mapStateToProps = state => {
  return{
      isAuthenticated: state.token !== null,
      loading: state.loading,
      error: state.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password) => dispatch(actions.authLogin(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);