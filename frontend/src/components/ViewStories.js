/*
* Author: Bradley Newlon
* Purpose: The purpose of this component is to retrieve a list of all stories in the database and display them so that the user can choose which adventure story
* they would like to play through.
* 
*/

import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

import axios from 'axios';
import { SERVER } from '../utils/server';

//Styles for displaying individual stories
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
    },
    pos: {
      marginBottom: 12,
    },
  });

const ViewStories = (props) => {
    const classes = useStyles();
    const [stories, setStories] = useState([]); //used to set and store all stories

    useEffect(() => {
        //getting stories and setting the state variable
        axios.get(`${SERVER}/story/`)
        .then(response => {
            setStories(response.data.stories);
        })
        .catch(error => {
            console.log(error);
        })
    }, []); //pass in an empty array for dependencies so useEffect only gets called on mount


    return(
        <div>
            <Container>
                <br />
                <br />
                <Grid container spacing={3}>
                    {
                        stories.map((val, idx)=> {
                            return(
                                <Grid item xs={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <Typography className={classes.title} component="h1" gutterBottom>
                                                <Link to={`/story/${val._id}`}>{val.title}</Link>
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                By: {val.author}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {val.text}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )

}


export default ViewStories;