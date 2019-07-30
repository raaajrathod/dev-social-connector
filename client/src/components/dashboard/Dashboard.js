import React, {useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadProfile} from "../../actions/ProfileAction";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experiance from "./Experiance";
import Education from "./Education";

const Dashboard = ({ProfileReducer, auth, loadProfile}) => {
  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
  }, []);

  const {profile, loading} = ProfileReducer;
  const {user} = auth;

  if (loading && profile === null) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experiance experiance={profile.experiances} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <h5> You Have not Created a Profile, Please add some info!</h5> {"  "}
          <Link to='/create-profile' className='btn btn-primary my-1 mx-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  ProfileReducer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ProfileReducer: state.ProfileReducer,
  auth: state.AuthReducer
});

export default connect(
  mapStateToProps,
  {loadProfile}
)(Dashboard);
