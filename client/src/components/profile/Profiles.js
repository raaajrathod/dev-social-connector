import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAllProfile} from "../../actions/ProfileAction";
import Spinner from "../layout/Spinner";
import ProfileItems from "./ProfileItems";

const Profiles = ({getAllProfile, profile: {profiles, loading}}) => {
  useEffect(() => {
    getAllProfile();
  }, [getAllProfile]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.map(profile => {
              return <ProfileItems key={profile._id} profile={profile} />;
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.ProfileReducer
});

export default connect(
  mapStateToProps,
  {getAllProfile}
)(Profiles);
