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



// mouse follower
// ------------------------------------------------------------
function mouseFollow() {
    const obj = '.js-mouse-follower';

    function follow(obj, x, y) {
        TweenMax.to(obj, 0.7, {
            x: x,
            y: y,
            ease: Power4.easeOut
        });
    }

    function fade(obj, a, b, t) {
        TweenMax.fromTo(obj, t, {
            autoAlpha: a
        }, {
            autoAlpha: b,
            ease: Power4.easeOut
        });
    }

    if ($(obj)[0]) {
        $(document).mouseenter(() => {
            fade(obj, 0, 1, 0.05);
        });
        $(document).mouseleave(() => {
            fade(obj, 1, 0, 0.7);
        })
        $(document).mousemove((event) => {
            requestAnimationFrame(() => {
                follow(obj, event.clientX, event.clientY);
            });
        });
    }
}
mouseFollow();



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