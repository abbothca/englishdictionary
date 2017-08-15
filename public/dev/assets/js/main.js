var Header = function () {
    return {
        menuToogle: function () {
            var button = $('#toggle');
            button.on('click', function () {
                $(".nicescroll").getNiceScroll().remove();
                button.toggleClass('open');
                $('.menu__nav').toggleClass('open');
                $('body').toggleClass('open');

                setTimeout(function () {
                    $(".nicescroll").niceScroll({
                        cursorcolor: "#00B7FF",
                        cursorwidth: "8px",
                        cursoropacitymin: 0.8
                    });
                }, 300);
            });
        }
    };
};

var Translator = function () {

    return {
        submit: function (text) {

            $.ajax({
                method: "POST",
                url: "/translate",
                data: {text: text, from: "en", to: "ua"}
            })
                    .done(function (msg) {
                        console.log(msg);
                        $("<li class='translate__item'> <ol class='translate__word'> </ol></li>").prependTo($("#list"));
                        var insertTo = $(".translate__item:first-child").find('.translate__word');

                        msg1 = JSON.stringify(msg);
                        var s = msg1.replace(/\\n/g, "\\n")
                                .replace(/\\'/g, "\\'")
                                .replace(/\\"/g, '\\"')
                                .replace(/\\&/g, "\\&")
                                .replace(/\\r/g, "\\r")
                                .replace(/\\t/g, "\\t")
                                .replace(/\\b/g, "\\b")
                                .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
                        s = s.replace(/[\u0000-\u0019]+/g, "");
                        var obj = JSON.parse(s);

                        $("<li class='google'><strong>" + text + "</strong> - " + obj.google.text + "</li>").prependTo(insertTo);

                        for (var i = 0; i < obj.oxford.length; i++) {
                            addMeaning(obj.oxford[i], insertTo, i);
                        }

                    });
        }
    };
};

function addMeaning(obj, insertTo, i) {
    var ulList = $("<ul class='translate__describe'> </ul>").appendTo(insertTo);
    $('<li class="describe__item"> <span class="word">' + obj.text + '</span>  <strong>[ ' + obj.spelling + ' ]</strong> (' + obj.category + ') - ' + obj.definitions[0] + '</li>').prependTo(ulList);
    $('<li class="describe__item"><audio controls><source src="' + obj.audio + '" type="audio/mpeg"></audio></li>').appendTo(ulList);

}
;

$(function () {
    $("#accordion").accordion();

    $("body").niceScroll({
        cursorcolor: "#00B7FF",
        cursorwidth: "8px",
        cursoropacitymin: 0.8
    });
    $(".nicescroll").niceScroll({
        cursorcolor: "#00B7FF",
        cursorwidth: "8px",
        cursoropacitymin: 0.8
    });

    var header = new Header();
    header.menuToogle();

    var custom = new Translator();

    $("#oxford").on("click", function (event) {
        event.preventDefault();
        custom.oxford($("#text").val());
    });

    $("#translate").on("submit", function (event) {
        event.preventDefault();
        custom.submit($("#text").val());
    });

    $(document).on('click', '.remove', function (event) {
        $(event.target).parent('li').remove();
    });

});