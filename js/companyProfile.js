
async function getCompanyData() {
    // Hämtar företagsnamnet från query-parametern
    const urlParams = new URLSearchParams(window.location.search);
    const companyName = urlParams.get('company');

    if (companyName) {
        const url = 'https://liaconnect-default-rtdb.europe-west1.firebasedatabase.app/profile.json';
        const response = await fetch(url);
        const companyData = await response.json();

        // Hämta företagsinfon baroende på det valda namnet
        const selectedCompany = companyData[companyName];

        if (selectedCompany) {
            document.getElementById('company-name').textContent = selectedCompany.companyName;
            document.getElementById('company-about').textContent = selectedCompany.companyAbout;
            document.getElementById('company-slogan').textContent = selectedCompany.companySlogan;
            document.getElementById('company-city').textContent = selectedCompany.companyCity;
            document.getElementById('remote-or-home').textContent = selectedCompany.companyAtHomeOrOffice;
            document.getElementById('company-attire').textContent = selectedCompany.companyAttire;
            document.getElementById('business-sector').textContent = selectedCompany.companyBranch;
            document.getElementById('company-period').textContent = selectedCompany.companyPeriod;
            document.getElementById('company-spots').textContent = selectedCompany.companySpots;
            document.getElementById('company-email').textContent = selectedCompany.companyEmail;
            document.getElementById('company-phone').textContent = selectedCompany.companyPhone;
        }
    }
}

getCompanyData();

