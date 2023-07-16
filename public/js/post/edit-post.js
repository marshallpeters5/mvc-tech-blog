const editPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const postId = window.location.pathname.split('/').pop();
  
    if (title && content) {
      const response = await fetch(`/posts/edit/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update the post. Please try again.');
      }
    }
  };
  
  document.querySelector('#edit-post-form').addEventListener('submit', editPostFormHandler);
  