'use strict';

(() => {
    const obj = '.js-collapsible';
    if (!exists(obj)) return;

    ß(obj).map(el => {
        const header = el.querySelector('.js-collapsible-header');
        const content = el.querySelector('.js-collapsible-content');

        const toggle = debounce(() => {
            el.classList.toggle('is-active');
            slideToggle(content, 200);
        }, 200, true);

        header.addEventListener('click', e => {
            e.preventDefault();
            toggle();
        });
    });
})();