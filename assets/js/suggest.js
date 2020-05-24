'use strict';

(() => {
    const suggest = {
        amount: 4,
        position: 0,
        entered: false,

        template: {
            default: `<h4 class="suggest__category">Eerder gekozen</h4>
        <div class="suggest__item suggest__item--station js-suggest-item">Leeuwarden Camminghaburen</div>
        <div class="suggest__item suggest__item--station js-suggest-item">Amsterdam Centraal</div>
        <div class="suggest__item suggest__item--station js-suggest-item">Utrecht Centraal</div>
        <div class="suggest__item suggest__item--station js-suggest-item">Schiphol Airport</div>`,

            array(value) {
                return `<div class="suggest__item suggest__item--station js-suggest-item">${value.naam}</div>`;
            }
        },

        set(key, value) {
            this[key] = value;
        },
        select(direction, container) {
            if (isHidden(container)) this.showDefault(container);
            this.set('entered', false);

            if (direction === 'next') {
                this.position < this.amount - 1 ? this.position++ : this.position = 0;
            } else if (direction === 'prev') {
                this.position > 0 ? this.position-- : this.position = this.amount - 1;
            }

            this.highlight(container);
        },
        highlight(node) {
            ß('.js-suggest-item', node).map(el => el.classList.remove('is-active'));
            ß('.js-suggest-item', node)[this.position].classList.add('is-active');
        },
        showDefault(container) {
            this.set('amount', 4);
            this.set('position', 0);
            container.innerHTML = this.template.default;
            slideDown(container, 200);
            this.highlight(container);
        },
        hide(container) {
            this.set('amount', 4);
            this.set('position', 0);
            setTimeout(() => slideUp(container, 100, () => removeAllChilds(container)), 20);
        }
    }
    Object.seal(suggest);

    const getStations = async value => {
        const response = await fetch(`https://gateway.apiportal.ns.nl/rio-autosuggest-api/stations?q=${value}&countryCode=nl`, {
            headers: {
                'Ocp-Apim-Subscription-Key': '5f6d82eb0e6b412f99d35c4125982b80'
            }
        });
        return await response.json();
    }

    const processStationInput = (inputVal, container) => {
        getStations(inputVal).then(value => {
            suggest.set('amount', Math.min(value.length, 4));
            if (value.length > 0) {
                removeAllChilds(container);
                value.slice(0, 4).map(value => {
                    container.innerHTML += suggest.template.array(value);
                });
                suggest.set('position', 0);
                suggest.highlight(container);
                slideDown(container, 200);
            } else {
                suggest.hide(container);
                suggest.set('entered', true);
            }
        });
    }

    const checkInputValue = (inputVal, container) => {
        let timer;
        const timerDuration = 150;
        clearTimeout(timer);

        if (inputVal.length >= 2) {
            timer = setTimeout(() => processStationInput(inputVal, container), timerDuration);
        } else if (inputVal.length === 1) {
            suggest.hide(container);
            suggest.set('position', 0);
        } else {
            suggest.showDefault(container);
        }
    }

    const inputStation = obj => {
        ß(obj).map(el => {
            const input = el.querySelector('input');
            const container = el.querySelector('.js-suggest');

            input.addEventListener('keydown', e => {
                if (valueInArray(e.key, ['ArrowDown', 'ArrowUp'])) e.preventDefault();
                if (e.key === 'Enter' && !suggest.entered) e.preventDefault();
            });

            input.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown') {
                    suggest.select('next', container);
                } else if (e.key === 'ArrowUp') {
                    suggest.select('prev', container);
                } else if (!suggest.entered && e.key === 'Enter') {
                    input.value = ß('.js-suggest-item', container)[suggest.position].textContent;
                    suggest.hide(container);
                    suggest.set('entered', true);
                } else if (e.key === 'Tab') {
                    suggest.set('entered', false);
                } else if (!valueInArray(e.key, ['ArrowLeft', 'ArrowRight', 'Tab', 'Shift'])) {
                    checkInputValue(input.value, container);
                }
            });

            input.addEventListener('focusin', () => {
                if (isHidden(container)) {
                    (input.value.length > 6) ?
                    suggest.showDefault(container): checkInputValue(input.value, container);
                }
            });

            input.addEventListener('focusout', () => {
                suggest.hide(container);
            });

            input.addEventListener('click', () => {
                // select input value text immediately -- also working on iOS
                input.setSelectionRange(0, 9999);
            });
        });
    }

    document.addEventListener('mouseover', e => {
        if (e.target.matches('.js-suggest-item')) {
            const items = e.target.parentNode.children;
            Array.from(items).map(el => {
                el.classList.remove('is-active');
            });
            const arr = Array.from(items).filter(value => {
                return value.matches('.js-suggest-item');
            });
            e.target.classList.add('is-active');
            suggest.set('position', arr.indexOf(e.target));
            suggest.set('entered', false);
        }
    });

    document.addEventListener('click', e => {
        if (e.target.matches('.js-suggest-item')) {
            const input = e.target.parentNode.parentNode.querySelector('input');
            input.value = e.target.textContent;
            suggest.set('entered', true);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        inputStation('.js-input-station');
    });
})()