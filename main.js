/**
 * Created with JetBrains WebStorm.
 * User: firefish
 * Date: 11/02/13
 * Time: 22:35
 * To change this template use File | Settings | File Templates.
 */
var circles = [];
var lines = [];
var already_win = false;

var statei=0;
var statej=0;
function solve(){
    if(statei<max_i){
        if(statej<max_j){
            move_circle(circles[statei][statej], step*(statej+1), step*(statei+1));
            setTimeout(solve, 50);
            statej++;
        }else{
            statej=0;
            statei++;
            setTimeout(solve, 50);
        }
    }else{
        statej=0;
        statei=0;
    }
    already_win = true;
}

function WON(){
    if(!already_win){
        alert("You WIN!!!");
    }
}

function remove_node(node){
    if (node) {
        node.parentNode.removeChild(node);
    }
}

function clear(){
    for(var i = 0; i < circles.length; i++){
        for(var j = 0; j < circles[i].length; j++){
            remove_node(circles[i][j]);
        }
    }
    for(var i = 0; i < lines.length; i++){
        remove_node(lines[i]);
    }
    circles = [];
    lines = [];
    already_win = false;
}

function gen(){
    clear();
    circles = new Array(max_i);
    for(var i = 0; i < max_i; i++){
        circles[i] = new Array(max_j);
        for(var j = 0; j < max_j; j++){
            circles[i][j] = add_circle(step*(j+1), step*(i+1));
        }
    }

    for(var i = 0; i < max_i; i++){
        for(var j = 0; j < max_j-1; j++){
            if(Math.random()>stoh){
                lines.push(add_line(circles[i][j], circles[i][j+1]));
            }
        }
    }

    for(var i = 0; i < max_i-1; i++){
        for(var j = 0; j < max_j; j++){
            if(Math.random()>stoh){
                lines.push(add_line(circles[i][j], circles[i+1][j]));
            }
        }
    }

    //Add circles after lines
    for(var i = 0; i < max_i; i++){
        for(var j = 0; j < max_j; j++){
            mySvg.appendChild(circles[i][j]);
        }
    }

    for(var i = 0; i < max_i; i++){
        for(var j = 0; j < max_j; j++){
            move_circle(
                circles[i][j],
                Math.random()*max_j*step*2,
                Math.random()*max_i*step*2
            );
        }
    }
}

function is_tangle(a, b){
    var ax1 = a.x1.baseVal.value;
    var ay1 = a.y1.baseVal.value;
    var ax2 = a.x2.baseVal.value;
    var ay2 = a.y2.baseVal.value;
    var bx1 = b.x1.baseVal.value;
    var by1 = b.y1.baseVal.value;
    var bx2 = b.x2.baseVal.value;
    var by2 = b.y2.baseVal.value;

    var v1=(bx2-bx1)*(ay1-by1)-(by2-by1)*(ax1-bx1);
    var v2=(bx2-bx1)*(ay2-by1)-(by2-by1)*(ax2-bx1);
    var v3=(ax2-ax1)*(by1-ay1)-(ay2-ay1)*(bx1-ax1);
    var v4=(ax2-ax1)*(by2-ay1)-(ay2-ay1)*(bx2-ax1);
    return ((v1*v2<0) && (v3*v4<0));
}

function mLoad(){
    container = document.getElementById("svgContainer");
    mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    mySvg.setAttribute("version", "1.2");
    mySvg.setAttribute("baseProfile", "tiny");
    container.appendChild(mySvg);

    gen();
}

window.onload = mLoad;
document.onmouseup = function(){
    document.onmousemove = null;
    if(tangles==0){
        WON();
    }

    for(var i = 0; i < max_i; i++){
        for(var j = 0; j < max_j; j++){
            circles[i][j].setAttribute("fill", "#336699");
        }
    }
}