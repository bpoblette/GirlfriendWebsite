document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.newsletter-form');
  const input = form.querySelector('input[name="Email"]');
  const messageBox = document.querySelector('#subscribe-box .error-message');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const showMessage = (msg, isError = true) => {
    messageBox.textContent = msg;
    messageBox.style.color = isError ? 'red' : 'green';
    messageBox.style.display = 'block';
    setTimeout(() => { messageBox.style.display = 'none'; }, 4000);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload

    const email = input.value.trim();
    if (!validateEmail(email)) {
      showMessage('Not a valid email!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage(data.message, false); // success message
        input.value = '';
      } else {
        showMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      showMessage('Server error. Please try again later.');
    }
  });
});
