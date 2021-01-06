const register = {};

// Cache
register.name = document.getElementById('name');
register.email = document.getElementById('email');
register.password = document.getElementById('password');

// Register submit
register.registerRequest = (data) => {
  fetch('http://localhost:3000/api/user/register', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (!response.ok) {
      return response.text()
    } else {
      return response.json()
    }
  })
  .then(response => console.log(response))
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