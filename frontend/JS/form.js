// ===============================
// UI TOGGLE LOGIC
// ===============================
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
}

// Switch form based on URL ?form=register
const params = new URLSearchParams(window.location.search);
const formType = params.get('form');

if (formType === 'register') {
    container.classList.add('active');
} else {
    container.classList.remove('active');
}

// ===============================
// LOGIN
// ===============================
const loginForm = document.getElementById('logiForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.success) {
                // Save token
                localStorage.setItem('auth_token', data.data.token);

                alert('Login successful');
                console.log('LOGIN RESPONSE:', data);

                // Optional redirect
                // window.location.href = 'dashboard.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('LOGIN ERROR:', error);
            alert(error.message);
        }
    });
}

// ===============================
// REGISTER
// ===============================
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);

        // Laravel expects "name", not "username"
        if (formData.get('username')) {
            formData.set('name', formData.get('username'));
            formData.delete('username');
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            if (data.success) {
                alert('Registration successful');
                console.log('REGISTER RESPONSE:', data);

                // Switch back to login form
                container.classList.remove('active');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('REGISTER ERROR:', error);
            alert(error.message);
        }
    });
}

// ===============================
// OPTIONAL: LOGOUT HELPER
// ===============================
async function logout() {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        alert('Not logged in');
        return;
    }

    try {
        await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        localStorage.removeItem('auth_token');
        alert('Logged out');
    } catch (error) {
        console.error('LOGOUT ERROR:', error);
    }
}