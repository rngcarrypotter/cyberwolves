document.getElementById('login-button').addEventListener('click', async () => {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Login successful!');
    } else {
        alert('Error logging in.');
    }
});

document.getElementById('register-button').addEventListener('click', async () => {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Registration successful!');
    } else {
        alert('Error registering.');
    }
});
