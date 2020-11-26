import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../context/authContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Elephant Team.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);  
  const classes = useStyles();
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [username , setusername] = useState('')
    const { setAuthTokens } = useAuth();
    function postLogin(e) {
      e.preventDefault();
        axios.post("https://api.wwtm.info/api/login", {
          email,
          username, 
          password,
          device_name:'device'
        }).then(result => {
          if (result.status >= 200 && result.status < 300) {
            setAuthTokens(result.data.token.access_token || "");
            setLoggedIn(true);
          } else {
            setIsError(true);
            console.log(result)
          }
        }).catch(e => {
          setIsError(true);
        //   console.log(e)
        });
      }
    const handleChange = (event)=>{
        const {value , name} = event.target
        switch (name) {
            case "email":{
                setEmail(()=> value)
                break;
            }
            case "password":{
                setPassword(()=> value)
                break;
            }
            case "username":{
                setusername(()=> value)
                break;
            }
            default:
                break;
        }
    }
    if (isLoggedIn) {
        return <Redirect to="/section" />;
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
        {/* <form className={classes.form} noValidate> */}
        {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=> setEmail(e.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          /> */}
          <form onSubmit={postLogin}>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=> setusername(e.target.value)}
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            onChange={(e)=> setPassword(e.target.value)}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // onClick={postLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
          </form>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        {/* </form> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}