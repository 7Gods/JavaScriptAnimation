/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//方向表示オブジェクト
function  createArrow(){
    //起点
    var x;
    var y;
    //ベクトル
    var vx;
    var vy;
    //色
    var color;
    //描画していいか確認
    var isAbleToDraw;
    //パワー
    var power;
    //
    var ctx;
    
    var arrow ={
        //初期化
        init : function (cnvContext){
            isAbleToDraw = false;
            ctx =cnvContext;
        },
        setData : function (ObjX,ObjY,x1,y1,length,color0){
            x = ObjX;
            y = ObjY;
            vx = x-x1;
            vy = y-y1;
            var len =Math.pow(vx,2)+Math.pow(vy,2);
            if(len-Math.pow(length,2)>0){
                var change =length/Math.sqrt(len);
                vx*=change;
                vy*=change;
                power = length;
            }else{
                power = Math.round(Math.sqrt(len));
            }
            color = color0;
            isAbleToDraw = true;
        },
        //
        draw : function(){
            //前に、setData関数呼ばれてなかったら、何もしない
            if(isAbleToDraw){
                ctx.strokeStyle = color;
                var vx1 = -vy;
                var vy1 = vx;
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x+vx,y+vy);
                ctx.lineTo(x+vx*3/4+vx1/4,y+vy*3/4+vy1/4);
                ctx.lineTo(x+vx,y+vy);
                ctx.lineTo(x+vx*3/4-vx1/4,y+vy*3/4-vy1/4);
                ctx.stroke();
                isAbleToDraw =false;
            }
        },
        //
        getSpeed : function(){
            return power;
        },
        getAngle : function (){
            return Math.atan2(vy,vx);
        }
    };
    return arrow;
}

//サイズ調整通知オブジェクト
function  createCircle(){
    //中心点x
    var x;
    //中心点y
    var y;
    //半径
    var radius;
    //色
    var color;
    //描画していいか確認
    var isAbleToDraw;
    //
    var ctx;
    
    var circle={
        //意味なし！
        init : function (cnvContext){
            isAbleToDraw = false;
            ctx =cnvContext;
        },
        setData : function (x0,y0,radius0,color0){
            x = x0;
            y = y0;
            color = color0;
            radius = radius0;
            isAbleToDraw = true;
        },
        //前に、setData関数呼ばれてなかったら、何もしない
        draw : function(){
            if(isAbleToDraw){
                //console.log("color:"+color);
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.arc(x,y,radius,0,Math.PI*2,true);
                ctx.stroke();
                isAbleToDraw = false;
            }
            
        }
    };
    return circle;
}