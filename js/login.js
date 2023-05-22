import {getLoginInfo} from"./firebase.js";
// Login Form
console.log(document.getElementById('login-form'))
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const svar = await getLoginInfo();
    if(svar.username == username && svar.password == password){
        localStorage.setItem('loggedIn', true);
        window.location.href = './index.html';
    }else{
        document.getElementById('username').style.borderColor = 'red';
        document.getElementById('password').style.borderColor = 'red';
        alert('Wrong username or password');
        document.getElementById('login-form').reset();
    }
    // console.log(username, password, svar);
})