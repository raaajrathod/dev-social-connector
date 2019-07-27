import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/AuthAction";
const Navbar = ({auth: {loading, isAuthenticated}, logout}) => {
  const onClick = () => {
    logout();
  };
  const authenticatedLinks = (
    <ul>
      <li>
        <Link to='profiles.html'>Developers</Link>
      </li>
      <li>
        <Link to='posts.html'>Posts</Link>
      </li>
      <li>
        <Link to='dashboard.html' title='Dashboard'>
          <i className='fas fa-user' />{" "}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/' title='Logout' onClick={onClick}>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const notAuthenticatedLinks = (
    <ul>
      <li>
        <Link to='/developers'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated ? authenticatedLinks : notAuthenticatedLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.AuthReducer
});

export default connect(
  mapStateToProps,
  {
    logout
  }
)(Navbar);
