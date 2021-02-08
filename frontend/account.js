const account = {};

account.greeting = document.getElementById('greeting');
account.apiKey = document.getElementById('apiKey');
account.userID = document.getElementById('userID');

account.getAccount = () => {
  fetch('http://localhost:3000/api/user/account', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => {
    console.log(response);
  })
}

document.addEventListener("DOMContentLoaded", account.getAccount());