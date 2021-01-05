const register = {};

// Cache
register.name = document.getElementById('name');
register.email = document.getElementById('email');
register.password = document.getElementById('password');

// Register submit
register.submit = async (event) => {
  const data = {
      name: register.name.value,
      email: register.email.value,
      password: register.password.value
    }

  event.preventDefault();
  const response = await fetch('http://localhost:3000/api/user/register', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  console.log(response)
}