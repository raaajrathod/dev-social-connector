import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {connect} from "react-redux";
import {addLike, removeLike, deletePost} from "../../actions/PostAction";

const PostItem = ({auth, post, addLike, removeLike, deletePost}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className='round-img' src={post.avatar} alt={post.name} />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{post.text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY hh:mm A'>{post.date}</Moment>
        </p>
        <button
          onClick={e => addLike(post._id)}
          type='button'
          className={`btn ${
            post.like.find(like => {
              if (!auth.loading) {
                return like.user === auth.user._id;
              }
            })
              ? "btn-primary"
              : "btn-light"
          }`}>
          <i className='fas fa-thumbs-up' />{" "}
          {post.like.length > 0 && <span>{post.like.length}</span>}
        </button>

        {post.like.find(like => {
          if (!auth.loading) {
            return like.user === auth.user._id;
          }
        }) && (
          <button
            onClick={e => removeLike(post._id)}
            type='button'
            className='btn btn-light'>
            <i className='fas fa-thumbs-down' />
          </button>
        )}

        <Link to='/post' className='btn btn-primary'>
          Discussion{" "}
          {post.comments.length > 0 && (
            <span className='comment-count'>{post.comments.length}</span>
          )}{" "}
        </Link>
        {!auth.loading && auth.user._id === post.user && (
          <button
            onClick={e => deletePost(post._id)}
            type='button'
            className='btn btn-danger'>
            <i className='fas fa-trash-alt' />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.AuthReducer
});

export default connect(
  mapStateToProps,
  {
    addLike,
    removeLike,
    deletePost
  }
)(PostItem);
