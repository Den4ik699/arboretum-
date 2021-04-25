
const login = document.querySelector('#user'),
      password = document.querySelector('#pass'),
      authForm = document.querySelector('.auth');
      //btnAuth = document.querySelector('#'btn-auth')

async function startAuth() {
    const data = {
        username: login.value,
        password: password.value
    }
    const response = fetch(`/api/authorization`, {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok === true) {
        console.log('asdasdasd');
        authForm.style.display = 'none';
    }
}