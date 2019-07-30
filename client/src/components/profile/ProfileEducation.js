import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({educations}) => {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {educations.map(education => (
        <div key={education._id}>
          <h3>{education.school}</h3>
          <p>
            {" "}
            <Moment format='YYYY/MM/DD'>{education.from}</Moment> -{" "}
            {education.current ? (
              "Now"
            ) : (
              <Moment format='YYYY/MM/DD'>{education.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree: </strong>
            {education.degree}
          </p>
          {education.fieldofstudy && (
            <p>
              <strong>Field Of Study: </strong>
              {education.fieldofstudy}
            </p>
          )}

          {education.description && (
            <p>
              <strong>Description: </strong>
              {education.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

ProfileEducation.propTypes = {
  educations: PropTypes.array.isRequired
};

export default ProfileEducation;
