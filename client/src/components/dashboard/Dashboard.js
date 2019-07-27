import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadProfile} from "../../actions/ProfileAction";

const Dashboard = ({profile, auth, loadProfile}) => {
  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
  }, []);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.ProfileReducer,
  auth: state.AuthProfile
});

export default connect(
  mapStateToProps,
  {loadProfile}
)(Dashboard);
