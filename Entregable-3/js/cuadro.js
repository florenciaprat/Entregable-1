'use strict'
// juego.js
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const botonJugar = document.getElementById('botonJugarCanvas');
const opciones = document.getElementById('opciones');
const cuatroEnLinea = document.getElementById('cuatroEnLinea');
const cincoEnLinea = document.getElementById('cincoEnLinea');
const seisEnLinea = document.getElementById('seisEnLinea');

botonJugar.addEventListener('click', () => {
    // Mostrar opciones cuando se presiona "Jugar"
    opciones.style.display = 'block';
});

function iniciarJuego(lineas) {
    // Implementa tu lógica de juego con el número de "lineas" seleccionadas.
    // Dibuja un rectángulo en el canvas u otras interacciones de juego aquí.
    alert(`Has seleccionado ${lineas} en línea. El juego comienza.`);
    // Aquí puedes agregar la lógica del juego, como dibujar un rectángulo en el canvas.
}

cuatroEnLinea.addEventListener('click', () => {
    iniciarJuego(4);
});

cincoEnLinea.addEventListener('click', () => {
    iniciarJuego(5);
});

seisEnLinea.addEventListener('click', () => {
    iniciarJuego(6);
});
