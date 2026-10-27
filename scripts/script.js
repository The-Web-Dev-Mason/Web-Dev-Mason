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

    const preview = document.getElementById('island-preview');
    const toggle = document.querySelector('.preview-toggle');
    if (preview && toggle) {
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const connection = navigator.connection;
        const source = preview.querySelector('source');
        const description = document.getElementById('preview-description');
        let inView = false;
        let userPaused = false;
        let failed = false;
        toggle.hidden = false;

        const syncLabel = () => {
            toggle.textContent = preview.paused ? 'Play preview' : 'Pause preview';
        };
        const playPreview = () => {
            if (failed) return;
            if (!source.hasAttribute('src')) {
                source.src = source.dataset.src;
                preview.load();
            }
            preview.muted = true;
            const playback = preview.play();
            if (playback) playback.catch(syncLabel);
        };
        const updatePlayback = () => {
            if (inView && !document.hidden && !motion.matches && !connection?.saveData && !userPaused) {
                playPreview();
            } else {
                preview.pause();
            }
        };
        toggle.addEventListener('click', () => {
            if (preview.paused) {
                userPaused = false;
                playPreview();
            } else {
                userPaused = true;
                preview.pause();
            }
        });
        preview.addEventListener('playing', syncLabel);
        preview.addEventListener('pause', syncLabel);
        const onError = () => {
            failed = true;
            toggle.disabled = true;
            toggle.textContent = 'Preview unavailable';
            description.textContent = 'Use “Visit Live Site” to explore the website.';
        };
        preview.addEventListener('error', onError);
        source.addEventListener('error', onError);
        motion.addEventListener('change', updatePlayback);
        connection?.addEventListener?.('change', updatePlayback);
        document.addEventListener('visibilitychange', updatePlayback);
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                inView = entries[0].isIntersecting;
                updatePlayback();
            }, { threshold: 0.25 });
            observer.observe(preview);
        }
    }
});
