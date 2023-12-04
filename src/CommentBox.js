import React, { useState } from 'react';
import './styles.css';

const CommentBox = () => {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment, replies: [] }]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentIndex, replyText) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.push({ text: replyText, nestedReplies: [] });
    setComments(updatedComments);
  };

  const handleAddNestedReply = (commentIndex, replyIndex, nestedReplyText) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].nestedReplies.push({ text: nestedReplyText });
    setComments(updatedComments);
  };

  const handleDeleteComment = (commentIndex) => {
    const updatedComments = [...comments];
    updatedComments.splice(commentIndex, 1);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1);
    setComments(updatedComments);
  };

  const handleDeleteNestedReply = (commentIndex, replyIndex, nestedReplyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].nestedReplies.splice(nestedReplyIndex, 1);
    setComments(updatedComments);
  };

  return (
    <div className="comment-box">
      <div className="comment-input">
        <input
          type="text"
          placeholder="Add a public comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>

      <div className="comments">
        {comments.map((comment, commentIndex) => (
          <div key={commentIndex} className="comment">
            <div className="comment-text">{comment.text}</div>
            <div
              className="delete-btn"
              onClick={() => handleDeleteComment(commentIndex)}
            >
              Delete
            </div>

            <div className="reply-input">
              <input
                type="text"
                placeholder="Reply..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddReply(commentIndex, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            <div className="replies">
              {comment.replies.map((reply, replyIndex) => (
                <div key={replyIndex} className="reply">
                  <div className="comment-text">{reply.text}</div>
                  <div
                    className="delete-btn"
                    onClick={() => handleDeleteReply(commentIndex, replyIndex)}
                  >
                    Delete
                  </div>

                  <div className="nested-reply-input">
                    <input
                      type="text"
                      placeholder="Nested Reply..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddNestedReply(commentIndex, replyIndex, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>

                  <div className="nested-replies">
                    {reply.nestedReplies.map((nestedReply, nestedReplyIndex) => (
                      <div key={nestedReplyIndex} className="nested-reply">
                        <div className="comment-text">{nestedReply.text}</div>
                        <div
                          className="delete-btn"
                          onClick={() => handleDeleteNestedReply(commentIndex, replyIndex, nestedReplyIndex)}
                        >
                          Delete
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>Thanks for participating in the conversation!</p>
      </div>
    </div>
  );
  };


export default CommentBox;


