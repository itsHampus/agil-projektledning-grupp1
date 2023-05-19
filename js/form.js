const form = document.querySelector('.application-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    alert('Vi har tagit emot din ansökan. Tack!');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});
