"use strict";

let array_carruseles = document.querySelectorAll(".carrusel_juegos > div");

function moverCarrusel(accion,c_juegos){
    let movimientoTotal = c_juegos.clientWidth * accion;
    c_juegos.querySelectorAll(".card_juego").forEach( e =>{
        if(accion == -1){
            e.classList.add("enMovimientoI")
        setTimeout(()=>{
            e.classList.remove("enMovimientoI")
        },200)
        }else{
            e.classList.add("enMovimientoD")
        setTimeout(()=>{
            e.classList.remove("enMovimientoD")
        },200)
        }
    })
    c_juegos.scrollBy({left:movimientoTotal,behavior:"smooth"});
    
}


array_carruseles.forEach(contenedor_carrusel => {
    let contenedor_juegos = contenedor_carrusel.childNodes[3];
    let fDer= contenedor_carrusel.childNodes[5].addEventListener('click',()=>{moverCarrusel(1,contenedor_juegos)})
    let fIzq = contenedor_carrusel.childNodes[1].addEventListener('click',()=>{moverCarrusel(-1,contenedor_juegos)})
});