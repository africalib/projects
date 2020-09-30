var title = '우리는_주의_자녀';
var startTime = 0;

$(window).on('load', function () {
    var $audio = document.getElementById('mr');
    var $time = $('#time');
    var lyrics = [];
    var seconds = startTime;
    var $l = $('#lyric');
    var $v = $l.find('.value');
    var $c = $l.find('.count');

    var play = function () {
        $audio.play();
        $audio.currentTime = startTime;
        $audio.volume = 0.21;
        timer = setInterval(function () {
            for (var i in lyrics) {
                if (parseFloat(lyrics[i].countAt) > 0) {
                    if (parseFloat((parseFloat(lyrics[i].countAt) - 2.1).toFixed(1)) === parseFloat(seconds))
                        $c.text(3);
                    else if (parseFloat((parseFloat(lyrics[i].countAt) - 1.4).toFixed(1)) === parseFloat(seconds))
                        $c.text(2);
                    else if (parseFloat((parseFloat(lyrics[i].countAt) - 0.7).toFixed(1)) === parseFloat(seconds))
                        $c.text(1);
                    else if (parseFloat(lyrics[i].countAt) === parseFloat(seconds))
                        $c.text('');
                }

                if (parseFloat(lyrics[i].at) === parseFloat(seconds)) {
                    $v.html(lyrics[i].value);
                    $l.css('fontSize', lyrics[i].size + 'px').css('marginTop', -($v.height() / 2) + 'px');

                    if (i >= lyrics.length - 1) {
                        clearInterval(timer);
                        return;
                    }
                    break;
                }
            }
            seconds = (parseFloat(seconds) + 0.1).toFixed(1);
            //$time.text(seconds);
        }, 100);
    }

    $audio.setAttribute('src', 'lyrics/' + title + '.mp3');

    $.get('lyrics/' + title + '.json', function (res) {
        lyrics = res;
        $v.html(lyrics[0].value);
        $l.css('fontSize', lyrics[0].size + 'px').css('marginTop', -($v.height() / 2) + 'px');
    });

    $(document).on('keyup', function (e) {
        if (lyrics.length) {
            if (e.keyCode === 13) {
                play();
            }
            else if (e.keyCode === 32) {
                if ($audio.paused) {
                    play();
                }
                else {
                    clearInterval(timer);
                    $audio.pause();
                }
            }
        }
    });
});