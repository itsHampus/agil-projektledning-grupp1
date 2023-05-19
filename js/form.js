const form = document.querySelector('.application-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    alert('Tack för din ansökan! Vi kommer kontakta dig inom kort.');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});
