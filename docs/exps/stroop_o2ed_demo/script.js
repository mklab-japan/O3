// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "stroop_o2ed_demo",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "stroop_o2ed_demo",
    "description": "",
    "repository": "",
    "contributors": "Masanori Kobayashi"
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Sequence",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "exp",
      "plugins": [
        {
          "type": "fullscreen",
          "message": "本実験はフルスクリーン表示で実施します。準備ができたら，下のボタンをクリックしてください。",
          "hint": "\u003Cbutton\u003Eフルスクリーンで開始\u003C\u002Fbutton\u003E",
          "path": "lab.plugins.Fullscreen"
        }
      ],
      "content": [
        {
          "type": "lab.flow.Sequence",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "instruction",
          "content": [
            {
              "type": "lab.html.Page",
              "items": [
                {
                  "type": "text",
                  "title": "本実験にご参加ありがとうございます。",
                  "content": "本実験では，画面に表示された単語の「文字色」を入力するという課題に取りくんでいだきます。"
                },
                {
                  "required": true,
                  "type": "text",
                  "title": "データの保存について",
                  "content": "実験終了後にご自身のデータをダウンロードすることが可能です。なお，本実験はデモのため，サーバー側にデータは保存されませんのでご安心ください。"
                }
              ],
              "scrollTop": true,
              "submitButtonText": "次へ",
              "submitButtonPosition": "right",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {
                "run": function anonymous(
) {
//run introJS
const instSteps = [{
    title: '実験にご参加ありがとうございます！',
    intro: 'これから実験の内容をご説明します。ゆっくりご覧ください。'
}]

introJs().setOptions({
  nextLabel: '次へ',
  prevLabel: '戻る',
  doneLabel: 'OK',
  steps: instSteps
}).start();
}
              },
              "title": "instruction"
            },
            {
              "type": "lab.html.Page",
              "items": [
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cspan id =\"item\" style = \"color:red; font-size:6vh\"\u003E赤\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                  "name": ""
                },
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"w-m alert content-horizontal-center\" id =\"input\"\u003E\u003Cspan style = \"animation: blink 0.5s linear infinite alternate;\" id=\"inputWindow\"\u003E|\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                  "name": ""
                },
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cp style=\"color:gray; font-size:1.5vh\"\u003E刺激の色名をできるだけ速く入力し，Enterで入力内容を確定してください\n  \u003Cbr\u003E（色名は，あお，あか，みどり，きいろのいずれかを入力してください）\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E",
                  "name": ""
                }
              ],
              "scrollTop": true,
              "submitButtonText": "次へ",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {
                "before:prepare": function anonymous(
) {
let inputArray =[]
let text;
let convertText = "";
window.response = "";

//初期カーソルの点滅用のCSSを追加
const css = document.createElement('style')
css.media = 'screen'
css.type = 'text/css'

const cssKeyframes ='@keyframes blink{ 0% {opacity: 0} 100% {opacity: 1.0}}';
const rules = document.createTextNode(cssKeyframes)
css.appendChild(rules)

document.getElementsByTagName('head')[0].appendChild(css);

//キー入力時
this.options.events['keydown'] = function(e) {
  //点滅をやめる
  if(inputArray.length <= 0)
  {
    document.getElementById('inputWindow').style = 'text-decoration: underline';
  }
  //削除時
  if(e.key == 'Backspace' || e.key == 'Delete'){
      //1文字のみの時はカーソルを表示
      if(inputArray.length == 1)
      {
        inputArray =['|']
        document.getElementById('inputWindow').style = 'animation: blink 0.5s linear infinite alternate;';
      }
      else{
        inputArray.pop();
      }
  }

  //押されたキーが1文字の時
  else if(e.key.length == 1){
    //最後まで消していた場合
    if(inputArray[0] == '|')
    {
      inputArray.pop()
      document.getElementById('inputWindow').style = 'text-decoration: underline';
    }
    inputArray.push(e.key);
  }

  //Enterの場合は終了
  else if(e.key == 'Enter')
  {
    this.end();
  }
  //配列を1つにまとめる
  convertText = inputArray.join('');

  //アルファベットをひらがな/カタカナに変換
  convertText = wanakana.toHiragana(convertText, {customKanaMapping: { n: 'n', nn: 'ん'}});
  
  //変換したテキストを表示
  document.getElementById('inputWindow').textContent = convertText;
  //変換したテキストを反応として保存
  this.data.response = convertText;
  window.response = convertText;
}
},
                "run": function anonymous(
) {
const instSteps = [{
    title: '課題の説明',
    intro: 'これから課題の内容を説明します。画面をご覧ください。'
  },
  {
    element: document.querySelector('#item'),
    intro: '画面中央にこのように文字が表示されます。文字の色が何色かを「できるだけ速くかつ正確に」判断してください。'
  },
  {
    element: document.querySelector('#input'),
    intro: '文字の色をここにキーボードで入力していただきます。'
  },
  {
      element: document.querySelector('#input'),
    intro: 'では，実際にやってみましょう。いまここで，キーボードで「あか」と入力し，Enterを押してみてください。'
  },]

introJs().setOptions({
  nextLabel: '次へ',
  prevLabel: '戻る',
  doneLabel: 'OK',
  steps: instSteps
}).start();
},
                "end": function anonymous(
) {
const response = window.response

if(response == "あか")
{
  this.data.correct = 1;
}
else
{
  this.data.correct = 0;
}
}
              },
              "title": "inst_item"
            },
            {
              "type": "lab.html.Page",
              "items": [],
              "scrollTop": true,
              "submitButtonText": "Continue →",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "blank",
              "timeout": "500"
            },
            {
              "type": "lab.html.Page",
              "items": [
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cspan style = \"color:black; font-size:6vh\"\u003E${this.state.correct==\"1\" ? \"○\" : \"×\"}\u003C\u002Fspan\u003E\n\u003C\u002Fdiv\u003E",
                  "name": ""
                }
              ],
              "scrollTop": true,
              "submitButtonText": "Continue →",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "feedback",
              "timeout": "500",
              "tardy": true
            },
            {
              "type": "lab.html.Page",
              "items": [],
              "scrollTop": true,
              "submitButtonText": "Continue →",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "blank",
              "timeout": "500"
            },
            {
              "type": "lab.html.Page",
              "items": [
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cspan id =\"item\" style = \"color:red; font-size:6vh\"\u003E青\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                  "name": ""
                },
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"w-m alert content-horizontal-center\" id =\"input\"\u003E\u003Cspan style = \"animation: blink 0.5s linear infinite alternate;\" id=\"inputWindow\"\u003E|\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                  "name": ""
                },
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cp style=\"color:gray; font-size:1.5vh\"\u003E刺激の色名をできるだけ速く入力し，Enterで入力内容を確定してください\n  \u003Cbr\u003E（色名は，あお，あか，みどり，きいろのいずれかを入力してください）\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E",
                  "name": ""
                }
              ],
              "scrollTop": true,
              "submitButtonText": "次へ",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {
                "before:prepare": function anonymous(
) {
let inputArray =[]
let text;
let convertText = "";
window.response = "";

//初期カーソルの点滅用のCSSを追加
const css = document.createElement('style')
css.media = 'screen'
css.type = 'text/css'

const cssKeyframes ='@keyframes blink{ 0% {opacity: 0} 100% {opacity: 1.0}}';
const rules = document.createTextNode(cssKeyframes)
css.appendChild(rules)

document.getElementsByTagName('head')[0].appendChild(css);

//キー入力時
this.options.events['keydown'] = function(e) {
  //点滅をやめる
  if(inputArray.length <= 0)
  {
    document.getElementById('inputWindow').style = 'text-decoration: underline';
  }
  //削除時
  if(e.key == 'Backspace' || e.key == 'Delete'){
      //1文字のみの時はカーソルを表示
      if(inputArray.length == 1)
      {
        inputArray =['|']
        document.getElementById('inputWindow').style = 'animation: blink 0.5s linear infinite alternate;';
      }
      else{
        inputArray.pop();
      }
  }

  //押されたキーが1文字の時
  else if(e.key.length == 1){
    //最後まで消していた場合
    if(inputArray[0] == '|')
    {
      inputArray.pop()
      document.getElementById('inputWindow').style = 'text-decoration: underline';
    }
    inputArray.push(e.key);
  }

  //Enterの場合は終了
  else if(e.key == 'Enter')
  {
    this.end();
  }
  //配列を1つにまとめる
  convertText = inputArray.join('');

  //アルファベットをひらがな/カタカナに変換
  convertText = wanakana.toHiragana(convertText, {customKanaMapping: { n: 'n', nn: 'ん'}});
  
  //変換したテキストを表示
  document.getElementById('inputWindow').textContent = convertText;
  //変換したテキストを反応として保存
  this.data.response = convertText;
  window.response = convertText;
}
},
                "run": function anonymous(
) {
const instSteps = [{
    title: 'もう一度練習してみましょう',
    intro: 'では，もう一度，練習してみましょう。'
  },
  {
    element: document.querySelector('#item'),
    intro: '先ほどと文字の意味は変わっています。ですが，先ほどと同じく，文字色は「あか」です。'
  },
  {
    element: document.querySelector('#input'),
    intro: 'したがって，今回もキーボードで「あか」と答えるのが正解となります。では，実際に「あか」とキーボードで入力し，Enterを押してみてください。'
  },]

introJs().setOptions({
  nextLabel: '次へ',
  prevLabel: '戻る',
  doneLabel: 'OK',
  steps: instSteps
}).start();
},
                "end": function anonymous(
) {
const response = window.response

if(response == "あか")
{
  this.data.correct = 1;
}
else
{
  this.data.correct = 0;
}
}
              },
              "title": "inst_item"
            },
            {
              "type": "lab.html.Page",
              "items": [
                {
                  "required": true,
                  "type": "html",
                  "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cspan style = \"color:black; font-size:6vh\"\u003E${this.state.correct==\"1\" ? \"○\" : \"×\"}\u003C\u002Fspan\u003E\n\u003C\u002Fdiv\u003E",
                  "name": ""
                }
              ],
              "scrollTop": true,
              "submitButtonText": "Continue →",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "feedback",
              "timeout": "500",
              "tardy": true
            },
            {
              "type": "lab.html.Page",
              "items": [],
              "scrollTop": true,
              "submitButtonText": "Continue →",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "blank",
              "timeout": "500"
            },
            {
              "type": "lab.html.Page",
              "items": [
                {
                  "type": "text",
                  "title": "では，次に，練習を行ってみましょう。",
                  "content": "本番と同じように画面上に色々な単語が表示されます。\n\u003Cbr\u003E今度は，「赤，青，緑，黄」の4種類のいずれかの単語が表示されます。\n\u003Cbr\u003E表示された単語の文字色をキーボードで入力してください。\n\u003Cbr\u003E\n\u003Cbr\u003E準備ができたら，「次へ」をクリックしてください。\n\u003Cbr\u003E\u003Cspan style = \"font-size:1.5vh; color: gray\"\u003E（途中で実験を中止したい方は，ESCキーを押して全画面表示を解除し，ウィンドウを閉じてください）\u003C\u002Fspan\u003E"
                }
              ],
              "scrollTop": true,
              "submitButtonText": "次へ",
              "submitButtonPosition": "right",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "instruction"
            },
            {
              "type": "lab.flow.Loop",
              "templateParameters": [
                {
                  "item": "赤",
                  "color": "red",
                  "condition": "congruent"
                },
                {
                  "item": "青",
                  "color": "blue",
                  "condition": "congruent"
                },
                {
                  "item": "緑",
                  "color": "green",
                  "condition": "congruent"
                },
                {
                  "item": "黄",
                  "color": "gold",
                  "condition": "congruent"
                },
                {
                  "item": "赤",
                  "color": "red",
                  "condition": "congruent"
                },
                {
                  "item": "青",
                  "color": "blue",
                  "condition": "congruent"
                },
                {
                  "item": "緑",
                  "color": "green",
                  "condition": "congruent"
                },
                {
                  "item": "黄",
                  "color": "gold",
                  "condition": "congruent"
                },
                {
                  "item": "赤",
                  "color": "red",
                  "condition": "congruent"
                },
                {
                  "item": "青",
                  "color": "blue",
                  "condition": "congruent"
                },
                {
                  "item": "緑",
                  "color": "green",
                  "condition": "congruent"
                },
                {
                  "item": "黄",
                  "color": "gold",
                  "condition": "congruent"
                },
                {
                  "item": "緑",
                  "color": "red",
                  "condition": "incongruent"
                },
                {
                  "item": "赤",
                  "color": "blue",
                  "condition": "incongruent"
                },
                {
                  "item": "赤",
                  "color": "green",
                  "condition": "incongruent"
                },
                {
                  "item": "赤",
                  "color": "gold",
                  "condition": "incongruent"
                },
                {
                  "item": "青",
                  "color": "red",
                  "condition": "incongruent"
                },
                {
                  "item": "青",
                  "color": "green",
                  "condition": "incongruent"
                },
                {
                  "item": "青",
                  "color": "gold",
                  "condition": "incongruent"
                },
                {
                  "item": "緑",
                  "color": "blue",
                  "condition": "incongruent"
                },
                {
                  "item": "緑",
                  "color": "gold",
                  "condition": "incongruent"
                },
                {
                  "item": "黄",
                  "color": "red",
                  "condition": "incongruent"
                },
                {
                  "item": "黄",
                  "color": "blue",
                  "condition": "incongruent"
                },
                {
                  "item": "黄",
                  "color": "green",
                  "condition": "incongruent"
                }
              ],
              "sample": {
                "mode": "draw-shuffle",
                "n": "12"
              },
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "practiceBlock",
              "shuffleGroups": [],
              "template": {
                "type": "lab.flow.Sequence",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "trial",
                "content": [
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cspan style = \"color:black; font-size:6vh\"\u003E+\u003C\u002Fspan\u003E\n\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "Continue →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "fixation",
                    "timeout": "500"
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [],
                    "scrollTop": true,
                    "submitButtonText": "Continue →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "blank",
                    "timeout": "500"
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cspan style = \"color:${this.parameters.color}; font-size:6vh\"\u003E${this.parameters.item}\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class=\"w-m alert content-horizontal-center\"\u003E\u003Cspan style = \"animation: blink 0.5s linear infinite alternate;\" id=\"inputWindow\"\u003E|\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                        "name": ""
                      },
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cp style=\"color:gray; font-size:1.5vh\"\u003E刺激の色名をできるだけ速く入力し，Enterで入力内容を確定してください\n  \u003Cbr\u003E（色名は，あお，あか，みどり，きいろのいずれかを入力してください）\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "次へ",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {
                      "before:prepare": function anonymous(
) {
let inputArray =[]
let text;
let convertText = "";
window.response = "";

//初期カーソルの点滅用のCSSを追加
const css = document.createElement('style')
css.media = 'screen'
css.type = 'text/css'

const cssKeyframes ='@keyframes blink{ 0% {opacity: 0} 100% {opacity: 1.0}}';
const rules = document.createTextNode(cssKeyframes)
css.appendChild(rules)

document.getElementsByTagName('head')[0].appendChild(css);

//キー入力時
this.options.events['keydown'] = function(e) {
  //点滅をやめる
  if(inputArray.length <= 0)
  {
    document.getElementById('inputWindow').style = 'text-decoration: underline';
  }
  //削除時
  if(e.key == 'Backspace' || e.key == 'Delete'){
      //1文字のみの時はカーソルを表示
      if(inputArray.length == 1)
      {
        inputArray =['|']
        document.getElementById('inputWindow').style = 'animation: blink 0.5s linear infinite alternate;';
      }
      else{
        inputArray.pop();
      }
  }

  //押されたキーが1文字の時
  else if(e.key.length == 1){
    //最後まで消していた場合
    if(inputArray[0] == '|')
    {
      inputArray.pop()
      document.getElementById('inputWindow').style = 'text-decoration: underline';
    }
    inputArray.push(e.key);
  }

  //Enterの場合は終了
  else if(e.key == 'Enter')
  {
    this.end();
  }
  //配列を1つにまとめる
  convertText = inputArray.join('');

  //アルファベットをひらがな/カタカナに変換
  convertText = wanakana.toHiragana(convertText, {customKanaMapping: { n: 'n', nn: 'ん'}});
  
  //変換したテキストを表示
  document.getElementById('inputWindow').textContent = convertText;
  //変換したテキストを反応として保存
  this.data.response = convertText;
  window.response = convertText;
}
},
                      "end": function anonymous(
) {
const response = window.response

if(this.parameters.color == "red" && response == "あか")
{
  this.data.correct = 1;
}
else if(this.parameters.color == "blue" && response == "あお")
{
  this.data.correct = 1;
}
else if(this.parameters.color == "green" && response == "みどり")
{
  this.data.correct = 1;
}
else if(this.parameters.color == "gold" && (response == "き" || response ==  "きいろ"))
{
  this.data.correct = 1;
}
else
{
  this.data.correct = 0;
}
}
                    },
                    "title": "pratcice_item"
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [
                      {
                        "required": true,
                        "type": "html",
                        "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cspan style = \"color:black; font-size:6vh\"\u003E${this.state.correct==\"1\" ? \"○\" : \"×\"}\u003C\u002Fspan\u003E\n\u003C\u002Fdiv\u003E",
                        "name": ""
                      }
                    ],
                    "scrollTop": true,
                    "submitButtonText": "Continue →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "feedback",
                    "timeout": "500",
                    "tardy": true
                  },
                  {
                    "type": "lab.html.Page",
                    "items": [],
                    "scrollTop": true,
                    "submitButtonText": "Continue →",
                    "submitButtonPosition": "hidden",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "blank",
                    "timeout": "500"
                  }
                ]
              }
            }
          ]
        },
        {
          "type": "lab.html.Page",
          "items": [
            {
              "type": "text",
              "title": "練習おつかれさまでした！",
              "content": "画面に表示された単語の「文字色」を入力できましたか？\u003Cbr\u003E\n本番でも同様に，画面に表示された単語の「文字色」を「できるだけ速くかつ正確に」キーボードで入力してください。"
            },
            {
              "required": true,
              "type": "text",
              "title": "続いて本番を実施します。",
              "content": "準備ができた方は「次へ」をクリックして，本番を開始してください。\n\u003Cbr\u003E\u003Cspan style = \"font-size:1.5vh; color: gray\"\u003E（途中で実験を中止したい方は，ESCキーを押して全画面表示を解除し，ウィンドウを閉じてください）\u003C\u002Fspan\u003E"
            }
          ],
          "scrollTop": true,
          "submitButtonText": "次へ",
          "submitButtonPosition": "right",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Ready"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "start",
          "content": "\u003Cmain class = \"content-horizontal-center content-vertical-center\"\u003E\n\u003Cdiv\u003E\n  \u003Cspan style = \"font-size:4vh\"\u003ESTART!\u003C\u002Fspan\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
          "timeout": "1000"
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "item": "赤",
              "color": "red",
              "condition": "congruent"
            },
            {
              "item": "青",
              "color": "blue",
              "condition": "congruent"
            },
            {
              "item": "緑",
              "color": "green",
              "condition": "congruent"
            },
            {
              "item": "黄",
              "color": "gold",
              "condition": "congruent"
            },
            {
              "item": "赤",
              "color": "red",
              "condition": "congruent"
            },
            {
              "item": "青",
              "color": "blue",
              "condition": "congruent"
            },
            {
              "item": "緑",
              "color": "green",
              "condition": "congruent"
            },
            {
              "item": "黄",
              "color": "gold",
              "condition": "congruent"
            },
            {
              "item": "赤",
              "color": "red",
              "condition": "congruent"
            },
            {
              "item": "青",
              "color": "blue",
              "condition": "congruent"
            },
            {
              "item": "緑",
              "color": "green",
              "condition": "congruent"
            },
            {
              "item": "黄",
              "color": "gold",
              "condition": "congruent"
            },
            {
              "item": "緑",
              "color": "red",
              "condition": "incongruent"
            },
            {
              "item": "赤",
              "color": "blue",
              "condition": "incongruent"
            },
            {
              "item": "赤",
              "color": "green",
              "condition": "incongruent"
            },
            {
              "item": "赤",
              "color": "gold",
              "condition": "incongruent"
            },
            {
              "item": "青",
              "color": "red",
              "condition": "incongruent"
            },
            {
              "item": "青",
              "color": "green",
              "condition": "incongruent"
            },
            {
              "item": "青",
              "color": "gold",
              "condition": "incongruent"
            },
            {
              "item": "緑",
              "color": "blue",
              "condition": "incongruent"
            },
            {
              "item": "緑",
              "color": "gold",
              "condition": "incongruent"
            },
            {
              "item": "黄",
              "color": "red",
              "condition": "incongruent"
            },
            {
              "item": "黄",
              "color": "blue",
              "condition": "incongruent"
            },
            {
              "item": "黄",
              "color": "green",
              "condition": "incongruent"
            }
          ],
          "sample": {
            "mode": "draw-shuffle",
            "n": "96"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "mainBlock",
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "trial",
            "content": [
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cspan style = \"color:black; font-size:6vh\"\u003E+\u003C\u002Fspan\u003E\n\u003C\u002Fdiv\u003E",
                    "name": ""
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "Continue →",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "fixation",
                "timeout": "500"
              },
              {
                "type": "lab.html.Page",
                "items": [],
                "scrollTop": true,
                "submitButtonText": "Continue →",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "blank",
                "timeout": "500"
              },
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cspan style = \"color:${this.parameters.color}; font-size:6vh\"\u003E${this.parameters.item}\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                    "name": ""
                  },
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class=\"w-m alert content-horizontal-center\"\u003E\u003Cspan style = \"animation: blink 0.5s linear infinite alternate;\" id=\"inputWindow\"\u003E|\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E",
                    "name": ""
                  },
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cp style=\"color:gray; font-size:1.5vh\"\u003E刺激の色名をできるだけ速く入力し，Enterで入力内容を確定してください\n  \u003Cbr\u003E（色名は，あお，あか，みどり，きいろのいずれかを入力してください）\n  \u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E",
                    "name": ""
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "次へ",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {
                  "before:prepare": function anonymous(
) {
let inputArray =[]
let text;
let convertText = "";
window.response = "";

//初期カーソルの点滅用のCSSを追加
const css = document.createElement('style')
css.media = 'screen'
css.type = 'text/css'

const cssKeyframes ='@keyframes blink{ 0% {opacity: 0} 100% {opacity: 1.0}}';
const rules = document.createTextNode(cssKeyframes)
css.appendChild(rules)

document.getElementsByTagName('head')[0].appendChild(css);

//キー入力時
this.options.events['keydown'] = function(e) {
  //点滅をやめる
  if(inputArray.length <= 0)
  {
    document.getElementById('inputWindow').style = 'text-decoration: underline';
  }
  //削除時
  if(e.key == 'Backspace' || e.key == 'Delete'){
      //1文字のみの時はカーソルを表示
      if(inputArray.length == 1)
      {
        inputArray =['|']
        document.getElementById('inputWindow').style = 'animation: blink 0.5s linear infinite alternate;';
      }
      else{
        inputArray.pop();
      }
  }

  //押されたキーが1文字の時
  else if(e.key.length == 1){
    //最後まで消していた場合
    if(inputArray[0] == '|')
    {
      inputArray.pop()
      document.getElementById('inputWindow').style = 'text-decoration: underline';
    }
    inputArray.push(e.key);
  }

  //Enterの場合は終了
  else if(e.key == 'Enter')
  {
    this.end();
  }
  //配列を1つにまとめる
  convertText = inputArray.join('');

  //アルファベットをひらがな/カタカナに変換
  convertText = wanakana.toHiragana(convertText, {customKanaMapping: { n: 'n', nn: 'ん'}});
  
  //変換したテキストを表示
  document.getElementById('inputWindow').textContent = convertText;
  //変換したテキストを反応として保存
  this.data.response = convertText;
  window.response = convertText;
}
},
                  "end": function anonymous(
) {
const response = window.response

if(this.parameters.color == "red" && response == "あか")
{
  this.data.correct = 1;
}
else if(this.parameters.color == "blue" && response == "あお")
{
  this.data.correct = 1;
}
else if(this.parameters.color == "green" && response == "みどり")
{
  this.data.correct = 1;
}
else if(this.parameters.color == "gold" && (response == "き" || response ==  "きいろ"))
{
  this.data.correct = 1;
}
else
{
  this.data.correct = 0;
}
}
                },
                "title": "item"
              },
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\n  \u003Cspan style = \"color:black; font-size:6vh\"\u003E${this.state.correct==\"1\" ? \"○\" : \"×\"}\u003C\u002Fspan\u003E\n\u003C\u002Fdiv\u003E",
                    "name": ""
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "Continue →",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "feedback",
                "timeout": "500",
                "tardy": true
              },
              {
                "type": "lab.html.Page",
                "items": [],
                "scrollTop": true,
                "submitButtonText": "Continue →",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "blank",
                "timeout": "500"
              }
            ]
          }
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "click button#next": "next"
          },
          "parameters": {},
          "messageHandlers": {
            "run": function anonymous(
) {
const ds = this.options.datastore

//一致条件のRTを計算
const congruentData = ds.data.filter(
  row => 
  row.sender === 'item' && row.condition === 'congruent' && row.correct === 1
)
const congruentRTs = congruentData.map(row => row.duration)
let meanCongruentRT = lab.util.stats.mean(congruentRTs)
const meanCongruentRTse = (lab.util.stats.std(congruentRTs))/Math.sqrt(congruentRTs.length)
meanCongruentRT = Math.round(meanCongruentRT, 0)

//不一致条件のRTを計算
const incongruentData = ds.data.filter(
  row => 
  row.sender === 'item' && row.condition === 'incongruent' && row.correct === 1
)
const incongruentRTs = incongruentData.map(row => row.duration)
let meanIncongruentRT = lab.util.stats.mean(incongruentRTs)
const meanIncongruentRTse =  (lab.util.stats.std(incongruentRTs))/Math.sqrt(incongruentRTs.length)
meanIncongruentRT = Math.round(meanIncongruentRT, 0)


//グラフ設定
new Chart(document.getElementById('plotArea').getContext('2d'), {
  type: 'barWithErrorBars',
  data: {
    labels: ['一致試行', '不一致試行', 'ストループ干渉量'],
    datasets: [
      {
        barThickness: 100,
        data: [
          {
            label:'一致試行',
            y: meanCongruentRT,
            yMin: meanCongruentRT - meanCongruentRTse,
            yMax: meanCongruentRT + meanCongruentRTse,
          },
          {
            label:'不一致試行',
            y: meanIncongruentRT,
            yMin: meanIncongruentRT - meanIncongruentRTse,
            yMax: meanIncongruentRT + meanIncongruentRTse,
          },
          {
            label:'ストループ干渉量',
            y: meanIncongruentRT - meanCongruentRT
          },
        ],
        //棒グラフの色
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(51, 255, 153, 0.5)'
        ],
      }
    ],
  },
  //y軸の最小と最大を指定
  options : {
    scales : {
      y : {
        min: 0,
        max: 5000,
      }
    },
    plugins:{
      legend: {
        display: false
      }
    }
  }
});
}
          },
          "title": "displayMeanCorrectRT",
          "content": "\u003Cheader\u003E\n  \u003Ch1\u003E平均正反応時間(ms)\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain class = \"content-horizontal-center content-vertical-center\"\u003E\n  \u003Cdiv class = \"w-l\"\u003E\n    \u003Ccanvas id = \"plotArea\"\u003E\u003C\u002Fcanvas\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter\u003E\n  \u003Cbutton id = \"next\"\u003E終了\u003C\u002Fbutton\u003E\u003Cbr\u003E終了ボタンを押すとウィンドウ上部ににデータのダウンロードボタンが表示されます\n\u003C\u002Ffooter\u003E",
          "tardy": true
        }
      ]
    }
  ]
})

// Let's go!
study.run()