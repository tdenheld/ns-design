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
    if (array.includes(value)) return true;
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const inViewport = (node, hook) => {
    const pos = node.getBoundingClientRect();
    return !(pos.top > innerHeight * hook || pos.bottom < 0);
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

const slideDown = (node, duration, d, callback) => {
    if (!isHidden(node)) return;
    const display = d || 'block';
    const height = getHeight(node);

    node.style.display = display;
    node.style.height = 0;
    node.style.transition = `height ${duration}ms cubic-bezier(0.700, 0.270, 0.270, 1)`;
    node.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        node.style.height = height;
    });

    node.addEventListener('transitionend', () => {
        node.style.height = '';
        node.style.transition = '';
        node.style.overflow = '';
        if (callback) callback();
    }, {
        once: true
    });
}

const slideUp = (node, duration, callback) => {
    if (isHidden(node)) return;
    node.style.height = node.scrollHeight + 'px';
    node.style.transition = `height ${duration}ms cubic-bezier(0.700, 0.270, 0.270, 1)`;
    node.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        node.style.height = 0;
    });

    node.addEventListener('transitionend', () => {
        node.style.height = '';
        node.style.transition = '';
        node.style.overflow = '';
        node.style.display = 'none';
        if (callback) callback();
    }, {
        once: true
    });
}

const slideToggle = (n, d, c) => {
    isHidden(n) ? slideDown(n, d, c) : slideUp(n, d, c);
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

const revealOnScroll = (node, hook) => {
    (reveal = () => ß(node).map((el) => {
        if (inViewport(el, hook)) el.classList.add('is-active');
    }))();
    document.addEventListener('scroll', () => reveal());
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    clearSession();
    button();
    tooltip();
    revealOnScroll('.js-tr', 0.95);
});