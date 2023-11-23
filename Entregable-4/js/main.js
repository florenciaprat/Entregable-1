
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
    
    if (window.scrollY > 0) {
        header.classList.add("fixed");
        logo.classList.add("fixed-img");
// ---------------------------------------SECCION 1-------------------------------------------------------------//
        personaje1.style.transform = 'translate(-40px, 20px)';
        personaje2.style.transform = 'translate(0px, 40px)';
        personaje3.style.transform = 'translate(40px, 20px)';
  
        telaArañaIzq.style.transform = 'translate(-120px, 20px)';
        telaArañaDer.style.transform = 'translate(200px, 20px)';
  
    } 
    //Sino, lo deja grande
    else {
        header.classList.remove("fixed");
        logo.classList.remove("fixed-img");
        personaje1.style.transform = 'translate(0px, 0px)';
        personaje2.style.transform = 'translate(0px, 0px)';
        personaje3.style.transform = 'translate(0px, 0px)';
  
        telaArañaIzq.style.transform = 'translate(0px, 0px)';
        telaArañaDer.style.transform = 'translate(0px, 0px)';
  
    }
}
// ---------------------------SECCION 2// *CONOCE A SPIDEY Y SUS SORPRENDENTES AMIGOS*------------------------------------------------------------//
let posPersonaje4 = document.querySelector("#personaje4");
let posPersonaje4Top = posPersonaje4.getBoundingClientRect().top;
let posPersonaje4Bottom = posPersonaje4.getBoundingClientRect().bottom;
  
//Si la posicion del scroll esta dentro de la posicion del personaje de la sección
if (((window.scrollY >= posPersonaje4Top+200))&&((posPersonaje4Bottom+100)>=window.scrollY)){
  let scrolled = window.scrollY;

  posPersonaje4.style.transform = 'translateY(' + scrolled * 0.2 + 'px)';
}
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
      // card1.classList.add('oculto');
      
      card2.classList.remove('fade-in');
      // card2.classList.add('oculto');
      
      card3.classList.remove('fade-in');
      // card3.classList.add('oculto');
    }
}
    
// Agrega un event listener para la función al hacer scroll
document.addEventListener('scroll', fadeIn);

// Llama a la función inicialmente para aplicar clases si es necesario al cargar la página
fadeIn();
