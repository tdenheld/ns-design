'use strict';

const cookies = () => {
    ß('.overlay__close').map((el) => el.onclick = () => {
        document.querySelector('.overlay').remove();
    });

    ß('[data-type="cookie-edit"]').map((el) => el.onclick = () => {
        ß('[data-type="selector-toggle"]').map((el) => el.style.display = 'flex');
        ß('[data-type="selector-property-container"]').map((el) => el.classList.add('is-active'));
        ß('[data-type="btn-bottom"]').map((el) => el.classList.add('pb-3'));
        el.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cookies();
});