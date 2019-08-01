import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {connect} from "react-redux";
import {addLike, removeLike} from "../../actions/PostAction";

const PostItem = ({auth, post, addLike, removeLike}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${post.user}`}>
          <img class='round-img' src={post.avatar} alt={post.name} />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{post.text}</p>
        <p class='post-date'>
          Posted on <Moment format='DD/MM/YYYY hh:mm A'>{post.date}</Moment>
        </p>
        <button
          onClick={e => addLike(post._id)}
          type='button'
          class={`btn ${
            post.like.find(like => {
              if (!auth.loading) {
                return like.user === auth.user._id;
              }
            })
              ? "btn-primary"
              : "btn-light"
          }`}>
          <i class='fas fa-thumbs-up' />{" "}
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
            class='btn btn-light'>
            <i class='fas fa-thumbs-down' />
          </button>
        )}

        <Link to='/post' class='btn btn-primary'>
          Discussion{" "}
          {post.comments.length > 0 && (
            <span class='comment-count'>{post.comments.length}</span>
          )}{" "}
        </Link>
        {!auth.loading && auth.user._id === post.user && (
          <button type='button' class='btn btn-danger'>
           <i class="fas fa-trash-alt"></i>
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
    removeLike
  }
)(PostItem);
