document.addEventListener('DOMContentLoaded', function () {
    // 1. Marquee Animation Control
    const marquee = document.querySelector('marquee');
    if (marquee) {
        marquee.addEventListener('mouseover', function () {
            marquee.stop(); // Stop marquee on hover
        });
        marquee.addEventListener('mouseout', function () {
            marquee.start(); // Restart marquee on mouse leave
        });
    }

    // 2. Blinking Text Animation
    const blinkSpan = document.querySelector('.blink');
    if (blinkSpan) {
        const blink = () => {
            blinkSpan.style.visibility = (blinkSpan.style.visibility === 'hidden' ? 'visible' : 'hidden');
        };
        setInterval(blink, 500); // Blink every 500ms
    }

    // 3. Smooth Scroll
    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // 4. Form Validation (example if form is added)
    const validateForm = (event) => {
        // Example form validation function
        const form = event.target;
        const email = form.querySelector('input[type="email"]').value;
        const isValid = email.includes('@');
        
        if (!isValid) {
            event.preventDefault();
            alert('Please enter a valid email address.');
        }
    };

    // Attach form validation if forms are added
    // document.querySelector('form').addEventListener('submit', validateForm);
});
