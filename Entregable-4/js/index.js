document.addEventListener('DOMContentLoaded', function () {

  window.addEventListener('scroll', function () {});});
//selecciono cada clase y lo almaceno
let game_1 = document.querySelector(".contenido-0");
let game_2 = document.querySelector(".contenido-1");
let game_3 = document.querySelector(".contenido-2");
let game_4 = document.querySelector(".contenido-3");


window.addEventListener("scroll", () => {  //listener cuando me desplazo por la pagina
let seccion = document.querySelector(".datos-juego");
const seccionY = seccion.getBoundingClientRect().y; //pos vertical 
let value = seccionY; //almaceno la pos vertical
console.log(value) //imprimo
if(value >= -100 && value <= 600){ //rangos de pos vertical y muestra o remueve las classlist
  
    game_1.classList.add("mostrar-imagen");
    game_2.classList.remove("mostrar-imagen");
} 

else if(value >= -700 && value <= -101){
    game_1.classList.remove("mostrar-imagen")
    game_2.classList.add("mostrar-imagen")
    game_3.classList.remove("mostrar-imagen")
}

else if(value >= -1200 && value <= -701){
  game_2.classList.remove("mostrar-imagen")
  game_3.classList.add("mostrar-imagen")
  game_4.classList.remove("mostrar-imagen")
}

else if(value >= -2000 && value <= -1201){
  game_3.classList.remove("mostrar-imagen")
  game_4.classList.add("mostrar-imagen")
}
else if(value < -2001){
  game_4.classList.remove("mostrar-imagen")
}
});

