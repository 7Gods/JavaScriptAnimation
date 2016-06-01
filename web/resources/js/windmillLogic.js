/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//風車処理ロジック
function createWindmillLogic(){
    //
    var ctx;
    
    //画面大きさ
    var width;
    var height;
    
    //基本角度間隔1回転1440分割=360*4
    var baseAngle=Math.PI/720;

    //マウス位置情報
    var mx;
    var my;
    //マウスボタン情報
    var isMouseDown;
    //マウスボタン押されたカウント
    var countForMouseDown;
    //長押し基準
    var longClickedLength;
    //生成状態(風車が生成中かどうか)
    var isCreating;
    var createdObjNun;
    //オブジェクト内処理かどうか
    var isTheProcInObj;
    //削除番号
    var numOfDeleteObj;
    //風車リスト
    var windmillList;
    //最大風車数
    var maxWindmills;
    //風車変更カウンター
    var countForWinmilKind;
    //操作補助オブジェクト
    var circle;
    var arrow;
    //ローマ数字Obj
    var romanAlphabets;    
    
    //削除関数
    function deleteWindmillObj(numOfDeleteObj0){
        console.log("Delete!! No,"+numOfDeleteObj0);
        newList=new Array();
        for(var a = 0; a<windmillList.length; a++){
            if(a !==numOfDeleteObj0){
                newList.push(windmillList[a]);
            }
        }
        windmillList=newList;
        logNunOfObjList("削除",windmillList);
    }
    
    //Obj数出力関数
    function logNunOfObjList(stateName , ObjList){
        console.log(stateName+":"+ObjList.length);
    }
    
    //タイムラグ処理
    var refresh = function(){
        setTimeout(windmillLogic.rewrite ,30);
    };
    
    var windmillLogic ={
        //初期設定
        init : function(cvsContext){
            ctx = cvsContext;
            console.log("windmillLogic.ctx:"+ctx);
            width =window.innerWidth;
            height =window.innerHeight;
            isMouseDown = false;
            countForMouseDown = 0;
            longClickedLength = 10;
            isCreating = false;
            createdObjNun = -1;
            isTheProcInObj = false;
            maxWindmills = 12;
            countForWinmilKind = 0;
            //配列初期化
            windmillList = new Array();
            circle = createCircle();
            circle.init(ctx);
            arrow = createArrow();
            arrow.init(ctx);
            romanAlphabets = createRomanAlphabets();
            console.log("windmillList.lengh:"+windmillList.length);
        },
        //一定間隔ごとに行う処理
        rewrite:function(){ 
            //Obj状態チェック
            for(var i = 0; i<windmillList.length ;i++){
                if(!(createdObjNun ===i) && windmillList[i].isDead()){
                    deleteWindmillObj(i);
                }
            }
            //マウスが押されている間の処理
            if(isMouseDown){
                //console.log("clicked!");
                //イベントで途中変わってたら困る為
                thisMx=mx;
                thisMy=my;
                //風車生成中
                if(isCreating){
                    ////サイズ調整処理　風車の種類変更
                    var newObjX = windmillList[createdObjNun].getX();
                    var newObjY = windmillList[createdObjNun].getY();
                    radius0 =Math.sqrt(Math.pow(newObjX-thisMx ,2) + 
                                Math.pow(newObjY-thisMy ,2));
                    //重ならない場合のObjがとる半径
                    newObjRadius0=(radius0>250 ? 
                                250 :
                                (radius0<=50 ? 50 : Math.ceil(radius0/10)*10));
                    
                    //他オブジェクトと重ならないか判定。
                    //その場合、重ならない大きさに変更。
                    for(var i = 0; i <windmillList.length ;i++){
                        if(createdObjNun !==i && !windmillList[i].isMoving()){
                        //2円の中心点の距離の2乗
                            var squareOfdistBetw2CenterPoints =
                                    Math.pow(windmillList[i].getX()-
                                        windmillList[createdObjNun].getX(),2)+
                                    Math.pow(windmillList[i].getY()-
                                        windmillList[createdObjNun].getY(),2);
                                if(squareOfdistBetw2CenterPoints <= 
                                Math.pow(windmillList[i].getRadius()
                                    +newObjRadius0),2 ){//接する場合
                                var newObjRadius1 = Math.floor((
                                        Math.sqrt(squareOfdistBetw2CenterPoints) -
                                        windmillList[i].getRadius())/10)*10;
                                if(newObjRadius0>newObjRadius1){
                                    newObjRadius0=newObjRadius1;
                                }
                                console.log("発見！");
                            }
                        }
                    }
                    //横にはみ出る場合
                    if(Math.abs(width/2-newObjX)+newObjRadius0 >width/2){
                        newObjRadius0 =Math.floor((width/2 
                                    - Math.abs(width/2-newObjX))/10)*10;
                    }
                    //縦にはみ出る場合
                    if(Math.abs(height/2-newObjY)+newObjRadius0 >height/2){
                        newObjRadius0 =Math.floor((height/2 
                                    - Math.abs(height/2-newObjY))/10)*10;
                    }
                    //生成できる最低サイズを下回った場合、
                    //又は、
                    //その最小サイズが画面からはみ出る場合
                    if(Math.floor(newObjRadius0/10)<5 ||
                            Math.abs(width/2-newObjX)+50 >width/2 ||
                            Math.abs(height/2-newObjY)+50 >height/2
                            ){
                        //削除処理
                        deleteWindmillObj(createdObjNun);
                        //アニメーション入れたい。。
                        
                        //isMouseDownではない別のフィールド定義したほうがよいかも。。
                        isMouseDown =false;
                        
                    }else{
                        windmillList[createdObjNun].setSize(newObjRadius0/10-5);
                        var radius1 =(radius0>25*10 ? 25*10 :radius0);
                        circle.setData(windmillList[createdObjNun].getX(),
                                    windmillList[createdObjNun].getY(),
                                    (Math.floor(newObjRadius0/10)*10 <radius1 
                                        ? Math.floor(newObjRadius0/10)*10 : radius1),
                                    ((Math.floor(newObjRadius0/10)*10 <radius1 || radius0>25*10 )
                                            ? "red" :"blue")
                                     );

                        if((countForWinmilKind++)%30 ===29){
                            windmillList[createdObjNun].setWindmillKind(
                                    (windmillList[createdObjNun].getWindmillKind()+1)%
                                    windmillList[createdObjNun].getAllWindmillKinds()
                                    );
                        }
                    }
                }else if(isTheProcInObj){
                    if(++countForMouseDown > longClickedLength){
                        //対象オブジェクトを飛ばす処理の初期設定
                        console.log("Obj飛ばす設定中!! ObjNum:"+numOfDeleteObj);
                        arrow.setData(
                                    windmillList[numOfDeleteObj].getX(),
                                    windmillList[numOfDeleteObj].getY(),
                                    mx,
                                    my,
                                    windmillList[numOfDeleteObj].getRadius(),
                                    "#333333");
                    }
                }else{
                    //デリートフラグ
                    var isDelete=false;
                    //削除判定
                    for(var i = windmillList.length-1; -1<i ; i--){
                        //オブジェクトの範囲内か
                        if(Math.pow(windmillList[i].getRadius(),2) >= 
                                Math.pow(windmillList[i].getX()-thisMx ,2) + 
                                Math.pow(windmillList[i].getY()-thisMy ,2)){
                            isTheProcInObj = true;
                            numOfDeleteObj = i;
                            isDelete = true;
                            break;
                        }
                    }
                    //風車生成
                    if(!isDelete && windmillList.length<maxWindmills){
                        newWindmill = createWindmill();
                        console.log("windmillLogic.ctx:"+ctx);
                        newWindmill.init(thisMx,
                                        thisMy,
                                        Math.floor(Math.random()*5),
                                        0,
                                        width,
                                        height,
                                        romanAlphabets,
                                        ctx);
                        //最適化処理
                        if(windmillList.length === 0){
                            //比較対象がない場合
                            console.log("NoObj");
                            windmillList.push(newWindmill);
                            createdObjNun = 0;
                        }else{
                            newList=new Array();
                            isSet = false;
                            for(var i= 0 ; i<windmillList.length ;i++){
                                console.log(windmillList[i].getY()+" "+newWindmill.getY());
                                if(!isSet && windmillList[i].getY() > newWindmill.getY()){
                                    console.log("!!");
                                    newList.push(newWindmill);
                                    createdObjNun = i;
                                    isSet = true;
                                }
                                newList.push(windmillList[i]);
                                if(!isSet && 
                                        i === windmillList.length-1 && 
                                        windmillList[i].getY() <= newWindmill.getY()){
                                    console.log("!!!!");
                                    newList.push(newWindmill);
                                    createdObjNun = i+1;
                                }  
                            }
                            windmillList =newList;
                        }
                        //普通に追加
                        //windmillList.push(newWindmill);
                        logNunOfObjList("生成",windmillList);
                        console.log("createdObjNun:"+createdObjNun);
                        isCreating = true;
                    }
                }        
            }else if(isTheProcInObj){//!isMouseDown 
                if(countForMouseDown<longClickedLength){//短押し
                    ////削除処理
                    deleteWindmillObj(numOfDeleteObj);
                }else{//長押し
                    //対象オブジェクトを飛ばす処理
                    console.log("Obj飛ばした!! ObjNum:"+numOfDeleteObj+" Speed:"+arrow.getSpeed());
                    windmillList[numOfDeleteObj].moveFromHere(arrow.getSpeed(),arrow.getAngle());
                }
                //オブジェクト内処理状態　否!!
                isTheProcInObj = false;
                countForMouseDown = -1;
                
            }else{
                //マウス判定初期化
                isCreating = false;
                createdObjNun = -1;
                countForWinmilKind = 0;
                countForMouseDown = -1;
                isTheProcInObj = false;
            }
            
            
            //消す(塗りつぶす)
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);
            //動かす
            for(var i = 0; i< windmillList.length ; i++){
                windmillList[i].move(mx ,my);
            }
            //描画
            for(var i = 0; i< windmillList.length ; i++){
                windmillList[i].draw();
            }
            circle.draw();
            arrow.draw();
            //タイムラグ
            refresh();
        },
        setMouseDownStatus : function (TorF){
            isMouseDown = TorF;
        },
        setMousePosition : function (x , y){
            mx =x;
            my =y;
        }
        
    };
    return windmillLogic;
    
}