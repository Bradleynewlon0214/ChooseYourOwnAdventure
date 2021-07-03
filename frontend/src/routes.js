import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import AddStory from './components/AddStory';
import ViewStories from './components/ViewStories';
import ViewStory from './components/ViewStory';

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={ViewStories} />
        <Route exact path="/story/:id" component={ViewStory} />
        <Route exact path="/story/:id/:levelId" component={ViewStory} />
        <Route exact path="/add" component={AddStory} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/profile" component={Profile} />
    </div>
);

export default BaseRouter;