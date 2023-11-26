
// Cuando se scrollea la ventana, se llama a la funcion que determina:
window.onscroll = function() {
  
    //HEADER
  
    let header = document.querySelector("#header");
    let logo = document.querySelector("#logo");
    // let seccion1 = document.querySelector("#seccion-1");
    
    let personaje1 = document.querySelector("#personaje1");
    let personaje2 = document.querySelector("#personaje2");
    let personaje3 = document.querySelector("#personaje3");
  
    let telaArañaIzq = document.querySelector("#tela-araña-izq");
    let telaArañaDer = document.querySelector("#tela-araña-der");
    //Si se scrolleó se fija el header

    //HEADER - Deja el header sin fijar en su tamaño original
    if (window.scrollY > 0) {
        header.classList.add("fixed");
        logo.classList.add("fixed-img");
// ---------------------------------------SECCION 1-------------------------------------------------------------
  //--cuando se scrollea se le da movimiento a los personajes
        personaje1.style.transform = 'translate(-40px, 20px)';
        personaje2.style.transform = 'translate(0px, 40px)';
        personaje3.style.transform = 'translate(40px, 20px)';
  
        telaArañaIzq.style.transform = 'translate(-120px, 20px)';
        telaArañaDer.style.transform = 'translate(200px, 20px)';
  
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
const parallaxDuende = document.getElementById('personaje4');
let initialTopDuende = -10;

window.addEventListener('scroll', function () {
    let offset = window.scrollY;

    let newPosition = initialTopDuende + offset * 0.3;

    if (newPosition < 220 && offset > 320) {
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
 //---------------------------SECCION 7 --------------------------------------
let blanco = document.getElementById('personaje-1');
let rojo = document.getElementById('personaje-2');
let negro = document.getElementById('personaje-3');
let section7 = document.getElementById('personajes');


blanco.addEventListener('mouseover', function(){
    section7.style.backgroundImage = 'url("./img/seccion7/rosa.png")';
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
    section7.style.backgroundImage = 'url("./img/seccion7/azul.png")';
    section7.style.backgroundRepeat = 'no-repeat';
  
    rojo.style.transform= 'scale(1.1)';
    rojo.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(0.7)';
    blanco.style.filter= 'blur(5px)';
    negro.style.transform = 'scale(0.7)';
    negro.style.filter= 'blur(5px)';

});

negro.addEventListener('mouseover', function(){
    section7.style.backgroundImage = 'url("./img/seccion7/gris.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1.1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(0.7)';
    blanco.style.filter= 'blur(5px)';
    rojo.style.transform = 'scale(0.7)';
    rojo.style.filter= 'blur(5px)';

});

negro.addEventListener('mouseout', function(){
    section7.style.backgroundImage= 'url("./img/seccion7/blanco.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(1)';
    blanco.style.filter= 'blur(0)';
    rojo.style.transform = 'scale(1)';
    rojo.style.filter= 'blur(0)';

});
blanco.addEventListener('mouseout', function(){
    section7.style.backgroundImage= 'url("./img/seccion7/blanco.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(1)';
    blanco.style.filter= 'blur(0)';
    rojo.style.transform = 'scale(1)';
    rojo.style.filter= 'blur(0)';

});
rojo.addEventListener('mouseout', function(){
    section7.style.backgroundImage= 'url("./img/seccion7/blanco.png")';
    section7.style.backgroundRepeat = 'no-repeat';
    negro.style.transform ='scale(1)';
    negro.style.filter= 'blur(0)';
    blanco.style.transform = 'scale(1)';
    blanco.style.filter= 'blur(0)';
    rojo.style.transform = 'scale(1)';
    rojo.style.filter= 'blur(0)';

});