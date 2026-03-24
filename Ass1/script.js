document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const themeToggle = document.getElementById('theme-toggle');
    const toastContainer = document.getElementById('toast-container');
    const resultsContainer = document.getElementById('results');
    const body = document.body;

    // Theme Toggle Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.querySelector('.icon').textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.querySelector('.icon').textContent = isDark ? '☀️' : '🌙';
    });

    // Form Submission Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Simulate random success/failure
        const isSuccess = Math.random() > 0.3; // 70% success rate

        if (isSuccess && name && email) {
            showToast('Form submitted successfully!', 'success');
            addResult(name, email);
            form.reset();
        } else {
            showToast('Failed to submit form. Please try again.', 'error');
        }
    });

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease-in';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    function addResult(name, email) {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <small>Submitted just now</small>
        `;

        // Add to top of list
        if (resultsContainer.firstChild) {
            resultsContainer.insertBefore(card, resultsContainer.firstChild);
        } else {
            resultsContainer.appendChild(card);
        }
    }
});
