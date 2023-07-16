const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();
    const postId = window.location.pathname.split('/').pop();
  
    if (comment_text) {
      const response = await fetch(`/comments/create/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ comment_text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create a new comment. Please try again.');
      }
    }
  };
  
  document.querySelector('#new-comment-form').addEventListener('submit', newCommentFormHandler);
  