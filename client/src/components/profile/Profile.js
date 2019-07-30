import React, {useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getProfileById, getGithubRepos} from "../../actions/ProfileAction";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  match,
  profile: {profile, loading},
  auth,
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);

  return (
    <Fragment>
      <Link to='/profiles' className='btn btn-light my-1'>
        Back To Profiles
      </Link>
      {/* {auth.isAuthenticated &&
        !auth.loading &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-light my-1'>
            Edit Your Profile
          </Link>
        )} */}
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          {profile.experiances.length > 0 ? (
            <ProfileExperience experiences={profile.experiances} />
          ) : (
            <Fragment />
          )}
          {profile.education.length > 0 ? (
            <ProfileEducation educations={profile.education} />
          ) : (
            <Fragment />
          )}
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.ProfileReducer,
  auth: state.AuthReducer
});

export default connect(
  mapStateToProps,
  {getProfileById, getGithubRepos}
)(Profile);
