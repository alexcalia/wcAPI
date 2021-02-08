const account = {};

account.greeting = document.getElementById('greeting');
account.apiKey = document.getElementById('apiKey');
account.userID = document.getElementById('userID');

account.getAccount = () => {
  console.log('page refreshed');
  fetch('http://localhost:3000/api/user/account', {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) {
      account.greeting.innerHTML = 'Login session has expired, please login again';
    } else {
      return response.json()
    }
  })
  .then(response => {
    account.greeting.innerHTML = `Welcome, ${response.name}`;
    account.apiKey.innerHTML = response.apikey;
    account.userID.innerHTML = response.email;
  })
  .catch(err => {
    console.log(err)
  })
}

document.addEventListener("DOMContentLoaded", account.getAccount());