import { createCompanyProfile } from "./firebase.js";
import { deleteCompany } from "./firebase.js";

const newCompanyFormContainer = document.querySelector('.newCompanyFormContainer');
newCompanyFormContainer.style.display = 'none';

const createCompanyBtn = document.querySelector('.createCompanyBtn');
createCompanyBtn.style.display = 'none';
const logOutBtn = document.getElementById('logoutBtn');
logOutBtn.style.display = 'none';
// localStorage.clear();
if (localStorage.getItem('loggedIn')) {
    createCompanyBtn.style.display = 'block';
    document.querySelector('.login').style.display = 'none';
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

        let selectedMonths = [];
        document.getElementsByName('months').forEach((month) => {
            if(month.checked){
                selectedMonths.push(month.value);
            }
        })
        
        const companySpots = document.querySelector('.companySpotsInput').value;

        let liaAtHomeOrAtOffice;
        document.getElementsByName('inPlaceOrAtDistanceInput').forEach((inPlaceOrAtDistance) => {
            if(inPlaceOrAtDistance.checked){
                liaAtHomeOrAtOffice = inPlaceOrAtDistance.value
            }
        })
        let officeAttire;
        document.getElementsByName('businessCasualOrSuit').forEach((businessCasualOrSuit) => {
            if(businessCasualOrSuit.checked){
                officeAttire = businessCasualOrSuit.value;
            }
        })
        
        let companySize;
        document.getElementsByName('companySize').forEach((companySizeInput) => {
            if(companySizeInput.checked){
                companySize = companySizeInput.value;
            }
        });
    
        let workMode;
        document.getElementsByName('workMode').forEach((workModeInput) => {
            if(workModeInput.checked){
                workMode = workModeInput.value;
            }
        });

        const companySlogan = document.querySelector('#companySloganInput').value;
        const companyAbout = document.querySelector('.companyAboutInput').value;
        const newCompanyObject = {
            companyName: companyName,
            companyPhone: companyPhone,
            companyEmail: companyEmail,
            companyCity: companyCity,
            companyBranch: companyBranch,
            companyPeriod: selectedMonths,
            companySpots: companySpots,
            companyAtHomeOrOffice: liaAtHomeOrAtOffice,
            companyAttire: officeAttire,
            companySlogan: companySlogan,
            companyAbout: companyAbout
        }
        
        await createCompanyProfile(newCompanyObject);
        document.querySelector('.newCompanyForm').reset(); //Rensa formuläret
        newCompanyFormContainer.style.display = 'none'; // Stäng formuläret
        getCompanyNames();
    })

    logOutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        location.reload();
    })
}

//Läger till företagsnamnen i listan

const ulCompanyList = document.querySelector(".ul-company-list");

async function getCompanyNames() {
    ulCompanyList.innerHTML = '';
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

        if(localStorage.getItem('loggedIn')){
            const deleteCompanyBtn = document.createElement('button');
            deleteCompanyBtn.innerText = 'Ta bort företag';
            deleteCompanyBtn.addEventListener('click', async ()=>{
                let confirmedChoise = confirm('Är du säker att du vill ta bort företaget?');
                if(confirmedChoise){
                    await deleteCompany(names[i]);
                    location.reload();
                }
            })
    
            const containerForTheCompany = document.createElement('div');
            containerForTheCompany.append(aElement, deleteCompanyBtn);
            ulCompanyList.append(containerForTheCompany);
        }else{
            ulCompanyList.append(aElement);
        }
    }
};

getCompanyNames();