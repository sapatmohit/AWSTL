document.addEventListener('DOMContentLoaded', () => {
    const profileBadge = document.getElementById('profile-badge');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const dbUrlElement = document.getElementById('db-url');
    const externalUrlElement = document.getElementById('external-url');
    const refreshBtn = document.getElementById('refresh-btn');
    const toast = document.getElementById('toast');

    const fetchConfig = async () => {
        refreshBtn.classList.add('loading');
        statusText.innerText = 'Syncing...';
        
        try {
            const response = await fetch('/config');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            // Update UI
            profileBadge.innerText = data.activeProfile || 'DEFAULT';
            dbUrlElement.innerText = data.dbUrl || 'N/A';
            externalUrlElement.innerText = data.externalUrl || 'N/A';
            
            // Update Status
            statusDot.classList.add('active');
            statusText.innerText = `Environment: ${data.activeProfile.toUpperCase()}`;
            
            // Trigger entry animations
            animateCards();
            
        } catch (error) {
            console.error('Error fetching config:', error);
            statusText.innerText = 'Connection Error';
            statusDot.classList.remove('active');
            statusDot.style.background = '#f56565';
        } finally {
            setTimeout(() => {
                refreshBtn.classList.remove('loading');
            }, 600);
        }
    };

    const animateCards = () => {
        const cards = document.querySelectorAll('.config-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    window.copyText = (id) => {
        const text = document.getElementById(id).innerText;
        navigator.clipboard.writeText(text).then(() => {
            showToast();
        });
    };

    const showToast = () => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    refreshBtn.addEventListener('click', fetchConfig);

    // Initial load
    fetchConfig();
});
