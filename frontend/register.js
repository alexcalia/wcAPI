const register = {};

// Cache
register.name = document.getElementById('name');
register.email = document.getElementById('email');
register.password = document.getElementById('password');
register.result = document.getElementById('result');

// Register submit
register.registerRequest = (data) => {
  let success = true;
  fetch('http://localhost:3000/api/user/register', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (!response.ok) {
      success = false;
      return response.text()
    }
  })
  .then(response => {
    if (!success) {
      register.result.innerHTML = response
    } else {
      register.result.innerHTML = 'Account created succcessfully. Redirecting to the login page in 5 seconds...'
      setTimeout(() => {
        window.location.href = 'file:///c:/Users/alexm/Documents/javascript/wcAPI/frontend/login.html'
      }, 5000);
    }
  })
}

//Register submit
register.submit = (event) => {
  const data = {
    name: register.name.value,
    email: register.email.value,
    password: register.password.value
  }

  event.preventDefault();

  register.registerRequest(data);
}