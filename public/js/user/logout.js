const logoutHandler = async () => {
    const response = await fetch('/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out. Please try again.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logoutHandler);
  