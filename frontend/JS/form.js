const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

const params = new URLSearchParams(window.location.search);
const formType = params.get('form');

if (formType === 'register') {
    container.classList.add('active');
} else {
    container.classList.remove('active');
}