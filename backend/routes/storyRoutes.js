/*
* Author: Bradley Newlon
* This file defines the routes for adding a new story, getting a list of all stories, or getting a story by id
*/
 
const router = require('express').Router();
const Story = require('../models/Story');
const jwt = require ('jsonwebtoken');


//POST Request endpoint for adding a story
router.post('/add', (req, res) => {
    const story = Story(req.body);
    try{
        story.save();
        res.send({storyId: story._id, message: "Success!"});
    } catch(e){
        console.log(e);
        res.send({error: e});
    }
})

//GET Request endpoint for retrieving a list of all stories
router.get('/', async (req, res) => {
    const stories = await Story.find({}); //passing {} will get all objects in collection
    res.send({stories: stories});
})

//Get Request endpoint for retriveing a story given it's id
router.get('/:storyId', async (req, res) => {
    const story = await Story.findOne({_id: req.params.storyId});
    res.send({story: story});
})


module.exports = router;