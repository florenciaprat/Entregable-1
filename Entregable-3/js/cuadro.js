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
    jugadores.style.display = 'block';
    
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
   // context.drawImage(img, 0, 0, canvas.width, canvas.height);
}
   


    function addFigure(){
            addCircle();
            drawFigure();
        
    }
    function drawFigure(){
        nuevoCanvas();
        for(let i=0; i<figures.length;i++){
            figures[i].draw();
        }
    
    }
   
    function addCircle(){
        let posX= 20;
        let posY= 30;
        let color= 'blue';
        let circulo = new circle(posX,posY,15,color,context);
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
        context.fillStyle = 'white';
        context.fillRect(0,0,canvasWidth,canvasHeight);
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


