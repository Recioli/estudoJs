/*! jQuery Loading Motion v1.0
*
*   Plugin to emulate a loading motion of an element, who consists on fadein and fadeout continuously the element until triggers the "finishLoadingFade()" method.
*   @Author: Lenilson de Castro
*/
(function (n) { var t = { time: 500 }; n.fn.startLoadingFade = function (i) { var r = this, u = n.extend(t, i), f; return r.addClass("cursor-loading"), f = setTimeout(function () { r.fadeToggle(u.time); r.startLoadingFade(u.time) }, u.time), r.data("timeOut", f), this }; n.fn.finishLoadingFade = function (n) { n = n || !1; var i = this, r = i.data("timeOut"); i.removeClass("cursor-loading"); r && clearTimeout(r); n ? i.hide() : i.fadeIn(t.time) } })(jQuery);
