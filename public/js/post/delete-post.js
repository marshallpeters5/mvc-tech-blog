const deletePostHandler = async () => {
    const postId = window.location.pathname.split('/').pop();
  
    const response = await fetch(`/posts/delete/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete the post. Please try again.');
    }
  };
  
  document.querySelector('#delete-post').addEventListener('click', deletePostHandler);
  