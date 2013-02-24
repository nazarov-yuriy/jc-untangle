/**
 * Created with JetBrains WebStorm.
 * User: firefish
 * Date: 23/02/13
 * Time: 18:50
 * To change this template use File | Settings | File Templates.
 */

var val = 0;
function scale(e){
    val += e.wheelDelta;
    var el = document.getElementById("status_text");
    el.innerHTML = val;
}

function menu_click(){
    return false;
}

function new_click(){
    gen();
    return false;
}

function load_click(){
    clear();
    return false;
}

function save_click(){
    return false;
}

function solve_click(){
    solve();
    return false;
}