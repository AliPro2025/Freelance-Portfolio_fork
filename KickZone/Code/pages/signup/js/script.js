document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');
    const confirmInput = document.getElementById('confirm');
    const toggleConfirmIcon = document.getElementById('toggleConfirm');

    if (togglePasswordIcon) {
        togglePasswordIcon.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    if (toggleConfirmIcon) {
        toggleConfirmIcon.addEventListener('click', () => {
            const type = confirmInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmInput.setAttribute('type', type);
        });
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (passwordInput.value !== confirmInput.value) {
                alert('Passwords do not match!');
                return;
            }

            const data = {
                full_name: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                password: passwordInput.value,
                phone: '0000000000'
            };

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Processing...';

            try {
                const res = await fetch(API_BASE + '/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const json = await res.json();

                if (json.success) {
                    alert('Account created successfully!');
                    window.location.href = '../login/index.html';
                } else {
                    alert(json.message);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Create Account';
                }
            } catch (err) {
                alert('Connection error. Make sure XAMPP is running.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Create Account';
            }
        });
    }
});