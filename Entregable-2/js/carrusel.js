"use strict";

let cardWidth = 290;
let seccionCarrousel = 0;

function slideIzq(btnIzq) {
    if(seccionCarrousel != 0) {
        seccionCarrousel += 4;
    } else {
        seccionCarrousel = -8;
    }
    let slide = seccionCarrousel * cardWidth;
    let aux = btnIzq.nextElementSibling;
    let carrousel = aux.firstElementChild;
    carrousel.style.transform = `translateX(${slide}px)`;
}

function slideDer(btnDer) {
    if(seccionCarrousel >= -4) {
        seccionCarrousel -= 4;
    } else {
        seccionCarrousel = 0;
    }
    let slide = seccionCarrousel * cardWidth;
    let aux = btnDer.previousElementSibling;
    let carrousel = aux.firstElementChild;
    carrousel.style.transform = `translateX(${slide}px)`;
}
document.body.classList.add('no-scroll', 'preloader-active');