const register = {};

// Cache
register.name = document.getElementById('name');
register.email = document.getElementById('email');
register.password = document.getElementById('password');

// Register submit

register.submit = async (event) => {
  event.preventDefault();
  const response = await fetch('localhost:3000/api/user/register', {
    method: 'POST',
    body: {
      name: register.name.value,
      email: register.email.value,
      password: register.password.value
    }
  })

  console.log(response)
}