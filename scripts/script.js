document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const mobile = window.matchMedia('(max-width: 900px)');

    function setMenuOpen(open) {
        nav.classList.toggle('active', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }

    burger.addEventListener('click', () => setMenuOpen(!nav.classList.contains('active')));
    document.addEventListener('click', event => {
        if (!nav.contains(event.target) && !burger.contains(event.target)) setMenuOpen(false);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('active')) {
            setMenuOpen(false);
            burger.focus();
        }
    });
    nav.addEventListener('focusout', event => {
        if (mobile.matches && !nav.contains(event.relatedTarget) && event.relatedTarget !== burger) setMenuOpen(false);
    });
    mobile.addEventListener('change', () => setMenuOpen(false));
    document.getElementById('current-year').textContent = new Date().getFullYear();
    // Native HTML validation handles required fields and email format.
    // Optional website/Instagram and message fields never block an enquiry.
});
