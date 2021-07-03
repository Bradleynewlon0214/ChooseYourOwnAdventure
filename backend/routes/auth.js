/*
* Authentication Routes
* Author: Bradley Newlon
* This file defines the authentication routes and their behavoir for login/signup
*/
const router = require('express').Router();
const User = require('../models/User');
const Story = require('../models/Story');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/*
* this expects a json object in the form {username: String, email: String, password1: String, password2: String}
* the route validates the posted data, checks if a user already exists with that email, hashes the users password,
* then saves the new user, the route will return a jwt token that validates the user is signed in, and if anything goes
* wrong, the route returns a 400 status code and an error message
*/
router.post('/register', async (req, res) =>{
    // validate posted data
    // const { error } = registerValidation(req.body);
    // if(error){
    //     return res.status(400).send(error);
    // }

    // check unique
    const emailExists = await User.findOne({"email": req.body.email}).exec();

    if(emailExists){
        return res.status(400).send("A user with that email already exists.");
    } else {
        //Hash password and Register
        const saltRounds = 10;
        bcrypt.hash(req.body.password1, saltRounds).then(function(hash){
            const user = User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });
            try{
                user.save();
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
                res.header('auth-token', token).send({key: token, username: user.username});
            } catch(error){
                res.status(400).send(error);
            }
        });
        
    }

    
});

/*
* Expects a json object in the form {email: String, password: String}
* This route validates the recieved json, check if the user exists, gets the users hashed password,
* then hashes the given password and compares the two, the route finally returns a jwt if everything matches up
*/
router.post('/login', async (req, res) => {
    //validate posted data
    // const { error } = loginValidation(req.body);
    // if(error){
    //      return res.status(400).send(error);
    // }

    //check if email exists
    const user = await User.findOne({email: req.body.email}).exec();

    if(!user){
        return res.status(400).send("User with that email does not exist");
    }


    bcrypt.compare(req.body.password, user.password).then(function(result){
        if(!result) return res.status(400).send("Invalid password");

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({key: token, username: user.username});
        
    });

});


/*
* Expects a username as a GET param in the url. This route takes that username and gets all the stories that are authored by that username
* This route returns a json object all all the user stories
*/
router.get('/stories/:username', async (req, res) => {
    console.log(req.params.username);
    const stories = await Story.find({author: req.params.username});
    res.send({stories: stories});
})

module.exports = router;