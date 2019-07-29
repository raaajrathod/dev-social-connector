import React, {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/dashboard/CreateProfile";
import EditProfile from "./components/dashboard/EditProfile";
import AddEducation from "./components/dashboard/AddEducation";
import AddExperiance from "./components/dashboard/AddExperiance";
import {loadUser} from "./actions/AuthAction";
import setAuthToken from "./util/setAuthToken";
import PrivateRoute from "./components/route/PrivateRoute";
// Redux
import {Provider} from "react-redux";
import store from "./store";
import "./App.css";

if (localStorage.devConnectorToken) {
  setAuthToken(localStorage.devConnectorToken);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    //eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute
                exact
                path='/add-experiance'
                component={AddExperiance}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
