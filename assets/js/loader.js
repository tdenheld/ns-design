const loader = () => {
    const loader = '.js-loader';
    if (!exists(loader)) return;

    window.addEventListener('load', function () {
        TweenLite.to(loader, 0.3, {
            delay: 0.7,
            ease: Power3.easeInOut,
            autoAlpha: 0,
            display: 'none',
        });
    });
}
loader();