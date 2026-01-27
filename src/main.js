import { handleLogin } from './src/views/LoginView.js';

const loginButton = document.getElementById('loginBtn');
loginButton.addEventListener('click', handleLogin);