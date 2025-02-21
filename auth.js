document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    const showPasswordBtns = document.querySelectorAll('.show-password');

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetForm = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            button.classList.add('active');
            document.querySelector(`.${targetForm}-form`).classList.add('active');
        });
    });

    // Show/hide password
    showPasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form submissions
    const signinForm = document.querySelector('.signin-form');
    const signupForm = document.querySelector('.signup-form');

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Demo mode - simulate success
        localStorage.setItem('demoUser', JSON.stringify({ email }));
        window.location.href = 'index.html';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const firstName = document.getElementById('signup-firstname').value;
        const lastName = document.getElementById('signup-lastname').value;

        // Demo mode - simulate success
        localStorage.setItem('demoUser', JSON.stringify({ email, firstName, lastName }));
        window.location.href = 'index.html';
    });

    // Guest functionality
    const guestButton = document.getElementById('guestButton');
    guestButton.addEventListener('click', () => {
        localStorage.setItem('demoUser', JSON.stringify({ isGuest: true }));
        window.location.href = 'index.html';
    });
});
