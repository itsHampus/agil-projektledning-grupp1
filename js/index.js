const newCompanyFormContainer = document.querySelector('.newCompanyFormContainer');
newCompanyFormContainer.style.display = 'none';
// För att öppna formuläret för att lägga till företag till listan
const createCompanyBtn = document.querySelector('.createCompanyBtn');
createCompanyBtn.addEventListener('click', () => {
    newCompanyFormContainer.style.display = 'block';
})
// För att stänga formuläret för att lägga till företag till listan
const closeCompanyFormBtn = document.querySelector('.closeCompanyFormBtn');
closeCompanyFormBtn.addEventListener('click', () => {
    newCompanyFormContainer.style.display = 'none';
    document.querySelector('.newCompanyForm').reset(); //Rensa formuläret
})

document.querySelector('.newCompanyForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const companyName = document.querySelector('.companyNameInput').value;
    console.log(companyName);
})