// basic functions
// ------------------------------------------------------------
function toggle() {
    var obj = $('.js-toggle');
    if (obj[0]) {
        obj.click(function () {
            $(this).toggleClass('is-active');
        });
    }
}

function clearSession() {
    var obj = $('.js-clear-session');
    if (obj[0]) {
        obj.click(function () {
            sessionStorage.clear();
        });
    }
}

$(function () {
    toggle();
    clearSession();
});



// preloader
// ------------------------------------------------------------	
function loader() {
    var loader = '.js-loader';
    var content = '.js-loaded';

    if (loader[0]) {
        // init loader view
        TweenLite.to(loader, 0.1, {
            opacity: 1
        });

        // load website
        window.addEventListener('load', function () {
            TweenLite.to(loader, 0.3, {
                delay: 0.7,
                ease: Power3.easeInOut,
                autoAlpha: 0,
                display: 'none',
                onComplete: function () {
                    TweenLite.set(content, {
                        display: 'block',
                    });
                }
            });
        });
    }
}
loader();