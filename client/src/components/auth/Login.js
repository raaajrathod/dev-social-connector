import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {login} from "../../actions/AuthAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    // console.log(formData);
    login({
      email,
      password
    });
  };

  // Redirect to Dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const {email, password} = formData;

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            autoComplete='username'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            autoComplete='current-password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have Account ? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.AuthReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  {login}
)(Login);
