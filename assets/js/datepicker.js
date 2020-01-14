// datepicker
// ------------------------------------------------------------

function Transition(obj, y, scaleY) {
    this.obj = obj;
    this.y = y;
    this.scaleY = scaleY;

    this.tween = gsap.fromTo(this.obj, {
        autoAlpha: 0,
        y: this.y,
        scaleY: this.scaleY,
    }, {
        duration: 1,
        ease: 'power3.inOut',
        autoAlpha: 1,
        y: 0,
        scaleY: 1,
        display: 'block',
    }).pause();
}

function dpBottomSheet() {
    const btn = $('.js-dp-bs-btn');
    const overlay = $('.js-dp-bs');
    const close = $('.js-dp-bs-close, .js-dp-bs .js-dp-overlay, .js-dp-toggle');
    const bottomSheet = new Transition('.datepicker-bs', 300, 1);
    const darkener = new Transition('.js-dp-bs .js-dp-overlay', 0, 1);

    btn.click(() => {
        if ($('.js-formfield-datum')[0]) {
            $('.js-formfield-error', '.js-formfield-datum').slideUp(200);
            $('input', '.js-formfield-datum').removeClass('is-error');
        }
        if ($(window).innerWidth() <= 480) {
            overlay.show();
            bottomSheet.tween.duration(0.35).play();
            darkener.tween.duration(0.6).play();
        }
    });

    close.click(() => {
        bottomSheet.tween.duration(0.35).play().reverse();
        darkener.tween.duration(0.6).play().reverse();
        setTimeout(() => {
            overlay.hide();
        }, 610);
        if ($('#datum')[0]) {
            $('#datum').val('18-07-2019');
        }
    });

    $('.js-dp-toggle').click(function () {
        $('.js-dp-toggle').removeClass('is-active');
        $(this).addClass('is-active');
    });
};

if ($('.js-dp-bs-btn')[0]) {
    dpBottomSheet();
};

// desktop
// -----------------------------
function dpDesktop() {
    var active = false;
    var dp;

    function fadeIn(obj) {
        gsap.fromTo(obj, {
            opacity: 0,
            scaleY: 0.9,
            display: 'block',
        }, {
            duration: 0.3,
            ease: 'power3.inOut',
            opacity: 1,
            scaleY: 1,
        });
    }

    function fadeOut(obj) {
        gsap.to(obj, {
            duration: 0.3,
            ease: 'power3.inOut',
            opacity: 0,
            display: 'none',
        });
    }

    $('.js-dp-btn').click(function () {
        dp = $('.datepicker-lg', this);
        if ($(window).innerWidth() > 480) {
            if (!active) {
                fadeIn(dp);
                active = true;
            } else {
                fadeOut(dp);
                active = false;
            }
        }
    });

    // click elsewhere to close datepicker
    $(document).click(function (e) {
        if (!$(e.target).closest('.js-dp-btn').length) {
            if (active) {
                fadeOut('.datepicker-lg');
                active = false;
            }
        }
    });

}

if ($('.js-dp-btn')[0] && $(window).innerWidth() > 480) {
    dpDesktop();
}