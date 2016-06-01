/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//ストロー
var drawStraw = function(x,y,inHeight , color1 ,color2 ,color3 ,cnvContext){
    cnvContext.fillStyle = color1;
    cnvContext.fillRect(x-3,y,7,inHeight-y);
    cnvContext.fillStyle = color2;
    cnvContext.fillRect(x-1,y,1,inHeight-y);
    cnvContext.fillStyle = color3;
    cnvContext.fillRect(x,y,3,inHeight-y);
};

//ローマ字Obj化
function createRomanAlphabets(){
    var numberI =[[0,0],[20,0],[20,2],[15,2],[15,78],[20,78],
                [20,80],[0,80],[0,78],[5,78],[5,2],[0,2]];
    var numberV =[[0,0],[18,0],[18,2],[14,2],[20,40],[26,2],
                [22,2],[22,0],[40,0],[40,2],[36,2],[20,80],
                [4,2],[0,2]];
    var numberX =[[0,0],[18,0],[18,2],[14,2],[20,20],[26,2],
                [22,2],[22,0],[40,0],[40,2],[36,2],[25,40],
                [36,78],[40,78],[40,80],[22,80],[22,78],[26,78],
                [20,60],[14,78],[18,78],[18,80],[0,80],[0,78],
                [4,78],[15,40],[4,2],[0,2]];
    var color = '#000000';
    var loopPointToDraw = function (x ,y , radius , pontList ,cnvContext){
        var v0 =radius/(5*80);
        cnvContext.beginPath();
        cnvContext.fillStyle = color;
        cnvContext.moveTo(x,y);
        for(var i=1;i<pontList.length;i++){
            cnvContext.lineTo(x+pontList[i][0]*v0,y+pontList[i][1]*v0);
        }
        cnvContext.fill();
    };
    var romanAlphabets ={
        drawI :function(x,y,radius,cnvContext){loopPointToDraw(x,y,radius,numberI,cnvContext);},
        drawV :function(x,y,radius,cnvContext){loopPointToDraw(x,y,radius,numberV,cnvContext);},
        drawX :function(x,y,radius,cnvContext){loopPointToDraw(x,y,radius,numberX,cnvContext);}
    };
    return romanAlphabets;
};

//ローマ数字Obj化
function  createRomanNumerals(){
    var radius;
    var v0;
    var romanNumeral =["I","II","III","IV","V","VI",
                        "VII","VIII","IX","X","XI","XII"];
    var pointOfRomanNumeral;
    var ctx;
    var romanAlphabets;
    var romanNumerals = {
        init : function (x0,y0,radius0,cRomanAlphabets,cnvContext){
            radius = radius0;
            v0 =radius0/(5*80);
            pointOfRomanNumeral = new Array();
            var angle =Math.PI/6;
            for(var i=0;i<12;i++){
                var point = new Array();
                point.push(x0+radius*Math.cos(angle*(i-2)));
                point.push(y0+radius*Math.sin(angle*(i-2)));
                pointOfRomanNumeral.push(point);
            }
            romanAlphabets = cRomanAlphabets;
            ctx = cnvContext;
        },
        draw : function (){
            for(var i=0;i<12;i++){
                var str =romanNumeral[i];
                var total = 0;
                var point =pointOfRomanNumeral[i];
                for(var a=0;a<str.length;a++){
                    total-=(str.charAt(a)==="I" ? 10 : 20);
                }
                for(var a=0;a<str.length;a++){
                    if(str.charAt(a)==="I"){
                        romanAlphabets.drawI(point[0]+total*v0,
                                            point[1]-40*v0,radius,ctx);
                    }else if(str.charAt(a)==="V"){
                        romanAlphabets.drawV(point[0]+total*v0,
                                            point[1]-40*v0,radius,ctx);
                    }else{
                        romanAlphabets.drawX(point[0]+total*v0,
                                            point[1]-40*v0,radius,ctx);
                    }
                    total+=(str.charAt(a)==="I" ? 20 : 40);
                }
            }
        }
        
    };
    return romanNumerals;
};

//風車1
var draw1 = function(x,y,angle,radius,cnvContext){
    //console.log("draw!");
    for(var i=0 ;i<4 ;i++){
        angle0=angle+i*360;
        cnvContext.beginPath();
        cnvContext.fillStyle = '#1affff';
        cnvContext.moveTo(x,y);
        cnvContext.lineTo(x+radius*Math.cos(angle0*baseAngle),
                        y+radius*Math.sin(angle0*baseAngle));
        angle0+=180;
        cnvContext.lineTo(x+radius/Math.sqrt(2)*Math.cos(angle0*baseAngle),
                        y+radius/Math.sqrt(2)*Math.sin(angle0*baseAngle));
        angle0+=180;
        cnvContext.lineTo(x+radius/2*Math.cos(angle0*baseAngle),
                        y+radius/2*Math.sin(angle0*baseAngle));
        cnvContext.fill(); 
        cnvContext.moveTo(x,y);
        cnvContext.strokeStyle = '#ffffff';
        cnvContext.lineTo(x+radius/2*Math.cos(angle0*baseAngle),
                        y+radius/2*Math.sin(angle0*baseAngle));
        cnvContext.stroke(); 
    }
};

//風車2
var draw2= function(x,y,angle,radius,cnvContext){
    //console.log("draw!");
    color =["#FF0000","#FFFF00","#00FF00","#1E90FF"];
    for(var a=0 ; a<4 ; a++){
        angle0=angle+(10-Math.pow(5-a,2)*2/5)*12*4;
        var radius0=radius*(Math.pow(5-a,2)*2/5)/10;
        for(var i=0 ; i<3 ; i++){
            angle1=angle0+i*480;
            cnvContext.fillStyle=color[a];
            cnvContext.beginPath();
            cnvContext.moveTo(x,y);
            cnvContext.lineTo(x+radius0*(4+(4-4*a/3))/8*Math.cos(angle1*baseAngle),
                            y+radius0*(4+(4-4*a/3))/8*Math.sin(angle1*baseAngle));
            angle2=angle1+60*4;
            cnvContext.lineTo(x+radius0/2*Math.cos(angle2*baseAngle),
                            y+radius0/2*Math.sin(angle2*baseAngle));
            cnvContext.fill();
        }
    }
};



//風車3
var draw3= function(x,y,angle,radius,cnvContext){
    //console.log("draw!");
    for(var i=0 ; i<5 ; i++){
        angle0=angle+i*288;
        var radius0=2*radius*Math.cos(54*4*baseAngle);
        angleF1=angle0+720+54*4;
        angleT1=angle0+720-18*4;
        angleF2=angle0+720+18*4;
        angleT2=angle0+720-54*4;
        
        cnvContext.beginPath();
        cnvContext.fillStyle = '#ffb6c1';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF1*baseAngle,angleT1*baseAngle,true);
        cnvContext.fill();
        cnvContext.beginPath();
        cnvContext.fillStyle = '#ffb6c1';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF2*baseAngle,angleT2*baseAngle,true); 
        cnvContext.fill();
    }
    for(var i=0 ; i<5 ; i++){
        angle0=angle+i*288;
        radius0=2*radius*Math.cos(54*4*baseAngle);
        angleF1=angle0+720+54*4;
        angleT1=angle0+720+18*4;
        angleF2=angle0+720-18*4;
        angleT2=angle0+720-54*4;
        angleF3=angle0+720+18*4;
        angleT3=angle0+720-18*4;
         
        cnvContext.beginPath();
        cnvContext.moveTo(x,y);
        cnvContext.strokeStyle = '#ffffff';
        cnvContext.lineTo(x+radius/2*Math.cos(angle0*baseAngle),
                        y+radius/2*Math.sin(angle0*baseAngle));
        cnvContext.stroke(); 
        cnvContext.beginPath();
        cnvContext.fillStyle = '#ba55d3';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF1*baseAngle,angleT1*baseAngle,true);
        cnvContext.fill();
        cnvContext.beginPath();
        cnvContext.fillStyle = '#ba55d3';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF2*baseAngle,angleT2*baseAngle,true);
        cnvContext.fill();
        cnvContext.beginPath();
        cnvContext.fillStyle = '#ffa500';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF3*baseAngle,angleT3*baseAngle,true);
        cnvContext.fill();
    }
};

//風車4
var draw4= function(x,y,angle,radius,cnvContext){
    //console.log("draw!");
    cnvContext.beginPath();
    cnvContext.fillStyle = '#4169E1';
    for(var i=0 ; i<5 ; i++){
        angle0=angle+i*288;
        if(i===0){
            cnvContext.moveTo(x+radius*Math.cos(angle0*baseAngle),
                        y+radius*Math.sin(angle0*baseAngle));
        }else{
            cnvContext.lineTo(x+radius*Math.cos(angle0*baseAngle),
                        y+radius*Math.sin(angle0*baseAngle));
        }
    }
    cnvContext.closePath();
    cnvContext.fill();
    
    for(var i=0 ; i<5 ; i++){
        angle0=angle+i*288;
        var radius0=2*radius*Math.cos(54*4*baseAngle);
        angleF1=angle0+720+54*4;
        angleT1=angle0+720-18*4;
        
        cnvContext.beginPath();
        cnvContext.fillStyle = '#6495ed';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF1*baseAngle,angleT1*baseAngle,true);
        cnvContext.fill();
        
        angleF2=angle0+720+18*4;
        angleT2=angle0+720-54*4;
        
        cnvContext.beginPath();
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF2*baseAngle,angleT2*baseAngle,true); 
        cnvContext.fill();
        
        radius0=2*radius*Math.cos(18*4*baseAngle);
        angleF3=angle0+720+18*4;
        angleT3=angle0+720-18*4;
        
        cnvContext.beginPath();
        cnvContext.fillStyle = '#B0C4DE';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF3*baseAngle,angleT3*baseAngle,true); 
        cnvContext.fill();
        
    }
    for(var i=0 ; i<5 ; i++){
        angle0=angle+i*288;
        radius0=2*radius*Math.cos(54*4*baseAngle);
        angleF1=angle0+720+54*4;
        angleT1=angle0+720+18*4;
         
        cnvContext.beginPath();
        cnvContext.moveTo(x,y);
        cnvContext.strokeStyle = '#ffffff';
        cnvContext.lineTo(x+radius*Math.cos(angle0*baseAngle),
                        y+radius*Math.sin(angle0*baseAngle));
        cnvContext.stroke(); 
        cnvContext.beginPath();
        cnvContext.fillStyle = '#6a5acd';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF1*baseAngle,angleT1*baseAngle,true);
        cnvContext.fill();
    }
    cnvContext.beginPath();
    cnvContext.fillStyle = '#afeeee';
    for(var i=0 ; i<5 ; i++){
        angle0=angle+i*288;
        aa=2*radius*Math.cos(54*4*baseAngle);
        radius0=(aa-radius*Math.cos(6*4*baseAngle))/Math.cos(30*4*baseAngle);
        if(i===0){
            cnvContext.moveTo(x+radius0*Math.cos(angle0*baseAngle),
                        y+radius0*Math.sin(angle0*baseAngle));
        }else{
            cnvContext.lineTo(x+radius0*Math.cos(angle0*baseAngle),
                        y+radius0*Math.sin(angle0*baseAngle));
        }
    }
    cnvContext.closePath();
    cnvContext.fill();
    for(var i=0 ; i<5 ; i++){
        angle0=angle+i*288;
        radius0=2*radius*Math.cos(54*4*baseAngle);
        
        angleF3=angle0+720+18*4;
        angleT3=angle0+720-6*4;
        
        cnvContext.beginPath();
        cnvContext.fillStyle = '#f0fff0';
        cnvContext.arc(x+radius*Math.cos(angle0*baseAngle),
                    y+radius*Math.sin(angle0*baseAngle),
                    radius0,angleF3*baseAngle,angleT3*baseAngle,true);
        cnvContext.fill();
    }
};

//風車5
var draw5 = function(x,y,angle,radius,cnvContext){
    //console.log("draw!");
    var radius0;
    cnvContext.beginPath();
    cnvContext.fillStyle = '#ff0000';
    for(var a=0 ; a<6 ;a++){
        for(var i=0 ;i<15 ;i++){
            angle0 =30*a+i;
            radius0 = radius*Math.sin(6*angle0*8*baseAngle);
            cnvContext.lineTo(x+radius0*Math.cos((angle+angle0*8)*baseAngle),
                            y+radius0*Math.sin((angle+angle0*8)*baseAngle));
        }
    }
    for(var a=6-1 ; a>-1 ;a--){
        for(var i=15-1 ;i>-1 ;i--){
            angle0 =30*a+i;
            radius0 = radius*Math.pow(Math.sin(6*angle0*8*baseAngle),3);
            cnvContext.lineTo(x+radius0*Math.cos((angle+angle0*8)*baseAngle),
                            y+radius0*Math.sin((angle+angle0*8)*baseAngle));
        }
    }
    cnvContext.fill();
    cnvContext.beginPath();
    cnvContext.fillStyle = '#ff0000';
    
    for(var a=0 ; a<12 ;a++){
        for(var i=0 ;i<15 ;i++){
            angle0 =15*a+i;
            radius0 = radius*Math.pow(Math.sin(6*angle0*8*baseAngle),5)/(a%2 ===1 ? 3 : 2);
            cnvContext.lineTo(x+radius0*Math.cos((angle+angle0*8)*baseAngle),
                            y+radius0*Math.sin((angle+angle0*8)*baseAngle));
        }
    }
    cnvContext.fill();
};

//風車6(時計)
var draw6 = function(x,y,angle,radius,cnvContext){
    //console.log("draw!");
    //分針
    var Mvx0=radius/10*Math.cos((angle-90*4)*baseAngle);
    var Mvy0=radius/10*Math.sin((angle-90*4)*baseAngle);
    var Mvx1=radius/80*Math.cos(angle*baseAngle);
    var Mvy1=radius/80*Math.sin(angle*baseAngle);
    //時針
    var Hvx0=radius/10*Math.cos((angle/12-90*4)*baseAngle);
    var Hvy0=radius/10*Math.sin((angle/12-90*4)*baseAngle);
    var Hvx1=radius/80*Math.cos(angle/12*baseAngle);
    var Hvy1=radius/80*Math.sin(angle/12*baseAngle);
    
    cnvContext.fillStyle = '#000000';    
    cnvContext.beginPath();
    cnvContext.arc(x,y,radius/30,0,Math.PI*2,true);
    cnvContext.fill();
    
    cnvContext.beginPath();
    cnvContext.moveTo(x+Mvx1,y+Mvy1);
    cnvContext.lineTo(x+Mvx1+Mvx0*8,y+Mvy1+Mvy0*8);
    cnvContext.lineTo(x+Mvx1*4+Mvx0*9,y+Mvy1*4+Mvy0*9);
    cnvContext.lineTo(x+Mvx0*10,y+Mvy0*10);
    cnvContext.lineTo(x+Mvx1*(-4)+Mvx0*9,y+Mvy1*(-4)+Mvy0*9);
    cnvContext.lineTo(x-Mvx1+Mvx0*8,y-Mvy1+Mvy0*8);
    cnvContext.lineTo(x-Mvx1,y-Mvy1);
    cnvContext.fill();
        
    cnvContext.beginPath();
    cnvContext.moveTo(x+Hvx1,y+Hvy1);
    cnvContext.lineTo(x+Hvx1+Hvx0*4,y+Hvy1+Hvy0*4);
    cnvContext.lineTo(x+Hvx1*4+Hvx0*5,y+Hvy1*4+Hvy0*5);
    cnvContext.lineTo(x+Hvx0*6,y+Hvy0*6);
    cnvContext.lineTo(x+Hvx1*(-4)+Hvx0*5,y+Hvy1*(-4)+Hvy0*5);
    cnvContext.lineTo(x-Hvx1+Hvx0*4,y-Hvy1+Hvy0*4);
    cnvContext.lineTo(x-Hvx1,y-Hvy1);
    cnvContext.fill();
};

//円描画
var drawCircle = function(x,y,radius,color,cnvContext){
    //console.log("draw!");
    cnvContext.beginPath();
    cnvContext.strokeStyle = color;
    cnvContext.arc(x,y,radius,0,Math.PI*2,true);
    cnvContext.stroke();
};


//描画テスト(範囲確認用)
var drawT = function(x,y,radius,cnvContext){
    //console.log("draw!");
    cnvContext.beginPath();
    cnvContext.strokeStyle = '#1aff40';
    cnvContext.arc(x,y,radius,0,Math.PI*2,true);
    cnvContext.stroke();
};