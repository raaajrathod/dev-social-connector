import React, {useState} from "react";
import PropTypes from "prop-types";
import {addComment} from "../../actions/PostAction";
import {connect} from "react-redux";

const PostComment = ({addComment, postId}) => {
  const [text, setText] = useState("");

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, text);
          setText("");
        }}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostComment.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addComment
  }
)(PostComment);
