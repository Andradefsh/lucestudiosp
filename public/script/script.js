document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const msg = document.getElementById('form-msg');
            msg.style.display = 'block';
            form.reset();
            setTimeout(() => {
                msg.style.display = 'none';
            }, 4000);
        });
    }
});