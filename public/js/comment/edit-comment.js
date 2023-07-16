const editCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();
    const commentId = window.location.pathname.split('/').pop();
  
    if (comment_text) {
      const response = await fetch(`/comments/edit/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ comment_text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to update the comment. Please try again.');
      }
    }
  };
  
  document.querySelector('#edit-comment-form').addEventListener('submit', editCommentFormHandler);
  