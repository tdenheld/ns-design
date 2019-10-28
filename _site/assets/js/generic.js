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

const ß = (node, element) => {
    const obj = element || document;
    const qs = obj.querySelectorAll(node);
    return Array.from(qs);
}

const toggle = () => {
    const obj = '.js-toggle';
    if (!exists(obj)) return;
    ß(obj).map((el) => {
        el.onclick = () => el.classList.toggle('is-active');
    });
}

const clearSession = () => {
    const obj = '.js-clear-session';
    if (!exists(obj)) return;
    ß(obj).map((el) => {
        el.onclick = () => sessionStorage.clear();
    });
}

const button = () => {
    const obj = '.button';
    if (!exists(obj)) return;
    ß(obj).map((el) => {
        el.onclick = () => {
            if (el.hasAttribute('data-loader')) el.classList.toggle('is-loading');
        }
    });
}

// const tooltip = () => {
//     const obj = '.js-tooltip';
//     const content = '.js-tooltip-content';

//     if (!exists(obj)) return;
//     $(content).hide();
//     ß(obj).map((el) => {
//         el.onclick = (e) => {
//             $(e.target).next(content).slideToggle(150);
//             $(e.target).toggleClass('is-active');
//         }
//     });
// }

// tooltip
// ------------------------------------------------------------
function tooltip() {
    const obj = $('.js-tooltip');
    const content = '.js-tooltip-content';

    if (obj[0]) {
        $(content).hide();
        obj.click(function () {
            $(this).parents().next(content).slideToggle(150);
            $(this).toggleClass('is-active');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    clearSession();
    button();
    tooltip();
});