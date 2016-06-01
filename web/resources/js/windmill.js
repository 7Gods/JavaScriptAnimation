/* 
 * イベントを登録して
 * windmilロジックを実行
 */

//ID受け取り
var cvs = document.getElementById("CanCan");
var ctx = cvs.getContext('2d');
var rect = cvs.getBoundingClientRect();

//基本角度間隔1回転1440分割=360*4
var baseAngle=Math.PI/720;

var windmillLogic = createWindmillLogic();

//canvasサイズ変更※リアルタイムで、canvasサイズが変更される際に使用
var CanvasResize = function(canvas,width,height){
    var img = new Image();
    img.onload = function(){
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,width,height);
    };
    img.src = canvas.toDataURL();
};

//マウス位置取得
function MouseMoveFunc(e){
    windmillLogic.setMousePosition(
            e.clientX -rect.left,
            e.clientY -rect.top);
    //console.log("MouseMoveFunc");
}
//マウスボタン情報(押した瞬間のみ)
function MouseDownEvent(e){
    //console.log("Down");
    windmillLogic.setMouseDownStatus(true);
}
//マウスボタン情報(離した瞬間のみ)
function MouseUpEvent(e){
    //console.log("Up");
    windmillLogic.setMouseDownStatus(false);
}
//マウスボタン情報(クリックされた時のみ)
function MouseClickedEvent(e){
    //console.log("clicked");
    windmillLogic.setMouseDownStatus(false);
    }
 //ローカルストレージ使える確認 
 if (!window.localStorage) {
    alert("お使いのブラウザはlocalstorageに対応してません");
  }
//以下、実際の処理
//クロールバー非表示
document.body.style.overflow = "hidden";
////イベントセット
cvs.addEventListener("mousemove",MouseMoveFunc);
//ボタン押された時(問題:右クリックにも反応)
cvs.addEventListener("mousedown",MouseDownEvent,false);
//ボタン離された時
cvs.addEventListener("click",MouseClickedEvent,false);
//クリックされた時(ボタン離された時イベントの予備)
cvs.addEventListener("mouseup",MouseUpEvent,false);
//グラフィック出力域設定
CanvasResize(cvs,window.innerWidth,window.innerHeight);
//初期化
windmillLogic.init(ctx);
//開始
windmillLogic.rewrite();
