// Login
const loginButton = document.getElementById('login-button');

function interrompeForm(event) {
  event.preventDefault();
}
loginButton.addEventListener('click', interrompeForm);

loginButton.addEventListener('click', () => {
  const login = document.getElementById('login').value;
  const pwd = document.getElementById('senha').value;
  if (login === 'tryber@teste.com' && pwd === '123456') {
    window.alert('Olá, Tryber!');
  } else {
    window.alert('Login ou senha inválidos.');
  }
});
const getPermission = document.getElementById('agreement');

const bntEnviar = document.getElementById('submit-btn');
bntEnviar.disabled = true;

function verify() {
  // console.log('test função');
  if (getPermission.checked === true) {
    // console.log('teste se');
    bntEnviar.disabled = false;
  } else if (getPermission.checked === false) {
    // console.log('teste ou se');
    bntEnviar.disabled = true;
  }
}
getPermission.addEventListener('click', verify);
