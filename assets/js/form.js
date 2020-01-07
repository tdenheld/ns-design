'use strict';

(() => {
    const form = $('#js-form');
    const formField = $('.js-formfield');
    const errorLabelClass = 'ff__error is-hidden js-formfield-error';

    if (!form[0]) return
    form.validate({
        onkeyup: false,
        errorClass: 'is-error',
        errorPlacement: function (label, element) {
            label.addClass(errorLabelClass);
            if (element.attr('type') === 'radio' || element.attr('type') === 'checkbox') {
                label.insertAfter($(element).parents('.js-ff-rc'));
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
            datum: 'Vul een geldige datum in. (Vandaag of in het verleden.)',
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