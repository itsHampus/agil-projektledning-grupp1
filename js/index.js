import { createCompanyProfile } from "./firebase.js";

const newCompanyFormContainer = document.querySelector('.newCompanyFormContainer');
newCompanyFormContainer.style.display = 'none';

const createCompanyBtn = document.querySelector('.createCompanyBtn');
createCompanyBtn.style.display = 'none';
const logOutBtn = document.getElementById('logoutBtn');
logOutBtn.style.display = 'none';
// localStorage.clear();
// console.log(createCompanyBtn.style.display);
const loggedIn = localStorage.getItem('loggedIn');
if (loggedIn) {
    createCompanyBtn.style.display = 'block';
    logOutBtn.style.display = 'block';
    // För att öppna formuläret för att lägga till företag till listan
    createCompanyBtn.addEventListener('click', () => {
        newCompanyFormContainer.style.display = 'block';
    })
    // För att stänga formuläret för att lägga till företag till listan
    const closeCompanyFormBtn = document.querySelector('.closeCompanyFormBtn');
    closeCompanyFormBtn.addEventListener('click', () => {
        newCompanyFormContainer.style.display = 'none';
        document.querySelector('.newCompanyForm').reset(); //Rensa formuläret
    })



    document.querySelector('.newCompanyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const companyName = document.querySelector('.companyNameInput').value;
        const companyPhone = document.querySelector('.companyPhoneNumberInput').value;
        const companyEmail = document.querySelector('.companyEmailInput').value;
        const companyCity = document.querySelector('.companyCityInput').value;
        const companyBranch = document.querySelector('.companyBranchSelect').value;
        const companyPeriod = document.querySelector('.companyPeriodSelect').value;
        const companySpots = document.querySelector('.companySpotsInput').value;
        const companyAbout = document.querySelector('.companyAboutInput').value;
        const newCompanyObject = {
            companyName: companyName,
            companyPhone: companyPhone,
            companyEmail: companyEmail,
            companyCity: companyCity,
            companyBranch: companyBranch,
            companyPeriod: companyPeriod,
            companySpots: companySpots,
            companyAbout: companyAbout
        }
        await createCompanyProfile(newCompanyObject);
        document.querySelector('.newCompanyForm').reset(); //Rensa formuläret
        newCompanyFormContainer.style.display = 'none'; // Stäng formuläret
    })

    logOutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        location.reload();
    })
}

//Läger till företagsnamnen i listan

const ulCompanyList = document.querySelector(".ul-company-list");

async function getCompanyNames() {

    const url = 'https://liaconnect-default-rtdb.europe-west1.firebasedatabase.app/profile.json';
    const response = await fetch(url);
    const companyNames = await response.json();

    let names = Object.keys(companyNames);

    for (let i = 0; i < names.length; i++) {
        let aElement = document.createElement('a');
        aElement.className = 'companyListLinks';
        aElement.href = './foretag.html?company=' + encodeURIComponent(names[i]); // Skickar företagsnamnen som en query parameter

        let liElement = document.createElement('li');
        liElement.className = 'companyListItems';
        aElement.append(liElement);
        liElement.append(names[i]);
        ulCompanyList.append(aElement);
    }
};

getCompanyNames();