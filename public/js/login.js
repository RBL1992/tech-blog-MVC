const loginBtn = $('#login-btn')

const loginFormHandler = async (event) => {

  event.preventDefault();

  const username = $('#username-login').val().trim();
  const password = $('#password-login').val().trim();

  if (username && password) {
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert('Failed to log in');
      }
  }
};

loginBtn.click(loginFormHandler);

