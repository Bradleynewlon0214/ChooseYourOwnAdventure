import React, {useState} from 'react';
import { Rnd } from 'react-rnd';

import { withStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';


import axios from 'axios';
import { SERVER } from '../utils/server';


/*
* Author: Bradley Newlon
* Purpose: The purpose of this component is to provide a way for the user to create and upload their own custom adventure story.
* In this file two components are defined. AddStory, which lays out or form for creating a new story, maintains what data the user has entered, and provides a container for our LevelItems
* components which are dynamically added whenever the user needs to define another level in their story. LevelItem, is a draggable box that contains a form for creating the content for each level
* which AddStory also keeps track of.
* 
* What works: creating new level, dragging level, storing each level's data and updating it on change
* What doesn't: removing a level
* Needs done: styling, posting to backend, fix removing a level
*
* A story is a stored as a json object in the form of:
* {
*   title: String, 
*   text: String,
*   options: [],
*   levels: [
*       {
*           title: String,
*           text: String,
*           options: [],
*       },
*       ...
*   ]
* }
*/


/* 
* LevelItem is a sub-component of AddStory. LevelItem gets passed down from AddStory the following props: id, levels, onLevelChange, onLevelRemove.
* Id is the current level's id which is that level's current index inside the story's list of current levels
* Levels is just a list of all the other levels AddStory is storing that way a user can specify which level(s) a given level will direct to.
* onLevelChange is a function passed down from AddStory which handles the onChange event on each input item for the given level. This function will update a given level's data in AddStory's
*   state.
* onLevelRemove is a function passed down from AddStory that handles removing a given level from AddStory's state and upon doing so will remove the level from the screen
*/
export const LevelItem = ({ id, levels, onLevelChange, onLevelRemove, onCheckboxChange}) => {

    // const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0}); //defining state variables to keep track of the components current location. only used for debugging purposes

    const [expand, setExpand] = useState(true); //if the box is expanded or not, used to override clicking anywhere on the accordion header causing the whole box to collapse. now only clicking the button collapses the box

    const [title, setTitle] = useState(null);

    //utility function for updating deltaPosition when the component is moved. only used for debugging purposes 
    // function handleDrag(e, ui){
    //     const {x, y} = deltaPosition;
    //     setDeltaPosition({x: x + ui.deltaX, y: y + ui.deltaY});
    // }


    return( 
        <Rnd
            default={{
                x: 0,
                y: 0,
                width: 400,
                height: 500
            }}
        >
            
            <Accordion expanded={expand}>
                <AccordionSummary style={{ backgroundColor: "#3f51b5", color: "white" }} >
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div style={{ paddingTop: "4%" }}>
                                {(title) ? title : "Your Level's Title will appear here"}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={(e)=> {setExpand(!expand) }} style={{ float: 'right' }}><ExpandMoreIcon style={{ color: "white" }} /></Button>
                        </Grid>
                    </Grid>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField name="title" fullWidth placeholder="Level Title" onChange={(e) => {onLevelChange(e, id); setTitle(e.target.value)}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="text" fullWidth multiline rows={8} placeholder="Level Story" onChange={(e) => onLevelChange(e, id)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <h4>Select Next Levels</h4>
                            {
                                levels.map((val, idx) => {
                                    return(
                                        <FormControlLabel 
                                            control={<Checkbox color="primary" id={val.id} value={val.title} onChange={(e) => onCheckboxChange(e, id, val.id, val.title)} />}
                                            label={val.title}
                                            labelPlacement="end"
                                        />    
                                    )
                                })
                            }

                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" onClick={(e) => onLevelRemove(e, id)}>Remove Level</Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </Rnd>
    )
}


const addStoryStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    }
});


class AddStory extends React.Component {

    state = {
        author: "", //the story's author
        title: "", //the story's title
        text: "", //the story's intro text
        options: [], //the story's initial options
        levels: [], //the story's list of levels which holds multiple objects in the form: {id: Int, title: "", text: "", options: []}
    };

    componentDidMount(){
        const username = localStorage.getItem('username');
        if(!username){
            this.props.history.push("/");
        } else {
            this.setState({
                author: username,
            });
        }
    }
    
    /*
    * addLevel is executed when the Add Level button is clicked. This function updates the components levels after appending on a new object onto levels
    */
    addLevel = (e) => {
        e.preventDefault();
        const levelsLen = this.state.levels.length;
        this.setState((prevState) => ({
            levels: [...prevState.levels, {id: levelsLen, title: "", text: "", options: []}] // ... is called the spread operator. it unpacks a list. ex: given a list containing [1, 2, 3] named x calling [...x, 4] will produce a new list [1, 2, 3, 4] 
        }));
    }

    /*
    * handleLevelChanges accepts the normal event parameter, and a level id. the level id is a level's corresponding index in the levels list. this function is passed down to every level and
    * is used to listen for change on each of the levels input fields. when that input level changes, this function get's the input's name (whether it's for the title, text, etc.), and it's new
    * value. the function then updates this component's state to contain the updated information.
    */
    handleLevelChanges = (e, id) => {
        e.preventDefault();
        const name = e.target.name;
        const val = e.target.value;
        let levels = [...this.state.levels];
        levels[id][name] = val;
        this.setState({levels});
    }

    /*
    * This function is padded down to each LevelItem and it monitors the state of each checkbox in it's respective component. Each checkbox in the component represents another level in the whole story
    * users can define a level such that is has multiple next levels and checking a checkbox adds that respective level to that level's next options.
    */
    handleLevelCheckboxChange = (e, currentId, levelToAddId, levelToAddTitle) => {
        e.preventDefault();
        const checked = e.target.checked;
        let levels = [...this.state.levels];
        const options = levels[currentId]["options"];
        if(checked){
            options.push({id: levelToAddId, title: levelToAddTitle});
        } else{
            var index = options.find(item => item.id === levelToAddId);
            options.splice(index, 1);
        }
        levels[currentId]["options"] = options;
        this.setState({levels});
        
    }

    handleStoryCheckboxChange = (e, levelToAddId, levelToAddTitle) => {
        const checked = e.target.checked;
        let options = [...this.state.options];
        if(checked){
            options.push({id: levelToAddId, title: levelToAddTitle});
        } else {
            var index = options.find(item => item.id === levelToAddId);
            options.splice(index, 1);
        }
        this.setState({options});
    }

    /*
    * this function is also passed down to each level and is intended to handle the removal of that level, if the user so chooses. however, it does not work at the moment.
    */
    handleLevelRemove = (e, id) => {
        e.preventDefault();
        let levels = [...this.state.levels];
        levels.splice(id, 1);
        this.setState({levels});
        this.forceUpdate();
    }

    postStory = (e) => {
        e.preventDefault();
        axios.post(`${SERVER}/story/add`, this.state)
        .then(response => {
            console.log(response);
            this.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const { levels } = this.state; //unpacking levels from the component's state
        const { classes } = this.props; //unpacking classes from props mapped to the component
        console.log(this.state);
        return(
            <div className={classes.root}>
                <Container>
                    <br />
                    <br />
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <h1>{(this.state.title) ? this.state.title : "Your Story's Title Will Appear Here"}  </h1>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField 
                                        label="Story Title"
                                        style={{ margin: 8 }}
                                        placeholder="What's the title of your story?"
                                        fullWidth
                                        margin="normal"
                                        onChange={(e) => this.setState({title: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        label="Story Introduction"
                                        style={{ margin: 8 }}
                                        placeholder="Write the first chapter of your story here!"
                                        multiline
                                        fullWidth
                                        rows={10}
                                        onChange={(e) => this.setState({text: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <h4>Choose Story Starting Point(s):</h4>
                                    {
                                        levels.map((val, idx) => {
                                            return(
                                                <FormControlLabel 
                                                    control={<Checkbox color="primary" onChange={(e) => this.handleStoryCheckboxChange(e, val.id, val.title)} />}
                                                    label={val.title}
                                                    labelPlacement="end"
                                                />    
                                            )
                                        })
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth color="primary" variant="contained" onClick={this.postStory}>Post Story</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <br />
                    <Button color="primary" variant="contained" style={{ marginRight: 5 }} onClick={this.addLevel}>Add Level</Button>
                    
                    {
                        levels.map((val, idx) => {
                            return(
                                <LevelItem id={idx} levels={levels} onLevelChange={this.handleLevelChanges} onLevelRemove={this.handleLevelRemove} onCheckboxChange={this.handleLevelCheckboxChange}/>
                            )
                        })
                    } 
                </Container>               
            </div>
        );
    }
}

export default withStyles(addStoryStyles, {withTheme: true})(AddStory);