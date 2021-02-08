const account = {};

account.greeting = document.getElementById('greeting');
account.apiKey = document.getElementById('apiKey');
account.userID = document.getElementById('userID');

account.getAccount = () => {
  fetch('http://localhost:3000/api/user/account', {
    method: 'GET',
    credentials: 'include'
  })
  .then(response => {
    return response.json()
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