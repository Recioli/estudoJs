/*! jQuery Bootstrap Tab Static
 *
 *  TabPlugin usando o design de tabs do Bootstrap.
 *  Criado para permitir uam tab dentro de outra.
 */
(function (n) { n(document).ready(function () { var t = n("[data-toggle='tab-static'] a[data-tabselector]"), i = t.first().closest("[data-toggle='tab-static']"), r = i.next(".tab-content"); t.click(function (t) { t.preventDefault(); var u = n(this), f = r.find(u.data("tabselector")); u.hasClass("active") || (r.find(".tab-pane").removeClass("active"), f.addClass("active"), i.find(".active").removeClass("active"), u.parent().addClass("active")); t.stopImmediatePropagation() }); t.first().click() }) })(jQuery);
