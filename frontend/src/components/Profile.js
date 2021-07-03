import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { SERVER } from '../utils/server';

import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  main: {
    // backgroundColor: "#1a237e",    
    height: "100vh",
    alignItems: "left"
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.divider,
    width: "100%",
    padding: theme.spacing(3,3,3),
  },
  avatar: {
    height: "90%",
    width: "10%",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h1:   {
    margin: theme.spacing(2,1,2),
  },
  slider1:   {
    width: '55%',
    backgroundColor: theme.palette.divider,  
    margin: theme.spacing(2,0,2),
    marginLeft: "auto",
    padding: theme.spacing(3,3,0),
  },
  createdStories:   {
    textAlign: 'center',
  },
  slider2:   {
    width: '55%',
    backgroundColor: theme.palette.divider,  
    margin: theme.spacing(0,0,0),
    marginLeft: "auto",
    padding: theme.spacing(3,3,0),
  },
  recentStories:   {
    textAlign: 'center',
  },
  gridList: {
    // flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    
  },
  title: {
    color: theme.palette.primary.main,
  },
  titleBar: {
    textAlign: 'center'
  },

  key: {
    backgroundColor: "#f3e5f5", 
  },
  about:   {
    alignItems: 'right',
    width: "40%",
    backgroundColor: theme.palette.divider,
    padding: theme.spacing(3,3,0),
  },
}));
//Every user will have a profile, come here automatically from login -Wolfe
//Wanna find a way to carry over user info (username, stories created, etc.) and display them here. -Wolfe
export default function Profile() {
  const classes = useStyles();
  const history = useHistory(); //so we can redirect is a user isn't logged in -Newlon

  const [stories, setStories] = useState([]);

  /*
  * username is placed in local storage when a user is logged in so we can retrieve it here and store it in state
  * if not, we'll redirect the user back to the home page - newlon
  */
  const [username, setUsername] = useState(null); 
  useEffect(() => {
    //on successful login the user's username is stored in local storage-newlon
    const user = localStorage.getItem('username');
    if(user){ //if username is in storage, set the username
      setUsername(user); 
    } else {
      history.push("/"); //if the username is not set (user not logged in) redirect to home page
    }

    //getting all the users stories -newlon
    axios.get(`${SERVER}/stories/${user}`)
    .then(response => {
      console.log(response);
      setStories(response.data.stories)
    })
    .catch(error => {
      console.log(error)
    })
  }, [history]);

  //Avatar should contain profile picture functionality at some point -Wolfe
  return (
    <Container>
      <br />
      <br />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography component="h1" variant="h4" className={classes.h1}>
                Welcome Back, {username}!
              </Typography> 
            </CardContent>
          </Card>
        </Grid> 
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5" className={classes.createdStories}>
                  Created Stories! 
              </Typography>
              <br />
              <Grid container spacing={3}>
                {stories.map((tile) => (
                  <Grid item xs={12} key={tile._id}>
                    <Link to={`/story/${tile._id}`}>{tile.title}</Link>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography component="h1" variant="h5" className={classes.recentStories}>
                  Recently Played Stories!
              </Typography>
              <br />
              <Grid container spacing={3}>
                {stories.map((tile) => (
                  <Grid item xs={12} key={tile.img}>
                    <Link to={`/story/${tile._id}`}>{tile.title}</Link>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      

      


      <Box mt={5}>
      </Box>
    </Container>
  );
}