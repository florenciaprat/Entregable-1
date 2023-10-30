'use strict'
// Obtén las flechas del carrusel y las tarjetas
const flechaIzquierda = document.getElementById('flecha_izquierda');
const flechaDerecha = document.getElementById('flecha_derecha');
const tarjetas = document.querySelectorAll('.card-chica-animacion');

// Manejadores de eventos para las flechas
flechaIzquierda.addEventListener('click', () => {
  // Aplica la clase "skew" a todas las tarjetas
  tarjetas.forEach((tarjeta) => {
    tarjeta.classList.add('skew');
  });
});

flechaDerecha.addEventListener('click', () => {
  // Aplica la clase "skew" a todas las tarjetas
  tarjetas.forEach((tarjeta) => {
    tarjeta.classList.add('skew');
  });
});

// Detecta el final de la animación de transformación y elimina la clase "skew"
tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener('transitionend', () => {
    tarjeta.classList.remove('skew');
  });
});

