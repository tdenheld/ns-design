'use strict';

const ß = (node, element) => {
    const obj = element || document;
    const qs = obj.querySelectorAll(node);
    return Array.from(qs);
}

const exists = node => {
    return document.body.contains(document.querySelector(node));
}

const isHidden = node => {
    return window.getComputedStyle(node).display === 'none';
}

const valueInArray = (value, array) => {
    return array.includes(value);
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const checkLocalStorage = (value) => {
    if (localStorage.getItem(value)) return localStorage.getItem(value).trim();
}

const checkSessionStorage = (value) => {
    if (sessionStorage.getItem(value)) return sessionStorage.getItem(value).trim();
}

const debounce = (callback, time) => {
    let interval;
    return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            interval = null;
            callback(...args);
        }, time);
    }
}

const getHeight = node => {
    node.style.display = 'block';
    node.style.visibility = 'hidden';
    node.style.transition = '';
    const height = node.offsetHeight + 'px';
    node.style.display = '';
    node.style.visibility = '';
    return height;
}

const slideDown = (node, duration, callback) => {
    if (!isHidden(node)) return;
    const height = getHeight(node);
    const marginTop = getComputedStyle(node).marginTop;
    const marginBottom = getComputedStyle(node).marginBottom;

    node.style.display = 'block';
    node.style.height = 0;
    node.style.marginTop = 0;
    node.style.marginBottom = 0;
    node.style.transition = `all ${duration}ms cubic-bezier(0.700, 0.270, 0.270, 1)`;
    node.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        node.style.height = height;
        node.style.marginTop = marginTop;
        node.style.marginBottom = marginBottom;
    });

    node.addEventListener('transitionend', () => {
        node.style.height = '';
        node.style.transition = '';
        node.style.overflow = '';
        node.style.marginTop = '';
        node.style.marginBottom = '';
        if (callback) callback();
    }, {
        once: true
    });
}

const slideUp = (node, duration, callback) => {
    if (isHidden(node)) return;
    node.style.height = node.offsetHeight + 'px';
    node.style.transition = `all ${duration}ms cubic-bezier(0.700, 0.270, 0.270, 1)`;
    node.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        node.style.height = 0;
        node.style.marginTop = 0;
        node.style.marginBottom = 0;
    });

    node.addEventListener('transitionend', () => {
        node.style.height = '';
        node.style.transition = '';
        node.style.overflow = '';
        node.style.marginTop = '';
        node.style.marginBottom = '';
        node.style.display = 'none';
        if (callback) callback();
    }, {
        once: true
    });
}

const slideToggle = (n, d, u) => {
    const dur = u || d
    isHidden(n) ? slideDown(n, d) : slideUp(n, dur);
}

const toggle = () => {
    const obj = '.js-toggle';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.onclick = () => el.classList.toggle('is-active'));
}

const clearSession = () => {
    const obj = '.js-clear-session';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.onclick = () => sessionStorage.clear());
}

const button = () => {
    const obj = '.button';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.onclick = () => {
        if (el.hasAttribute('data-loader')) el.classList.toggle('is-loading');
    });
}

const tooltip = () => {
    const obj = '.js-tooltip';
    if (!exists(obj)) return;

    ß(obj).map((el) => el.onclick = () => {
        slideToggle(el.parentElement.nextElementSibling, 200);
        el.classList.toggle('is-active');
        const offset = -el.parentElement.offsetHeight / 2 + 4 + 'px';
        el.querySelector('.js-tooltip-arrow').style.bottom = offset;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    clearSession();
    button();
    tooltip();
});