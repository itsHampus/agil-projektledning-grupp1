const form = document.querySelector('.application-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    alert('Tack för din ansökan! Vi kommer kontakta dig inom kort.');

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

function validateForm() {
   
    var fullName = document.getElementById('full-name').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var email = document.getElementById('email').value;
   
    if (fullName === '') {
      alert('Please enter your full name.');
      return false;
    }
  
    if (phoneNumber === '') {
      alert('Please enter your phone number.');
      return false;
    }
  
   
    var phoneRegex = /^\+46\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid phone number in the format +46xxxxxxxxx.');
      return false;
    }
  
    if (email === '') {
      alert('Please enter your email address.');
      return false;
    }
  
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    return true;
  }
  
  
