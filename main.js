/**
 * Created with JetBrains WebStorm.
 * User: firefish
 * Date: 11/02/13
 * Time: 22:35
 * To change this template use File | Settings | File Templates.
 */
var mySvg;
var container;
var circles = [];
var lines = [];
var rad = 15;
var tangles = 100501;
var step = 70;
var max_i = 5;
var max_j = 5;
var stoh = 0.05;

function add_circle(x, y){
    var start = [];
    var end   = [];
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", rad);
    c.setAttribute("fill", "#336699");
    c.setAttribute("stroke", "black");
    c.setAttribute("stroke-width", "2");

    c.start = start;
    c.end   = end;

    c.onmousedown = function(){
        c.setAttribute("fill", "red");

        for(var i = 0; i< c.start.length; i++){
            c.start[i].t.setAttribute("fill", "red");
        }

        for(var i = 0; i< c.end.length; i++){
            c.end[i].f.setAttribute("fill", "red");
        }
        document.onmousemove = function(event){
            move_circle(c, event.clientX - container.offsetLeft, event.clientY - container.offsetTop);
        }
    }

    //c.onmouseup = function(){document.onmousemove = null}

    return c;
}

function move_circle(c, x, y){
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);

    for(var i = 0; i< c.start.length; i++){
        c.start[i].setAttribute("x1", x);
        c.start[i].setAttribute("y1", y);
    }

    for(var i = 0; i< c.end.length; i++){
        c.end[i].setAttribute("x2", x);
        c.end[i].setAttribute("y2", y);
    }

    tangles = 0;
    for(var i = 0; i<lines.length; i++){
        var tangle = false;
        for(var j = 0; j<lines.length; j++){
            if(i!=j)
                tangle |= is_tangle(lines[i], lines[j]);
        }
        if(tangle){
            lines[i].setAttribute("stroke", "red");
            tangles++;
        }else{
            lines[i].setAttribute("stroke", "black");
        }
    }
}

function add_line(f, t){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "line");
    c.setAttribute("x1", f.cx.baseVal.value);
    c.setAttribute("y1", f.cy.baseVal.value);
    c.setAttribute("x2", t.cx.baseVal.value);
    c.setAttribute("y2", t.cy.baseVal.value);
    c.setAttribute("stroke", "black");
    c.setAttribute("stroke-width", "2");

    f.start.push(c);
    t.end.push(c);

    c.f = f;
    c.t = t;

    mySvg.appendChild(c);
    return c;
}

function gen(){
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
        document.getElementById("congr").innerText = "You WON!!!";
    }

    for(var i = 0; i < max_i; i++){
        for(var j = 0; j < max_j; j++){
            circles[i][j].setAttribute("fill", "#336699");
        }
    }
}