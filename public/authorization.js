
const login = document.querySelector('#user'),
      password = document.querySelector('#pass'),
      authForm = document.querySelector('.auth'),
      nav = document.querySelector('.col-sm-1');

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

    if ((await response).status == 200) {
        authForm.style.display = 'none';
        nav.style.display = 'block';
        console.log("hello");
    }
}