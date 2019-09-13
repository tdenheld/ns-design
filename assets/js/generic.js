// basic functions
// ------------------------------------------------------------
function toggle() {
    const obj = $('.js-toggle');
    if (obj[0]) {
        obj.click(function () {
            $(this).toggleClass('is-active');
        });
    }
}

function clearSession() {
    const obj = $('.js-clear-session');
    if (obj[0]) {
        obj.click(function () {
            sessionStorage.clear();
        });
    }
}

function button() {
    const obj = $('.button');
    if (obj[0]) {
        obj.click(function () {
            if ($(this).attr('data-loader')) {
                $(this).toggleClass('is-loading');
            }
        });
    }
}

$(function () {
    toggle();
    clearSession();
    button();
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