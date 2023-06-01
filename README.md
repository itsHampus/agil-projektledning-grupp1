# agil-projektledning-grupp1
## Projekt överblick
Uppdraget vi fått av Yrkeshögskolemyndigheten innefattade ett verktyg som kan hjälpa studenter att få LIA-plats. Detta resulterade i vår hemsida LiaConnect.se, där en kommunikatör på Yrkeshögskolemyndigheten rekryterar och listar de företag som tar emot LIA-praktikanter och önskar visas på hemsidan. 

## Användande
Som student får man information om sidan genom skolan, och på startsidan kan man läsa om hur den fungerar. Det finns en lista med de olika företagen som studenten kan navigera mellan. Om studenten väljer ett av företagen kommer den till företagssidan som innehåller relevant information om företaget i fråga. Utefter det kan studenten bedöma om företaget skulle passa dem, och i sånna fall kan studenten skicka en ansökan via ett formulär som finns länkat under företagsinformationen. 

Kommunikatören på yh-myndigheten arbetar aktivt med att hitta företagen som vill lista sig, och genom intervjuer med dessa skapar hen företagets profil på Liaconnect.se. 

## Filstuktur och kodexempel
Det finns totalt tre stycken mappar, en innehållandes alla HTML-filer, den andre innehåller alla JS-filer och den tredje innehåller bilderna på företagsloggan.

### HTMl-Filer
1. index.html innehåller startsidan
2. login.html innehåller login menat för kommunikatören
3. form.html innehåller ansökningsformuläret menat för studenterna
4. foretag.html innehåller företagssidan

### JS-Filer
1. index.js innehåller funktionaliteten för startsidan
2. login.js innehåller funktionaliteten för login
3. form.js innehåller funktionaliteten för ansökningsformuläret
4. companyProfile.js innehåller funktionaliteten för företagssidan
5. firebase.js innehåller funktionaliteten för lagring av företag på firebase

### Förklaring av funktionaliteten
**index.js** <br />
Listan på startsidan innehållandes alla företag hämtas från lagringen på firebase, detta görs via funktionen getCompanyNames. Den hämtar alla företagsobjekt och med hjälp av metoden keys från klassen Object får vi ut endast namnen på företagen och de lägger vi i en array kallad names. Sedan loopar vi igenom names-arrayen med en for-loop och i varje loop läggs företagsnamnet i ett li-element som sedan läggs i ett a-element. I loopen finns det en if-sats som kollar om användaren är inloggad eller inte. Är användaren inte inloggad visas företagsnamnen som vanligt men om användaren är inloggad läggs det till en knapp på varje företagsnamn som gör det möjligt för administatören att ta bort företaget från listan och från firebase. Detta görs med metoden deleteCompany som importeras från filen firebase.js.

Om administratören har loggat in så visas en knapp ovanför listan med företagen som gör det möjligt att lägga till nya företag i listan. När knappen trycks på visas formuläret för att skapa nya företag. När formuläret är ifyllt och det har blivit submitted hämtas all information från formuläret och läggs till i ett objekt kallat newCompanyObject. Det objektet läggs sedan till i firebase med hjälp av funktionen createCompanyProfile som är importerad från firebase.js. Efter objektet har lagts till i firebase så rensas och stängs formuläret sedan uppdateras listan med alla företag med hjälp av funktionen getCompanyNames.

**firebase.js** <br />
Det finns totalt tre stycken funktioner som exporteras och används i andra filer. 

Funktionen createCompanyProfile har en parameter kallad companyObj. Till en början vill vi göra om företagsnamnet till en slug så att vi kan lägga till det i urlen till databasen i firebase. Sedan görs objektet till JSON för att sedan lägga till det i databasen med metoden PUT då vi redan har ett id för objektet som är slugen.

Funktionen getLoginInfo hämtar inloggninsobjektet från firebase innehållandes inloggningsuppgifterna, dessa returneras så att man kan kontrollera att användaren har angett rätt inloggningsuppgifter.

Funktionen deleteCompany har en parameter kallad companyName som används i urlen för att hitta företaget som man vill ta bort ifrån databasen i firebase. Objektet tas bort med hjälp av metoden DELETE. 
