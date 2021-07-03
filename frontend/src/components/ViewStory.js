/*
* Author: Bradley Newlon
* Purpose: The purpose of this component is to retrieve a given story where the story id is in the url. This component fetches the story from the backend then displays 
* they story in such a way that the user can only see one level at a time, and they have the option to choose which level they would like to go to next.
*/

import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import { useParams } from 'react-router-dom'; //used to get the id from the url

import axios from 'axios';
import { SERVER } from '../utils/server';

const ViewStory = (props) => {

    const [story, setStory] = useState({}); //used for storing story to be traversed
    const [currentLevel, setCurrentLevel] = useState({}); //used for traversing story

    const { id } = useParams(); //getting id from url

    useEffect(() => {
        //getting story by id
        axios.get(`${SERVER}/story/${id}`)
        .then(response => {
            const s = response.data.story;
            setStory(s);
            setCurrentLevel({title: s.title, text: s.text, options: s.options});
        })
        .catch(error => {
            console.log(error);
        })
    }, [id]);

    //changes components current level thats being displayed
    function changeLevel(id){
        console.log(id);
        const levels = story.levels;
        setCurrentLevel(levels[id]);
    }
    
    return(
        <Container>
            <br />
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <h1>
                                {story.title}
                            </h1>
                            <p>
                                By: {story.author}
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <h1>
                                {currentLevel.title}
                            </h1>
                            <p>
                                {currentLevel.text}
                            </p>
                            {
                                (currentLevel.options) ?
                                    currentLevel.options.map((val, idx) => {
                                        console.log(val);
                                        return(
                                            <Button onClick={(e) => changeLevel(val.id)} color="primary">
                                                {val.title}
                                            </Button>
                                        )
                                    })
                                :
                                <h1>Loading...</h1>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ViewStory;