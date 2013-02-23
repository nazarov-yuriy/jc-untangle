/**
 * Created with JetBrains WebStorm.
 * User: firefish
 * Date: 23/02/13
 * Time: 19:07
 * To change this template use File | Settings | File Templates.
 */

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

    c.style.cursor = "move";

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