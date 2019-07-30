import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import {Link} from "react-router-dom";

const ProfileItems = ({profile}) => {
  return (
    <div className='profile bg-light' key={profile._id}>
      <img
        className='round-img'
        src={profile.user.avatar}
        alt={profile.user.name}
      />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status} {profile.company ? `at ${profile.company}` : ""}{" "}
        </p>
        <p>{profile.location && <span>{profile.location}</span>}</p>
        <Link to={`/profile/${profile.user._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skills.slice(0, 4).map((skill, index) => (
          <li key={uuid.v4()} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItems;
