'use strict'
// juego.js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const botonJugar = document.getElementById('botonJugarCanvas');
const opciones = document.getElementById('opciones');
const jugadores = document.getElementById('eleccionFichas');
const cuatroEnLinea = document.getElementById('cuatroEnLinea');
const cincoEnLinea = document.getElementById('cincoEnLinea');
const seisEnLinea = document.getElementById('seisEnLinea');


let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG=6;
let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;

const elon1 = new Image();
elon1.src = 'img/elonpc.png';

const elon2 = new Image();
elon2.src = 'img/funny elon.png';

const mark1 = new Image();
mark1.src = 'img/markPC.png';

const mark2 = new Image();
mark2.src = 'img/mark fuck u.png';

const img = new Image();
img.src = "img/pelea.jpg";

botonJugar.addEventListener('click', () => {
    opciones.style.display = 'block';
});



function iniciarJuego(lineas) {
    alert(`Has seleccionado ${lineas} en línea. El juego comienza.`);
    
}

cuatroEnLinea.addEventListener('click', () => {
    clearCanvas();
    addFigures();       
    
});

function clearCanvas(){
    opciones.style.display = 'none';
    botonJugar.style.display = 'none';
    context.fillStyle = 'white';
    context.fillRect(0,0,canvasWidth,canvasHeight);
}

cincoEnLinea.addEventListener('click', () => {
    clearCanvas();
    addFigures()
});

seisEnLinea.addEventListener('click', () => {
    clearCanvas();
    addFigures()
});

function nuevoCanvas(){
    context.fillStyle = '#220335';
    context.fillRect(0,0,canvasWidth,canvasHeight);
}
   


    function addFigure(){
            addFicha();
            drawFigure();
        
    }
    function drawFigure(){
        nuevoCanvas();
        for(let i=0; i<figures.length;i++){
            figures[i].draw(elon1);
        }
    
    }
   
    function addFicha(){
        let posX= Math.round(Math.random()*canvasWidth);
        let posY= Math.round(Math.random()*canvasHeight);
        let color= 'blue';
        let circulo = new ficha(posX,posY,60,color,context);
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
    
    
    function addFigures(){
        addFigure();
        if(figures.length<CANT_FIG){
            setTimeout(addFigures,333);
        }
    }
  
    
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


