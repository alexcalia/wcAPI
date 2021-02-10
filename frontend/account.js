const account = {};

account.greeting = document.getElementById('greeting');
account.apiKey = document.getElementById('apiKey');
account.userID = document.getElementById('userID');

account.getAccount = async () => {
  const data = await fetch('http://localhost:3000/api/user/account', {
      method: 'GET',
      credentials: 'include'
    })
    .then( async response => {
      if (response.status === 401) {
        await fetch('http://localhost:3000/api/user/refresh_token', {
          method: 'GET',
          credentials: 'include'
        });
        const refreshData = await fetch('http://localhost:3000/api/user/account', {
          method: 'GET',
          credentials: 'include'
        })
        .then (response => {
          return response.json()
        });
        return refreshData
      } else if (!response.ok) {
        account.greeting.innerHTML = 'Login session has expired, please login again';
      } else {
        return response.json()
      }
    })
    .catch(err => {
      console.log(err)
    })

    account.greeting.innerHTML = `Welcome, ${data.name}`;
    account.apiKey.innerHTML = data.apikey;
    account.userID.innerHTML = data.email;
  
}

document.addEventListener("DOMContentLoaded", account.getAccount());