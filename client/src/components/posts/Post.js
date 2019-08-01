import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getPostDetails, removeComment} from "../../actions/PostAction";
import Moment from "react-moment";
import PostComment from "./PostComment";

const Post = ({match, getPostDetails, post: {post}, auth, removeComment}) => {
  useEffect(() => {
    getPostDetails(match.params.id);
  }, [getPostDetails, match]);

  if (post === null) {
    return <Spinner />;
  }
  let comments;
  if (post !== null && post.comments.length > 0) {
    comments = post.comments.map(comment => (
      <div className='post bg-white p-1 my-1' key={comment._id}>
        <div>
          <a href={`/profile/${comment.user}`}>
            <img
              className='round-img'
              src={comment.avatar}
              alt={comment.name}
            />
            <h4>{comment.name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{comment.text} </p>
          <p className='post-date'>
            Posted on{" "}
            <Moment format='DD/MM/YYYY hh:mm A'>{comment.date}</Moment>
          </p>
          {!auth.loading && auth.user._id === comment.user && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={e => removeComment(post._id, comment._id)}>
              <i className='fas fa-times' />
            </button>
          )}
        </div>
      </div>
    ));
  }
  return (
    <Fragment>
      <a href='posts.html' className='btn'>
        Back To Posts
      </a>
      <div className='post bg-white p-1 my-1'>
        <div>
          <a href={`/profile/${post.user}`}>
            <img className='round-img' src={post.avatar} alt={post.name} />
            <h4>{post.name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{post.text} </p>
        </div>
      </div>
      {/* Post Comment Section */}
      <PostComment postId={post._id} />
      {post.comments.length > 0 ? (
        <div className='comments'>{comments}</div>
      ) : (
        "No Comments Yet!"
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPostDetails: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.PostReducer,
  auth: state.AuthReducer
});

export default connect(
  mapStateToProps,
  {
    getPostDetails,
    removeComment
  }
)(Post);
