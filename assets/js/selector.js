function selector() {
    const time = 250;
    const obj = ".js-selector-item";
    const toggleClass = "is-selected";
    const initID = "#js-selector-item-0"; // set default on current card
    const content = ".js-selector-content";
    let paynow = true;

    if ($(obj)[0]) {
        $(obj).each(function (i) {
            $(this).attr("id", "js-selector-item-" + i);
        });
    };

    if ($(obj)[0]) {
        $(content).slideUp(time);
        $(initID + " " + content).slideDown(0);
        $(initID).addClass(toggleClass);

        $(obj).click(function () {
            if (!$(this).hasClass(toggleClass)) {
                $(obj).removeClass(toggleClass);
                $(this).addClass(toggleClass);
                $(content).slideUp(time);
                $(content, this).slideDown(time);

                if (paynow) {
                    $(".js-pay-now").delay(time).slideUp(time);
                    paynow = false;
                } else {
                    $(".js-pay-now").delay(time).slideDown(time);
                    paynow = true;
                };
            };
        });
    };
};
selector();