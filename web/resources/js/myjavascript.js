var cvs = document.getElementById("CanCan");

var ctx = cvs.getContext('2d');
var rect = cvs.getBoundingClientRect();
var p=0;
var mx =0;
var my =0;
var g =0.8;
var x=window.innerWidth/2;
var y=window.innerHeight/2;
var vx = 0;
var vy = 0;

var radius =40;

//1秒ごとに行う処理
var rewrite = function() {
    var windowW= window.innerWidth;
    var windowH=window.innerHeight;
    console.log("W:"+windowW+" H"+windowH);
    //消す(塗りつぶす)
    ctx.fillStyle = "#dfffff";
    ctx.fillRect(0, 0, windowW, windowH);
    //Canvasサイズ変更
    //CanvasResize(cvs,window.innerWidth,window.innerHeight);
    //ベクトル方向取得
    var gdir = get_vecter(windowW,windowH);
    if(gdir % 2 === 1){
        vx+=(gdir ===1 ? -1 : 1);
    }else if(gdir % 2 === 0){
        vy+=(gdir ===2 ? -1 : 1);
    }
    console.log("vx:"+vx+" vy:"+vy);
    if(x===radius && 0<=vx && vx<1){
        vx=0;
    }else if(x+vx<radius){
        x=radius;
        vx*=-g;
        vy*=g;
    }else if(windowW-radius < x+vx){
        x=windowW-radius;
        vx*=-g;
        vy*=g;
    }else{
        x+=vx;
    }
    if(y===radius && vx<0 && -1<=vx){
        vx=0;
    }else if(y+vy<radius){
        y=radius;
        vy*=-g;
        vx*=g;
    }else if(windowH-radius < y+vy){
        y=windowH-radius;
        vy*=-g;
        vx*=g;
    }else{
        y+=vy;
    }
    
    x+=vx;
    y+=vy;
    //玉描画
    ctx.beginPath();
    ctx.fillStyle = '#FF9933';
    drawBall(x,y,radius);
    ctx.fill();

    console.log("x:"+x+" y:"+y);
    refresh();
};
var refresh = function(){
    setTimeout(rewrite ,60);
};

//マウス情報
function MouseMoveFunc(e){
    mx=e.clientX -rect.left;
    my=e.clientY -rect.top;
    //console.log("mx:"+mx+" my:"+my);
}
//ボール描画
function  drawBall(bx ,by, bradius){
    ctx.beginPath();
    ctx.fillStyle = '#FF1943';
    ctx.arc(bx,by,bradius,0,Math.PI*2.0,true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.arc(x,y,radius*0.8,0,Math.PI*2.0,true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(x,y,radius*0.6,0,Math.PI*2.0,true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.arc(x,y,radius*0.4,0,Math.PI*2.0,true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#FF69B4';
    ctx.arc(x,y,radius*0.2,0,Math.PI*2.0,true);
    ctx.fill();
}

//canvasサイズ変更
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



//ベクトル方向取得 +y:0, -y:2, -x:1, +x;3 ゼロベク:-1
function get_vecter(windowW, windowH) {
        var inner =20;
	var dx= windowW/2 - mx;
	var dy= windowH/2 -my;
        console.log("dx:"+dx+" dy:"+dy);
        return (Math.abs(dx)+Math.abs(dy) <= inner 
            ? -1 
            :(
                Math.abs(dx)>Math.abs(dy) 
                    ? (dx>0 ? 1 : 3)
                    : (dy>0 ? 2 : 0)
            ) 
        );
}
console.log("実行");
//スクロールバー非表示
document.body.style.overflow = "hidden";

cvs.addEventListener("mousemove",MouseMoveFunc);
CanvasResize(cvs,window.innerWidth,window.innerHeight);
rewrite();



