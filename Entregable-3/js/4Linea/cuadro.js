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

const CANT_FIG=3;
let figures = [];
let figures2 = [];
let lastClickedFigure = null;
let isMouseDown = false;

const elon1 = new Image();
elon1.src = 'img/elonpc.png';

const elon2 = new Image();
elon2.src = 'img/funny elon.png';

const elon3 = new Image();
elon3.src = 'img/1elon.png';

const mark1 = new Image();
mark1.src = 'img/markPC.png';

const mark2 = new Image();
mark2.src = 'img/mark fuck u.png';


const mark3 = new Image();
mark3.src = 'img/1mark.png';

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
    addFigure();       
    
});

function clearCanvas(){
    opciones.style.display = 'none';
    botonJugar.style.display = 'none';
    context.fillStyle = 'white';
    context.fillRect(0,0,canvasWidth,canvasHeight);
}

cincoEnLinea.addEventListener('click', () => {
    clearCanvas();
    addFigure()
});

seisEnLinea.addEventListener('click', () => {
    clearCanvas();
    addFigure()
});

function nuevoCanvas(){
    context.fillStyle = '#220335';
    context.fillRect(0,0,canvasWidth,canvasHeight);
    context.font = "24px Roboto";
    context.fillStyle = '#ECF6FF'; // Color del texto
    context.fillText("ELIGE TUS FICHAS", 350, 280);
    context.fillText("MARK", 150, 100);
    context.fillText("ELON", 150, 350);
}
   


    function addFigure(){
            addFicha(300,150);
            nuevoCanvas();
            figures[0].draw(mark1);
            addFicha(450,150);
            figures[1].draw(mark2);
            addFicha(600,150);
            figures[2].draw(mark3);
            addFicha2(300,400);
            figures2[0].draw(elon1);
            addFicha2(450,400);
            figures2[1].draw(elon2);
            addFicha2(600,400);
            figures2[2].draw(elon3);

    }
    
   
    function addFicha(posX,posY){
        let color= 'blue';
        let circulo = new ficha(posX,posY,60,color,context);
        figures.push(circulo);
    }
    function addFicha2(posX,posY){
        let color= 'blue';
        let circulo = new ficha(posX,posY,60,color,context);
        figures2.push(circulo);
    }
  
    
    
   
  
    
    
    
    
    


