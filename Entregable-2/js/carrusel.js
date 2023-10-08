
"use strict";

let allBtnIzqs = document.querySelectorAll(".btn-left-cards");
let allBtnDer = document.querySelectorAll(".btn-right-cards");


allBtnIzqs.forEach(boton => {
    boton.classList.add('hidden');
});




allBtnDer.forEach(boton => {
    boton.addEventListener("click", function() {
        let primerCincoCards =  boton.parentElement.firstElementChild;
        let segundoCincoCards =  boton.parentElement.firstElementChild.nextElementSibling;
    

      
          // Agrega las clases para la transformación al segundo elemento
          primerCincoCards.classList.remove('transformacion-reset');
          primerCincoCards.classList.remove('transformacion-izquierda');
          segundoCincoCards.classList.remove('transformacion-izquierda');
            primerCincoCards.classList.add('transformacion-derecha');
            segundoCincoCards.classList.add('transformacion-derecha');
            
            //Quita la clase de transformación y agrega la clase de reset después de 1 segundo al segundo elemento
            setTimeout(function() {

            segundoCincoCards.classList.remove('transformacion-izquierda');
            segundoCincoCards.classList.remove('transformacion-derecha');
            segundoCincoCards.classList.remove('transformacion-reset');
            segundoCincoCards.classList.add('transformacion-reset-dos');
            
            boton.previousElementSibling.classList.remove('hidden');
            boton.classList.add('hidden');
            }, 500);


    });


});


allBtnIzqs.forEach(boton => {
    boton.addEventListener("click", function() {
        let primerCincoCards =  boton.parentElement.firstElementChild;
        let segundoCincoCards =  boton.parentElement.firstElementChild.nextElementSibling;
    

       //Agrega las clases para la transformación al segundo elemento
       primerCincoCards.classList.remove('transformacion-derecha');
    segundoCincoCards.classList.remove('transformacion-derecha');
    segundoCincoCards.classList.remove('transformacion-reset-dos');
    primerCincoCards.classList.add('transformacion-izquierda'); 
    segundoCincoCards.classList.add('transformacion-izquierda');
  
    setTimeout(function() {
       // Quita la clase de transformación y agrega la clase de reset después de 1 segundo al segundo elemento
       segundoCincoCards.classList.remove('transformacion-izquierda');
      segundoCincoCards.classList.remove('transformacion-derecha');
      primerCincoCards.classList.add('transformacion-reset');
      
      boton.nextElementSibling.classList.remove('hidden');
     boton.classList.add('hidden');
    }, 500);



    });


});