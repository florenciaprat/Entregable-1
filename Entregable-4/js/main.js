// Cuando se scrollea la ventana, se llama a la funcion que determina:
window.onscroll = function() {
  
    //HEADER
  
    let header = document.querySelector("#header");
    let logo = document.querySelector("#logo");
    
    let personaje1 = document.querySelector("#personaje1");
    let personaje2 = document.querySelector("#personaje2");
    let personaje3 = document.querySelector("#personaje3");
  
    let telaArañaIzq = document.querySelector("#tela-araña-izq");
    let telaArañaDer = document.querySelector("#tela-araña-der");
    //Si se scrolleó se fija el header

    //Header - Deja el header sin fijar en su tamaño original
    if (window.scrollY > 0) {
        header.classList.add("fixed");
        logo.classList.add("fixed-img");


// ---------------------------------------SECCION 1-------------------------------------------------------------
    //--cuando se scrollea se le da movimiento a los personajes
    // Accede a la propiedad de estilo "transform" del elemento HTML. 
    //La propiedad transform se utiliza para aplicar transformaciones 2D o 3D a un elemento.
  
        personaje1.style.transform = 'translate(-40px, 20px)';
        personaje2.style.transform = 'translate(0px, 40px)';
        personaje3.style.transform = 'translate(40px, 20px)';
  
        telaArañaIzq.style.transform = 'translate(-120px, 20px)';// la tela se mueve hacia la izquierda (-120px) y hacia abajo (20px).
        telaArañaDer.style.transform = 'translate(200px, 20px)';//la tela se mueve hacia la derecha (200px) y hacia abajo (20px).
  
  
    } 
    //Sino, lo deja grande
    else {
        // Deja el header sin fijar en su tamaño original
        header.classList.remove("fixed");
        logo.classList.remove("fixed-img");

        //Deja los elementos de la seccion 1 con sus estilos originales 
        personaje1.style.transform = 'translate(0px, 0px)';
        personaje2.style.transform = 'translate(0px, 0px)';
        personaje3.style.transform = 'translate(0px, 0px)';
  
        telaArañaIzq.style.transform = 'translate(0px, 0px)';
        telaArañaDer.style.transform = 'translate(0px, 0px)';
  
    }
}
// ---------------------------SECCION 2// *CONOCE A SPIDEY Y SUS SORPRENDENTES AMIGOS*------------------------------------------------------------//
//ajustar su posición vertical en respuesta al desplazamiento de la página.
const parallaxDuende = document.getElementById('personaje4');
let initialTopDuende = -10; //Este valor representa la posición inicial superior del elemento 

window.addEventListener('scroll', function () { //Cuando el usuario hace scroll
    let offset = window.scrollY;

    // Esta posición se basa en la posición inicial (initialTopDuende) y se
    //ajusta por la cantidad de desplazamiento (offset) multiplicada por 0.3
    // y el elemento se mueve a una velocidad,de la velocidad de desplazamiento.
    let newPosition = initialTopDuende + offset * 0.3;

    //controla si esta dentro de un rango de desplazamiento
    if (newPosition < 220 && offset > 320) {
        //La nueva posición calculada se asigna a esta propiedad, moviendo así el elemento verticalmente.
        parallaxDuende.style.top = newPosition + 'px';
        
    }
});
// --------------------------------------SECCION 3------------------------------------------------------------//
// Agrega o quita la clase fade-in dependiendo si la sección está visible dentro de la ventana o no
function fadeIn() {
  
    let seccion3 = document.getElementById('seccion-3');
    
    //getBoundingClientRect() Otorga un objeto DOMRect con la informacion sobre 
    //la posicion y el tamaño del elemento con relacion a la ventana del navegador
    let cards = seccion3.getBoundingClientRect();
    
    //Mitad de la altura de la ventana visible
    let offset = window.innerHeight * 0.5;
  
    let card1 = document.querySelector("#card-1");
    let card2 = document.querySelector("#card-2");
    let card3 = document.querySelector("#card-3");
  
    //Si el borde superior de la seccion 3 es menor a la mitad de la altura de la ventana 
    // y el borde superior es mayor, agrega la clase
    if (cards.top < offset && cards.bottom > offset) {
        card1.classList.add('fade-in');
        card2.classList.add('fade-in');
        card3.classList.add('fade-in');
  
    } 
  
    // Cuando ya no se cumple (ya no es visible la sección), se le quita la clase
    else {
      card1.classList.remove('fade-in');
      
      
      card2.classList.remove('fade-in');

      card3.classList.remove('fade-in');
  
    }
}
    
// Agrega un event listener para la función al hacer scroll
document.addEventListener('scroll', fadeIn);

// Llama a la función inicialmente para aplicar clases si es necesario al cargar la página
fadeIn();

//-----------------------------------SECCION 4------------------------------------------------------------------>

//Cuando el usuario hace scroll en la página
document.addEventListener("scroll", () => {
    //almacena la posición actual de desplazamiento vertical de la ventana
    let posScroll = window.scrollY;

    let s3Cards = document.querySelector('.groupfour');
    
    //aplicando una transformación de traducción vertical (translateY) con un 
    //valor que depende de la posición de desplazamiento (posScroll). Multiplicar posScroll 
    //por -0.2 significa que la tarjeta se moverá hacia arriba 
    s3Cards.style.transform = "translateY("+posScroll*-0.2+"px)";
})
//-----------------------------------SECCION 5------------------------------------------------------------------>
//Selecciona los elementos HTML
const section5 = document.querySelector(".seccion5tamanio");
const pantera = document.querySelector("#phanter");
const elastic = document.querySelector("#elastic");
const hulk = document.querySelector("#hulk");
const hojitas = document.querySelector("#part2");
const bosque = document.querySelector("#part3");
const sky = document.querySelector("#sky");

//Evento de escucha para el movimiento del ratón en la sección con clase "seccion5tamanio"
section5.addEventListener("mousemove", (e) => {
// Obtiene las coordenadas X e Y del mouse en la pantalla
  let posX = e.clientX;
  let posY = e.clientY;

   // Aplica transformaciones a los elementos seleccionados según la posición del mouse
   
   //translateX(${posX  * ...): Desplazamiento horizontal proporcional a la posición horizontal del mouse.
    //translateY(${posY * ...): Desplazamiento vertical proporcional a la posición vertical del mouse.

  pantera.style.transform = `translateX(${posX * 0.05}px) translateY(${ posY * 0.05}px`;//La velocidad de la movimiento se reduce multiplicando las coordenadas por 0.05.
  elastic.style.transform = `translateX(${20 + posX * 0.02}px) translateY(${ posY * 0.02 }px`;//desplazamiento adicional de 20 pixels en el eje X.
  hulk.style.transform = `translateX(${-posX * 0.02}px) translateY(${-20 + posY * 0.02 }px`; //aca esta invertida en el eje x para que se mueva para el otro lado 
  hojitas.style.transform = `scale(${1 + posY * 0.00002}) `; //cuando el mouse lo moves hacia arriba o hacia abajo, la escala del elemento se ajusta.
  bosque.style.transform = `translateX(${-posX * 0.005}px) `;
  sky.style.transform = `translateX(${ posX * 0.005}px) `;
});

 //------------------------------------------SECCION 7 -------------------------------------------------------------
 //Asignación de elementos del DOM a variables
let blanco = document.getElementById('personaje-1');
let rojo = document.getElementById('personaje-2');
let negro = document.getElementById('personaje-3');
let section7 = document.getElementById('personajes');


blanco.addEventListener('mouseover', function(){
    section7.style.backgroundImage = 'url("./img/Seccion7/rosa.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    section7.style.backgroundSize = '100% 880px';
    blanco.style.transform = 'scale(1.05)';
    blanco.style.filter= 'blur(0)';
    rojo.style.transform = 'scale(0.7)';
    rojo.style.filter= 'blur(5px)';
    negro.style.transform = 'scale(0.7)';
    negro.style.filter= 'blur(5px)';
});

rojo.addEventListener('mouseover', function(){
    section7.style.backgroundImage = 'url("./img/Seccion7/azul.png")';
    section7.style.backgroundRepeat = 'no-repeat';
  
    rojo.style.transform= 'scale(1.1)';
    rojo.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(0.7)';
    blanco.style.filter= 'blur(5px)';
    negro.style.transform = 'scale(0.7)';
    negro.style.filter= 'blur(5px)';

});

negro.addEventListener('mouseover', function(){
    section7.style.backgroundImage = 'url("./img/Seccion7/gris.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1.1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(0.7)';
    blanco.style.filter= 'blur(5px)';
    rojo.style.transform = 'scale(0.7)';
    rojo.style.filter= 'blur(5px)';

});

negro.addEventListener('mouseout', function(){
    section7.style.backgroundImage= 'url("./img/Seccion7/blanco.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(1)';
    blanco.style.filter= 'blur(0)';
    rojo.style.transform = 'scale(1)';
    rojo.style.filter= 'blur(0)';

});
blanco.addEventListener('mouseout', function(){
    section7.style.backgroundImage= 'url("./img/Seccion7/blanco.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(1)';
    blanco.style.filter= 'blur(0)';
    rojo.style.transform = 'scale(1)';
    rojo.style.filter= 'blur(0)';

});
rojo.addEventListener('mouseout', function(){
    section7.style.backgroundImage= 'url("./img/Seccion7/blanco.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(1)';
    blanco.style.filter= 'blur(0)';
    rojo.style.transform = 'scale(1)';
    rojo.style.filter= 'blur(0)';

});




document.addEventListener('DOMContentLoaded', function () {
  var btnMenu = document.getElementById('btn-menu');
  var linea1 = document.getElementById('linea-1');
  var linea2 = document.getElementById('linea-2');
  var linea3 = document.getElementById('linea-3');

  btnMenu.addEventListener('click', function () {
    linea1.classList.toggle('animacion-linea-1');
    linea2.classList.toggle('animacion-linea-2');
    linea3.classList.toggle('animacion-linea-3');
    
  });
});

  
  
