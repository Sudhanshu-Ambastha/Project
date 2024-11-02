document.addEventListener('DOMContentLoaded', () => {
    console.log('Login page loaded');
    
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            console.log('Login successful:', { username, password });
            alert('Login successful');
            form.reset(); 
        } else {
            alert('Please fill in all fields');
        }
    });
});
