'use strict';

(() => {
    const loader = '.js-loader';
    if (!exists(loader)) return;

    window.addEventListener('load', function () {
        gsap.to(loader, {
            duration: 0.3,
            delay: 0.7,
            ease: 'power3.inOut',
            autoAlpha: 0,
            display: 'none',
        });
    });
})()