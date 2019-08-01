import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPost} from "../../actions/PostAction";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({getPost, post: {posts, loading}}) => {
  useEffect(() => {
    getPost();
  }, [getPost]);

  if (posts.length === 0 && loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community!
      </p>
      <PostForm />
      <div className='posts'>
        {posts.length > 0 &&
          posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.PostReducer
});
export default connect(
  mapStateToProps,
  {getPost}
)(Posts);
