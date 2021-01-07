const login = {}

// Cache
login.email = document.getElementById('email');
login.password = document.getElementById('password');
login.apikey = document.getElementById('apikey');

login.loginRequest = (data) => {
  fetch('http://localhost:3000/api/user/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.text())
  .then(response => login.apikey.innerHTML = `API Key: ${response}`)
}

//Login submit
login.submit = (event) => {
  const data = {
    email: login.email.value,
    password: login.password.value
  }

  event.preventDefault();

  login.loginRequest(data);
}