(function ($) {
    $.fn.turnOffValidation = function () {
        var settings = this.validate().settings;

        for (var ruleIndex in settings.rules) {
            delete settings.rules[ruleIndex];
        }
    };
})(jQuery);
