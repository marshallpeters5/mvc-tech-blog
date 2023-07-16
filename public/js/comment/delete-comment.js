const deleteCommentHandler = async () => {
    const commentId = window.location.pathname.split('/').pop();
  
    const response = await fetch(`/comments/delete/${commentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete the comment. Please try again.');
    }
  };
  
  document.querySelector('#delete-comment').addEventListener('click', deleteCommentHandler);
  