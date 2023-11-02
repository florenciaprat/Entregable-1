let canvas=document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG=6;

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;

function addFigure(){
    addCircle();
    drawFigure();
}
function drawFigure(){
    clearCanavas();
    for(let i=0; i<figures.length;i++){
        figures[i].draw(elon1);
    }

}
const elon1 = new Image();
elon1.src = 'img/elonpc.png';

const elon2 = new Image();
elon2.src = 'img/funny elon.png';

const mark1 = new Image();
mark1.src = 'img/markPC.png';

const mark2 = new Image();
mark2.src = 'img/mark fuck u.png';



function addCircle(){
    let posX= Math.round(Math.random()*canvasWidth);
    let posY= Math.round(Math.random()*canvasHeight);
    let color = 'blue';
    let circulo = new circle(posX,posY,50,color,ctx);
    figures.push(circulo);
}
function onMouseDown(e){
    isMouseDown=true;
    if(lastClickedFigure!=null){
        lastClickedFigure.setResaltado(false);
        lastClickedFigure=null;
    }
    let clickFig= findClickedFigure(e.layerX, e.layerY);
    if(clickFig!=null){
        clickFig.setResaltado(true);
        lastClickedFigure=clickFig;
    }
    drawFigure();
}
function onMouseUp(){
    isMouseDown=false;
}
function onMouseMove(e){
    if(isMouseDown && lastClickedFigure!=null){
        lastClickedFigure.setPosition(e.layerX,e.layerY);
        drawFigure();
    }
}
function clearCanavas(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

function addFigures(){
    addFigure();
    if(figures.length<CANT_FIG){
        setTimeout(addFigures,333);
    }
}
setTimeout(()=>{
    addFigures();
},333);

function findClickedFigure(x,y){
    for(let i=0;i<figures.length;i++){
        const element = figures[i];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}


canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('mousemove',onMouseMove, false);
