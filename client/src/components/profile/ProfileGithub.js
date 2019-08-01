import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {getGithubRepos} from "../../actions/ProfileAction";
import {connect} from "react-redux";

const ProfileGithub = ({getGithubRepos, profile: {repos}, username}) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  if (repos.length === 0) {
    return <Fragment />;
  }

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github' /> Github Repos
      </h2>
      {repos.splice(0, 4).map(repo => (
        <div key={repo.id} className='repo bg-white p-1 my-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge badge-primary'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='badge badge-dark'>
                Watchers: {repo.watchers_count}
              </li>
              <li className='badge badge-light'>Forks: {repo.forks}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  profile: state.ProfileReducer
});

export default connect(
  mapStateToProps,
  {getGithubRepos}
)(ProfileGithub);
