import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({experiences}) => {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experiences.map(experience => (
        <div key={experience._id}>
          <h3 className='text-dark'>{experience.company}</h3>
          <p>
            {" "}
            <Moment format='YYYY/MM/DD'>{experience.from}</Moment> -{" "}
            {experience.current ? (
              "Now"
            ) : (
              <Moment format='YYYY/MM/DD'>{experience.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position: </strong>
            {experience.title}
          </p>
          {experience.description && (
            <p>
              <strong>Description: </strong>
              {experience.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

ProfileExperience.propTypes = {
  experiences: PropTypes.array.isRequired
};

export default ProfileExperience;
