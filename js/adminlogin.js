// define the URL for fetching data
const adminUrl = `https://liaconnect-default-rtdb.europe-west1.firebasedatabase.app/admin.json`;
// console.log(adminUrl);

//get login element from DOM
const adminInputName = document.querySelector('#userName')
const adminInputPassword = document.querySelector('#password')
const loginBtn = document.querySelector('#loginButton')

//Attch event listener to the login button
loginBtn.addEventListener('click',handleLogin);

//login event handler
 async function handleLogin(event){
    event.preventDefault();
    try{
        // fetch admin data 
        const data = await fetchAdminData();
        console.log(data)

        // verify login credentials
        const username = adminInputName.value;
        const password = adminInputPassword.value;
        if (verifyCredentials(data, username, password)){
            // Store logged-in user data in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(data));
            // redirect to home page
            window.location.href = "index.html";
        } else {
            // display error message
            alert('Must be admin to continue')
            console.log('Invalid credentials');
        }

    } catch(error){
        // handle fetch or verification errors
        console.log('error:', error.message);
    }
}
// fetch admin data 
async function fetchAdminData(){
    const response = await fetch(adminUrl);
    if (!response.ok){
        throw new Error('Failed to fetch admin data')
        
    }
    return await response.json();
}

// verify login credentials

function verifyCredentials(data, username, password){
    if(data && data.username === username && data.password === password){
        return true;
    }
    return false;
}


export { handleLogin };

