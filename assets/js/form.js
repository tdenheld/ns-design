'use strict';

(() => {
    const form = $('#js-form');
    const formField = $('.js-formfield');
    const errorLabelClass = 'ff__error is-hidden js-formfield-error';

    if (!form[0]) return
    form.validate({
        onkeyup: false,
        errorClass: 'is-error',
        errorPlacement(label, element) {
            label.addClass(errorLabelClass);
            if (element.attr('type') === 'radio' || element.attr('type') === 'checkbox') {
                $(element).closest('.js-ff-rc').append(label);
            } else {
                label.insertAfter(element);
            }
        },
        wrapper: 'div',
        rules: {
            datum: {
                minlength: 10,
                maxlength: 10
            },
            postcode: {
                minlength: 6,
                maxlength: 7
            }
        },
        messages: {
            van: 'Vul een geldig vertrekstation in.',
            naar: 'Vul een geldig aankomststation in.',
            station: 'Vul een geldig station in.',
            datum: 'Vul een geldige datum in.',
            voorletters: 'Vul je voorletters in.',
            achternaam: 'Vul je achternaam in',
            postcode: 'Vul een geldige postcode in.',
            huisnummer: 'Vul je huisnummer in.',
            e_mailadres: {
                required: 'Vul je e-mailadres in.',
                email: 'Kijk nog even. Dit e-mailadres lijkt niet correct.',
            },
        },
    });

    $.extend(jQuery.validator.messages, {
        required: 'Vul dit veld in.',
    });

    // remove error on key up
    if (!formField[0]) return
    formField.each(function () {
        const vm = this;
        $('input', vm).keyup((e) => {
            if (e.key !== 'Enter') $('.js-formfield-error', vm).slideUp(200);
        });
        $('select', vm).change(() => {
            $('.js-formfield-error', vm).slideUp(200);
        });
    });
})();



// date masking
// ------------------------------------------------------------------
(() => {
    const input = $('#datum');
    if (!input[0]) return

    // only numbers are valid input
    input.keydown(e => {
        if (isNaN(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') return false;
    });

    input.keyup(e => {
        // add hyphen when digits are typed
        const n = input.val();
        if (e.key !== 'Backspace') {
            if (n.length == 2 || n.length == 5) input.val(n + "-");
        }
    });
})();



// select other items in select box
// ------------------------------------------------------------------
(() => {
    const check = (el) => {
        const n = el.nextElementSibling;
        if (el.value === 'other') {
            slideDown(n, 200, () => n.firstElementChild.focus());
        } else {
            slideUp(n, 150);
        }
    }

    if (!exists('.js-select-other')) return;
    ß('.js-select-other').map(el => {
        if (el.value === 'other') slideDown(el.nextElementSibling, 200);
        el.addEventListener('change', e => check(e.target));
    });
})();



// reveal content when choosing an option in a radiobutton
// ------------------------------------------------------------------
(() => {
    const obj = $('.js-radio');
    const allContent = $('.js-radio-content');
    if (!exists('.js-radio')) return;

    obj.each(function () {
        const radio = $('input[type="radio"]', this);
        const content = $('.js-radio-content', this);

        radio.change(() => {
            allContent.slideUp(200);
            content.slideDown(200);
        });

        if (radio.is(':checked')) content.slideDown(200);
    });
})();



// prefill departure time +20 from now
// ------------------------------------------------------------------
(() => {
    if (!exists('#vertrektijd')) return;
    const departureTime = document.querySelector('#vertrektijd');

    moment.locale('nl');
    const time = moment().add(20, 'minutes').format('LT');
    departureTime.value = time;

    Modernizr.touch ? departureTime.type = 'time' : departureTime.type = 'text';
})();



// save input data in cookies
// ------------------------------------------------------------------
(() => {
    const setData = () => {
        const obj = '.js-set-data';
        if (!exists(obj)) return;

        ß(obj).map(el => {
            const value = (el.nodeName === 'INPUT') ? el.value : el.textContent;
            localStorage.setItem(el.id, value);
        });
    }

    const getData = () => {
        const obj = '[data-id]';
        if (!exists(obj)) return;

        ß(obj).map(el => {
            const data = checkLocalStorage(el.dataset.id);
            if (!data) return;
            (el.nodeName === 'INPUT') ? el.value = data: el.textContent = data;
        });
    }
    getData();

    const submit = '.js-submit';
    if (exists(submit)) ß(submit).map(el => el.addEventListener('click', () => setData()));

    // split chipcard number to 4 chunks
    ß('.js-ovcp').map(el => {
        el.textContent = el.textContent.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/, '');
    });
})();