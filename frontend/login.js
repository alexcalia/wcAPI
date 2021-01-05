const login = {}

// Cache
login.email = document.getElementById('email');
login.password = document.getElementById('password');

//Login submit

login.submit = async (event) => {
  const data = {
    email: login.email.value,
    password: login.password.value
  }

  event.preventDefault();
  const response = await fetch('http://localhost:3000/api/user/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  console.log(response);
}