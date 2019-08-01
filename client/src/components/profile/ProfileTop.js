import React, {Fragment} from "react";
import PropTypes from "prop-types";

const ProfileTop = ({profile}) => {
  return (
    <Fragment>
      <div className='profile-top bg-primary p-2'>
        <img
          className='round-img my-1'
          src={profile.user.avatar}
          alt={profile.user.name}
        />
        <h1 className='large'>{profile.user.name}</h1>
        <p className='lead'>
          {profile.status}{" "}
          {profile.company && <span>at {profile.company}</span>}
        </p>
        <p>{profile.location && <span>{profile.location}</span>}</p>

        {profile.social.githubusername && (
          <div className='icons my-1'>
            <a
              href={`https://github.com/${profile.social.githubusername}`}
              target='_blank'
              rel='noopener noreferrer'>
              <i className='fas fa-globe fa-2x' />
            </a>
            {profile.social.twitter && (
              <a
                href={`https://twitter.com/${profile.social.twitter}`}
                target='_blank'
                rel='noopener noreferrer'>
                <i className='fab fa-twitter fa-2x' />
              </a>
            )}

            {profile.social.facebook && (
              <a
                href={`https://www.facebook.com/${profile.social.facebook}`}
                target='_blank'
                rel='noopener noreferrer'>
                <i className='fab fa-facebook fa-2x' />
              </a>
            )}

            {profile.social.linkedin && (
              <a
                href={`https://www.linkedin.com/in/${profile.social.linkedin}`}
                target='_blank'
                rel='noopener noreferrer'>
                <i className='fab fa-linkedin fa-2x' />
              </a>
            )}

            {profile.social.youtube && (
              <a
                href={`https://www.youtube.com/user/${profile.social.youtube}`}
                target='_blank'
                rel='noopener noreferrer'>
                <i className='fab fa-youtube fa-2x' />
              </a>
            )}

            {profile.social.instagram && (
              <a
                href={`https://instagram.com/${profile.social.instagram}`}
                target='_blank'
                rel='noopener noreferrer'>
                <i className='fab fa-instagram fa-2x' />
              </a>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
