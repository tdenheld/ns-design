'use strict';

/* positioning of the page heading 
   content in context of the hero */
(() => {
    const hero = '[data-hero]';
    if (!exists(hero)) return;

    ß(hero).map(el => {
        const content = el.querySelector('[data-hero-content]');
        const position = content.getAttribute('data-hero-content');
        
        if (position === 'outsideBefore') {
            el.insertBefore(content, el.childNodes[0]);
        }
    });
})()