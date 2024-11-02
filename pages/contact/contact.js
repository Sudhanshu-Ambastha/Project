document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded');

    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);

        form.reset();
        alert('Thank you for your message! We will get back to you soon.'); 
    });
});
