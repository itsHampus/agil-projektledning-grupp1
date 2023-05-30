export async function createCompanyProfile(companyObj) {
    const companyNameToUrl = companyObj.companyName.toLowerCase() // Convert to lowercase
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .normalize('NFD') // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
        .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens
    const url = `https://liaconnect-default-rtdb.europe-west1.firebasedatabase.app/profile/${companyNameToUrl}.json`;

    const init = {
        method: 'PUT',
        body: JSON.stringify(companyObj),
        headers: {
            'Content-type': 'application/json: charset=UTF-8'
        }
    }
    const response = await fetch(url, init);
    const data = await response.json();
    return data;
}

export async function getLoginInfo() {
    const url = 'https://liaconnect-default-rtdb.europe-west1.firebasedatabase.app/admin.json';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function deleteCompany(companyName){
    const url = `https://liaconnect-default-rtdb.europe-west1.firebasedatabase.app/profile/${companyName}.json`;
    const init ={
        method: 'DELETE',
        headers:{
            'Content-type': 'application/json: charset=UTF-8'
        }
    }
    const response = await fetch(url, init);
    
}