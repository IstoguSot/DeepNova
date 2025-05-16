document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  let users = JSON.parse(localStorage.getItem('gmailUsers')) || [];

  const saveUsers = () => {
    localStorage.setItem('gmailUsers', JSON.stringify(users));
  };

  const showMessage = (text, color) => {
    messageDiv.textContent = text;
    messageDiv.style.color = color;
  };

  const redirectWithDelay = (url, delay = 1500) => {
    console.log(`Redirecting to ${url} in ${delay}ms...`);
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  };

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();

    console.log('Register attempt:', email);

    if (!email.endsWith('@gmail.com')) {
      showMessage('Only Gmail addresses allowed!', 'orange');
      return;
    }

    if (users.find(user => user.email === email)) {
      showMessage('Account exists, please login.', 'red');
      return;
    }

    users.push({ email, password });
    saveUsers();

    showMessage('Registration successful! Redirecting...', 'green');
    registerForm.reset();

    localStorage.setItem('loggedInUser', JSON.stringify({ email }));

    redirectWithDelay('index.html');
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    console.log('Login attempt:', email);

    const userFound = users.find(user => user.email === email && user.password === password);

    if (userFound) {
      localStorage.setItem('loggedInUser', JSON.stringify({ email }));
      showMessage('Login successful! Redirecting...', 'lightgreen');
      redirectWithDelay('index.html');
    } else {
      showMessage('Invalid Gmail or password.', 'red');
      alert('Invalid credentials!');
    }
  });
});
