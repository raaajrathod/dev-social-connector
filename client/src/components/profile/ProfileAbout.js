import React, {Fragment} from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({profile}) => {
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>{profile.user.name}'s Bio</h2>
      {profile.bio && <p>{profile.bio}</p>}
      {profile.skills.length > 0 ? (
        <Fragment>
          <div className='line' />
          <h2 className='text-primary'>Skill Set</h2>
          <div className='skills'>
            {profile.skills.map((skill, index) => (
              <div className='p-1' key={index}>
                <i className='fa fa-check' /> {skill}
              </div>
            ))}
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
