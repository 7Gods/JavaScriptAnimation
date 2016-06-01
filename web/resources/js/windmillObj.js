/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//連想配列(※クロージャの方法も有るが、現状は連想配列で十分)
//風車オブジェクト
function  createWindmill(){
    //風車の位置
    var px;
    var py;
    //基本角速度
    var baseAngleV;
    //角度
    var angle;
    //角速度
    var angleV;
    //半径
    var radius;
    //加速フラグ
    var flg;
    //ベクトル計算
    var vx1;
    var vy1;
    var vx2;
    var vy2;
    //移動速度
    var vSpeed;
    //移動方向
    var vAngle;
    //画面大きさ
    var width;
    var height;
    //風車描画種類
    var winmilKind;
    //移動状態
    var isMoving;
    //残りの衝突回数
    var lifeCount;
    //
    var drawObj;
    
    //基本角度間隔1回転1440分割=360*4
    var baseAngle=Math.PI/720;
    
    var ctx;
    
    var romanAlphabets;
    //関数
    var windmill ={
        //初期化
        init : function(x,y,kind,size0,width0,height0,cRomanAlphabets,cnvContext){
            px =x;
            py =y;
            width = width0;
            height =height0;
            romanAlphabets =cRomanAlphabets;
            ctx=cnvContext;
            console.log("ctx:"+ctx);
            angle =Math.floor(Math.random() *12)*120;
            //11段階(0~20)
            size = size0;
            //radius:50~250
            radius = (size+5)*10;
            //baseAngleV:1~25
            baseAngleV =5+Math.round(625/Math.pow(5+size,2));
            angleV = baseAngleV;
            winmilKind=kind;
            if(winmilKind === 5){
                drawObj = createRomanNumerals();
                drawObj.init(px,py,radius,romanAlphabets,ctx);
            }
            flg = 0;
            isMoving = false;
            lifeCount = 80;
            //console.log("px:"+px+" py:"+py+" angle:"+angle);
        },
        //動く
        move : function(mx , my){
            //移動状態
            if(lifeCount<1){
            }else if(isMoving){
                var vSpeedX= vSpeed*Math.cos(vAngle);
                var vSpeedY= vSpeed*Math.sin(vAngle);
                px += vSpeedX;
                py += vSpeedY;
                var extraX =Math.abs(width/2-px)+radius-width/2;
                //範囲を超えている場合x軸→衝突
                if(extraX>0){
                    angle+=(angleV*(vSpeedX-extraX)/vSpeedX);
                    angleV = (vSpeedY>0 ? 1 : -1)*
                            (width/2-px<0 ? -1 : 1)*
                            Math.sqrt(
                                (Math.pow(angleV*baseAngle,2)+Math.pow(vSpeedY,2))/
                                (1+Math.pow(radius,2)))/
                            baseAngle;
                    angle+=(angleV*extraX/vSpeedX);
                    vSpeedY=(vSpeedY>0 ? 1 : -1)*Math.abs(angleV)*baseAngle*radius;
                    py +=(px - width/2 <0 ? px-radius : px+radius-width)*Math.tan(vAngle)+vSpeedY;//tanあたりで問題有
                    extraX*=(0.9);
                    px =(width/2-px>0 ? radius+extraX :width-radius-extraX);
                    vSpeedX *=0.9;
                    --lifeCount;
                }
                var extraY =Math.abs(height/2-py)+radius-height/2;
                //範囲を超えている場合y軸→衝突
                if(extraY>0){
                    angle+=(angleV*(vSpeedY-extraY)/vSpeedY);
                    angleV = (vSpeedX>0 ? -1 : 1)*
                            (height/2-py<0 ? -1 : 1)*
                            Math.sqrt(
                                (Math.pow(angleV*baseAngle,2)+Math.pow(vSpeedX,2))/
                                (1+Math.pow(radius,2)))/
                            baseAngle;
                    angle+=(angleV*extraY/vSpeedY);
                    vSpeedX=(vSpeedX>0 ? 1 : -1)*Math.abs(angleV)*baseAngle*radius;
                    px +=(py - height/2 <0 ? py-radius : py+radius-height)/Math.tan(vAngle)+vSpeedX;//下に衝突する際にtanあたりで問題有。後、移動した分の回転がangleに反映されていない。
                    
                    extraY*=(0.9);
                    py =(height/2-py>0 ? radius+extraY :height-radius-extraY);
                    vSpeedY *=0.9;
                    --lifeCount;
                }
                if(extraX>0 || extraY>0){
                    vAngle =Math.atan2((extraY>0 ? -vSpeedY:vSpeedY),
                                    (extraX>0 ? -vSpeedX:vSpeedX));
                    vSpeed =Math.sqrt(Math.pow(vSpeedX,2)+Math.pow(vSpeedY,2));
                    console.log("vAngle:"+vAngle+" vSpeed:"+vSpeed);
                }else{
                    angle+=angleV;
                }
            }else{
                if(Math.pow((px-mx),2)+Math.pow((py-my),2)<=Math.pow(radius,2)){
                    if(flg === 0){//最初の位置設定
                        vx1=mx-px;
                        vy1=my-py;
                        flg = 1;
                        angleV= 0;
                        //console.log("angleV:"+angleV);
                    }else{//次の位置までのベクトル
                        vx2=mx-px;
                        vy2=my-py;
                        angleV=Math.round((
                                Math.atan2(vy2,vx2)-Math.atan2(vy1,vx1)
                                )/baseAngle);
                        vx1 = vx2;
                        vy1 = vy2;
                        //console.log("angleV:"+angleV);
                    }
                }else if(flg === 1){//範囲外(問題:生成中はどうするか...)
                    vx2=mx-px;
                    vy2=my-py;
                    angleV=Math.round((
                            Math.atan2(vy2,vx2)-Math.atan2(vy1,vx1)
                            )/baseAngle);
                    flg--;
                    //console.log("angleV:"+angleV);
                    flg = 0;
                }else if(angleV !==baseAngleV){//慣性力
                    angleV+=(angleV>baseAngleV ? -1:1);
                }
                angle+=angleV;
            }
                
            
            
            //console.log("angle:"+angle+" angleV:"+angleV+" angle+angleV:"+angle+angleV);
        },
        //描画(カリー化しちゃう？)
        draw : function(){
            //drawT(px,py,angle,radius);
            if(!isMoving){
                drawStraw(px,py,height,'#ff7f50','#fff0f5','#ffa07a',ctx);
            }
            if(winmilKind===0){
                draw1(px,py,angle,radius,ctx);
            }else if(winmilKind===1){
                draw2(px,py,angle,radius,ctx);
            }else if(winmilKind===2){
                draw3(px,py,angle,radius,ctx);
            }else if(winmilKind===3){
                draw4(px,py,angle,radius,ctx);
            }else if(winmilKind===4){
                draw5(px,py,angle,radius,ctx);
            }else if(winmilKind===5){
                drawObj.draw();
                draw6(px,py,angle,radius,ctx);
            }else{
                drawT(px,py,angle,radius);
            }
        },
        //x座標取得
        getX : function(){return px+0;},//参照型が返されたら困る。。
        //y座標取得
        getY : function(){return py+0;},//参照型が返されたら困る。。
        //半径取得
        getRadius : function(){return radius+0;},//参照型が返されたら困る。。
        //風車の種類
        getWindmillKind : function(){return winmilKind+0;},//参照型が返されたら困る。。
        //風車の種類数
        getAllWindmillKinds : function(){return 6;},
        //半径設定
        setSize : function(size0){
            size = size0;
            //size =Math.floor(Math.random()*11);
            radius = (size+5)*10;
            if(winmilKind === 5){
                drawObj = createRomanNumerals();
                drawObj.init(px,py,radius,romanAlphabets,ctx);
            }
            baseAngleV =5+Math.round(625/Math.pow(5+size,2));
        },
        moveFromHere : function (vecterSpeed,vecterAngle){
            vSpeed=vecterSpeed;
            vAngle=vecterAngle;
            isMoving = true;
        },
        setWindmillKind : function (kind){
            winmilKind =kind;
            if(winmilKind === 5){
                drawObj = createRomanNumerals();
                drawObj.init(px,py,radius,romanAlphabets,ctx);
            }
        },
        isMoving : function (){
            return isMoving;
        },
        isDead : function (){
            //console.log("isDEAD:"+(lifeCount<1));
            return lifeCount<1;
        }
    };
    return windmill;
};
