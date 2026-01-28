import { handleLogin } from '../src/views/LoginView';

const loginButton = document.getElementById('loginBtn') as HTMLButtonElement | null;

if (loginButton) {
  loginButton.addEventListener('click', handleLogin);
}
