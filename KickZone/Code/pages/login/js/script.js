document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');

    if (togglePasswordIcon) {
        togglePasswordIcon.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                email: document.getElementById('email').value,
                password: passwordInput.value
            };

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Processing...';

            try {
                const res = await fetch(API_BASE + '/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const json = await res.json();

                if (json.success) {
                    localStorage.setItem('kz_token', json.token);
                    localStorage.setItem('kz_user', JSON.stringify(json.user));
                    alert('Login successful!');
                    window.location.href = '../landing/index.html';
                } else {
                    alert(json.message);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Sign In to Kickzone';
                }
            } catch (err) {
                alert('Connection error. Make sure XAMPP is running.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Sign In to Kickzone';
            }
        });
    }
});