$(document).ready(function () {

    $("i[title]").click(function () {
        $(".title").each(function (index) {
            $(this).remove();
        });
        var $title = $(this).find(".title");
        if (!$title.length) {
            $(this).append('<span class="title">' + $(this).attr("title") + '</span>');

        } else {
            $title.remove();
        }
    });

    $("input").focus(function () {
        $(".title").each(function (index) {
            $(this).remove();
        });
    });
});
