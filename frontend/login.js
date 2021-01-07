const login = {}

// Cache
login.email = document.getElementById('email');
login.password = document.getElementById('password');
login.result = document.getElementById('result');

login.loginRequest = (data) => {
  let success = true;

  fetch('http://localhost:3000/api/user/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (!response.ok) {
      success = false;
    }
    return response.text()
  })
  .then(response => {
    if (!success) {
      login.result.innerHTML = response;
    } else {
      login.result.innerHTML = `API Key: ${response}`;
    }
  });
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

// if (!response.ok) {
//       login.result.innerHTML = response.text();
//     } else {
//       login.result.innerHTML = `API Key: ${response.text()}`
//     }