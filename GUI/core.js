// ページ切り替え関数。　モーション無し
function pageChange(page) {
    var a = "page-" + page;
    var r = document.getElementById('rootpage').children;
    var rlen = r.length;
    var read = "";

    // スタイル設定
    if (page == "index") {}


    for (var i = 0; i < rlen; i++) {
        read = r[i].id;
        // console.log(read.slice(0, 4));
        if (read.slice(0, 4) == "page") {
            if (read == a) {
                document.getElementById(a).style.display = "block"
            } else {
                document.getElementById(read).style.display = "none"
            }
        }
    }
}





const language = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage).substr(0, 2) == "ja" ? "ja" : "en";







// =======================================
//   Language Changer ver2     by lighfu
// =======================================

window.addEventListener('load', () => {
    var lang = language;
    // Init() は必ず一回だけ。2回目はエラー、
    AsLanguage.Init();
    // 言語設定　何度でも切り替え可能
    lang == "en" ? AsLanguage.Set('en') : AsLanguage.Set(lang);
});



let AsLanguage = {
    Init: function() {
        var elem = document.querySelectorAll('sw-lang');
        var csc = 0;
        // 言語トリガータグが見つかった場合に通る
        if (!(elem[0] === undefined)) {
            elem.forEach((a, i) => {
                var n = a.innerHTML;
                var t = n.match(/%\{.*?\}/g);
                try {
                    t.forEach((b) => {
                        var name = b.slice(2, -1);
                        n = n.replace(`%{${name}}`, `<sw-lang-block id="sw-lang-trans-${name}-${(++csc).toString()}"></sw-lang-block>`);
                    });
                    elem[i].innerHTML = n;
                } catch (e) {
                    og.write(`AsLanguage.Init(): 省略補間文字列が見つかりませんでした。 詳細な内容：${e}`, 'red')
                }
            });
        }
    },

    Set: function(lang) {
        var elem = document.querySelectorAll('sw-lang');
        var csc = 0;
        // 言語辞書を作成する
        var str = {
            'title': {
                'ja': '時報ロイド - 設定',
                'en': 'JihoRoid - Setting'
            },
            'top-text': {
                'ja': '時報ロイド の設定を行うことができます。設定を保存する場合は、右上のアイコンを押して保存できます。',
                'en': 'You can set "JihoRoid".  If you want to save the settings, you can do it with the save button on the upper right.'
            },
            'msExact': {
                'ja': '時報の告知タイミングを不安定にして、バッテリー消費量を減少させます。',
                'en': 'Destabilizes the timing of time signal notifications and reduces battery consumption.'
            },
            'msHeadphone': {
                'ja': '時報の音声出力をヘッドホンに限定します。スピーカーの場合は時報が無効になります。',
                'en': 'Limit the audio output of the time signal to headphones.  In the case of a speaker, the time signal is disabled.'
            },
            'msCommingTime': {
                'ja': '「まもなく○時になります。」の告知タイミングを設定できます。分単位です。',
                'en': 'You can set the notification timing of "It will be XX soon."  It is in minutes.'
            },
            'msVoiceVolume': {
                'ja': 'ボイスの音量を設定できます。実際の音量はシステム設定に基づいた○%の出力になります。',
                'en': 'You can set the volume of the voice.  The actual volume will be ○% output based on the system settings.'
            },
            'msSeVolume': {
                'ja': '効果音の音量を設定できます。実際の音量はシステム設定に基づいた○%の出力になります。',
                'en': 'You can set the volume of the SE.  The actual volume will be ○% output based on the system settings.'
            },
            'msAkane': {
                'ja': '琴葉茜 (あかね)',
                'en': 'Akane Kotonoha'
            },
            'msAoi': {
                'ja': '琴葉葵 (あおい)',
                'en': 'Aoi Kotonoha'
            },
            'msSelectVoice': {
                'ja': '時報ロイドの声を設定できます。',
                'en': 'Time signal Lloyd\'s voice can be set'
            },
            'nowAudioType': {
                'ja': '現在のオーディオタイプ：',
                'en': 'Now Audio Type: '
            },
            'about': {
                'ja': '時報ロイドについて',
                'en': 'JihoRoid'
            },
            'about_this': {
                'ja': '時報ロイドは、琴葉姉妹(VoiceRoid) が時間単位で時刻をお知らせするプレミアム向けフローチャートです。',
                'en': '”JihoRoid” is a flow chart for premium that Kotonoha sisters (VoiceRoid) informs the time on an hourly basis.'
            },
            'about_notice': {
                'ja': 'Automate の実行速度が遅いと、時報のボイスが区切れ区切れになってしまうのでご注意ください。',
                'en': 'Please note that if the execution speed of Automate is slow, the voice of the time signal will be separated.'
            },
            'back': {
                'ja': '戻る',
                'en': 'Back'
            },
            'extract': {
                'ja': '抽出',
                'en': 'Extract'
            },
            'extract': {
                'ja': '抽出',
                'en': 'Extract'
            },
            'extract': {
                'ja': '抽出',
                'en': 'Extract'
            },


        };
        // 言語トリガータグが見つかった場合に通る
        if (!(elem[0] === undefined)) {
            elem.forEach((a, i) => {
                var tblock = a.querySelectorAll('sw-lang-block');
                // log.write(tblock[0].id);
                tblock.forEach((a) => {
                    // log.write(a.id);
                    var id = a.id;
                    var name = id.slice(14, id.length).match('(.*)-')[1];
                    // log.write(name)
                    try {
                        if (!(str[name][lang] === undefined)) {
                            document.getElementById(id).innerHTML = str[name][lang];
                        } else {
                            // エラーハイライト
                            document.getElementById(id).innerHTML = AsLanguage.Highlight(name, 'black', 'yellow');

                            // エラーログ
                            log.write(`AsLanguage.Set: 言語に対する文字列がありません : <b><span style='color:lightsalmon'>${lang}</span></b> : <span style='color:lightgreen'>%{${name}}</span>`, 'yellow');
                        }

                    } catch (e) {
                        // エラーハイライト
                        document.getElementById(id).innerHTML = AsLanguage.Highlight(name, 'black', 'red');

                        // エラーログ
                        log.write(`AsLanguage.Set: 省略補間エラー : <span style='color:lightgreen'>%{${name}}</span>`, 'red');
                        // log.write(`AsLanguage.Set: ${e}`, 'red');
                    }
                });
            });
        }
    },

    Highlight: function(string, color, backcolor) {
        return `<span style='color:${color}; background-color:${backcolor}; border: 1px solid mediumslateblue'><b>%{${string}}</b></span>`
    }
};
// --------------------------------

// log.write(window.location.search);

function queryGet(query) {
    try {
        var q = decodeURIComponent(window.location.search);
        return q.match(query + '=".*?"')[0].slice(query.length + 2, -1);
    } catch {
        return null;
    }
    return null;

}