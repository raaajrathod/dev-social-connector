import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {deleteProfile} from "../../actions/ProfileAction";

const DeleteProfile = ({deleteProfile, history}) => {
  return (
    <div className='my-2'>
      <button className='btn btn-danger' onClick={() => deleteProfile(history)}>
        <i className='fas fa-user-minus' /> Delete My Account
      </button>
    </div>
  );
};

DeleteProfile.propTypes = {
  deleteProfile: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   user: state.AuthReducer.user
// });

export default connect(
  null,
  {deleteProfile}
)(withRouter(DeleteProfile));
