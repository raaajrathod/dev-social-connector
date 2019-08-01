import React from "react";
import {Route, Switch} from "react-router-dom";

import Alert from "../layout/Alert";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../dashboard/CreateProfile";
import EditProfile from "../dashboard/EditProfile";
import AddEducation from "../dashboard/AddEducation";
import AddExperiance from "../dashboard/AddExperiance";
import Profiles from "../profile/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../posts/Post";
import NotFound from "../layout/NotFound";
const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/add-experiance' component={AddExperiance} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/post/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
