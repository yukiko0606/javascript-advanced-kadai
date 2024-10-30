//表示するテキスト変数の初期化
let typed = '';
let untyped = '';
//スコア
let score = 0;
// 表示するテキスト
const textArr = [
   'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'];

const untypedElm = document.getElementById('untyped');
const typedElm = document.getElementById('typed');
const wrapElm = document.getElementById('wrap');
const conutElm = document.getElementById('conut');
const typedConutElm = document.getElementById('typedConut');

// ランダムなテキストを表示
const creatText = () => {
    // ランダム
    let index =  Math.floor( Math.random() * textArr.length);
    untyped = textArr[index];
    console.log(untyped.substring(2,4));
    untypedElm.textContent = untyped;
}

//キー判定
const keypress = e => {
    //console.log(e.key);
    let chkKey = untyped.substring(0,1);
    //入力テキストのチェック
    if(chkKey !== e.key){
        wrapElm.classList.add('mistyped');
        setTimeout(() => {
            wrapElm.classList.remove('mistyped');        
        },100);
        return;
    }
    // 正しい場合、スコアを加算
    score++;
    typed = typed + chkKey;
    untyped = untyped.substring(1);
    typedElm.textContent = typed;
    untypedElm.textContent = untyped;
    //現在のタイプ数を表示
    typedConutElm.textContent = score;

    //テキストがなくなった場合
    if(untyped === ''){
        typed = '';
        untyped  = '';
        typedElm.textContent = '';
        creatText();
    }
}


//カウントタイマー機能
const timer = () => {
    let time = conutElm.textContent;
    console.log(time);
    const countdownInterval = setInterval(() => {
        time--;
        conutElm.textContent = time;
        //0以下になった場合
        if(time <= 0){
            typedElm.textContent = '';
            untypedElm.textContent = 'タイムアップ！';
            setTimeout(() => {
                gameOver(countdownInterval);
            },10);
        }
    },1000);
}

//ゲームオーバー
const gameOver = (id) => {
    clearInterval(id);
    let result = confirm(rankCheck(score));
    if(result){
        window.location.reload();
    }
}
//ランク判定
const rankCheck = (score) => {

    let text = '';
    if(score < 100){
        text = `あなたのランクはCです。\nBランクまで${100-score}文字です。`;
    }else if(score < 200){
        text = `あなたのランクはBです。\nAランクまで${200-score}文字です。`;
    }else if(score < 300){
        text = `あなたのランクはAです。\nSランクまで${300-score}文字です。`;
    }else {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
}

//ブラウザを読み込み直後
untypedElm.textContent = 'スタートボタンで開始';

//スタートボタンが押下された時
const btnElm = document.getElementById('startBtn');
btnElm.addEventListener('click', () => {
    //スタートボタンを非表示にする
    btnElm.style.display = 'none';
    //現在のタイプ数エリアを表示する
    typedConutElm.style.display = 'block';
    // テキストを生成
    creatText();
    //カウント開始
    timer();
    //キーボードが押下された時
    document.addEventListener('keypress', keypress);
});