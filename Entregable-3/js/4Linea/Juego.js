let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let colorGanador = 'rgb(229, 226, 49)';
let bordeGanador = 10;
let arreglosDeEspacios = []
//arreglo de columnas
let matriz = []
//arreglos de fichas de los jugadores
let fichasJugador1 = [];
let fichasJugador2 = [];
//arreglo de Zona de caida de ficha
let CaidaZonaficha = []

let cantEnLinea = 4;
let numFilas = 6;
let numColumn = 7;
let TAMESPACIO = 60;
let TAMANIOFICHA = 30;
let alturaTablero = (numFilas*TAMESPACIO);
let largoTablero = (numColumn*TAMESPACIO);
let canvasWidth=canvas.width;
let canvasHeight=canvas.height;
let cantidadFichas = numFilas * numColumn;
//jugadores
let jugador1 = new Jugador("",1);
let jugador2 = new Jugador("",2);

let turno = null;
//imagenes de las fichas
let imgFichaJugador1 = "./img/1elon.png";
let imgFichaJugador2 = "./img/1mark.png";
let imgEspacio = "./img/espacio.png";
let imgFicha1 = "./img/1elon.png";
let imgFicha2 = "./img/elonpc.png";
let imgFicha3 = "./img/funnyelon.png";
let imgFicha4 = "./img/1mark.png";
let imgFicha5 = "./img/markfucku.png";
let imgFicha6 = "./img/markPC.png";
let dropimg = "./img/flecha-abajo.png";
let fondo = "./img/fondoring3.jpg";
//fondo
let imgFondo= new Image();
imgFondo.src = fondo;



function cargarTablero(){
    cantidadFichas = numFilas * numColumn;
    posicionTableroX = (canvasWidth/2)-(((numColumn)*TAMESPACIO)/2);
    posicionTableroY = (canvasHeight/2)-(((TAMESPACIO)*(numFilas))/2);
    widhtBoard = (numColumn * (TAMESPACIO));
    heightBoard = (numFilas * (TAMESPACIO));

    fichasJugadas = 0;
    let posicionEspacioX = posicionTableroX;
    let posicionEspacioY = posicionTableroY;   
    //recorro todas las filas

    for(let i=0;i<numFilas;i++){
        //a cada i le cargo un arreglo que es una fila
        let fila=[];
        //recorro las Columnas
        for(let j=0;j<numColumn;j++){
            if(j==0){
                posicionEspacioX = posicionTableroX;
            }
            let rect = addEspacio(posicionEspacioX,posicionEspacioY);
            posicionEspacioX+=TAMESPACIO;
            fila.push(rect); 
        }
        matriz.push(fila)
        posicionEspacioY+=TAMESPACIO;
    }
   
    //cargo los CaidaZonaficha
    for(let i = 0; i < numColumn; i++){
        let x = posicionTableroX + (i*TAMESPACIO);
        let y = posicionTableroY - (TAMESPACIO);
        let zona = new EspacioTablero(x,y,TAMESPACIO,ctx);
        CaidaZonaficha.push(zona);
    }


    
    //cargar fichas de jugadores en el tablero
    //la Y regresiva es para que las fichas se pongan una abajo de la otra con difencia de 15 
    //(por esto:posYregresiva=posYregresiva+15) y la x es fija para cada jugador.

    let posYregresiva = 500;
    for(let i = 0; i < cantidadFichas/2; i++){
        //se cargan fichas jugador 1
        let posx = 50;
        let posy = posYregresiva;
        let fichaJugador1 = new Ficha(posx, posy, TAMANIOFICHA, ctx, jugador1);
        fichasJugador1.push(fichaJugador1);
        //se cargan fichas jugador 2
        posx = 853;
        posy = posYregresiva;
        let fichaJugador2 = new Ficha(posx, posy, TAMANIOFICHA, ctx, jugador2);
        fichasJugador2.push(fichaJugador2);
        posYregresiva=posYregresiva-9;
    }
  

}
function addEspacio(locationX,locationY){
    let rect = new EspacioTablero(locationX,locationY,TAMESPACIO,ctx);
    arreglosDeEspacios.push(rect);
    return rect;
}
function drawFigures(){
    clearCanvas();
    ctx.drawImage(imgFondo,0,0,canvasWidth,canvasHeight)
    //ctx.fillRect(0, 0,canvasWidth,canvasHeight);
    for(let i = 0; i<CaidaZonaficha.length; i++){
        CaidaZonaficha[i].drawImg(dropimg)
    }
    for(let i = 0;i<fichasJugador1.length;i++){
        fichasJugador1[i].drawImg(imgFichaJugador1);
        fichasJugador2[i].drawImg(imgFichaJugador2);
    }
    for(let i = 0; i<arreglosDeEspacios.length; i++){
        arreglosDeEspacios[i].drawImg(imgEspacio);
    }


    ponerNombres();
}
function ponerNombres(){
    let nombre1=document.querySelector("#titulo1");
    let nombre2=document.querySelector("#titulo2");

        nombre1.innerHTML = jugador1.getNombre();
        nombre2.innerHTML = jugador2.getNombre();


}

let cronometro = 0;
//Cronometro
function iniciarTiempo(boolean){
    let element = document.getElementById("tiempo");
    let cantminutos = 3;
    let tiempo = cantminutos * 60;
    if(boolean){
        cronometro = setInterval(()=>{
            let minutos = Math.floor(tiempo / 60);
            let segundos = tiempo % 60;
            segundos = segundos < 10 ? '0' + segundos : segundos;
            element.innerHTML = `${minutos}:${segundos}`;
            if(minutos == 0 && segundos == 0){
                clearInterval();
                finalizarJuegoEmpate();

            }
            else{
                tiempo--;
            }
        }, 1000);
    }
    else{
        clearInterval(cronometro);
    }
}

//reiniciar Juego
document.querySelector('#restartGame').addEventListener('click',()=>{
    reiniciarJuego();
})

//Empate en el juego
let ganador = document.querySelector("#ganador");
function finalizarJuegoEmpate(){
    iniciarTiempo(false);
    titulo.style.display ="none";
    ganador.style.display = "block";
    ganador.innerHTML = `EMPATE, SE ACABO EL TIEMPO`;
    for(let i = 0; i < fichasJugador1.length; i++){
        fichasJugador1[i].ponerEnTablero(false);
        fichasJugador2[i].ponerEnTablero(false);
    }
}

//Ganador juego 
function finalizarJuego(){
    iniciarTiempo(false);
    titulo.style.display ="none";
    ganador.style.display = "block";
    ganador.innerHTML = `GANÓ `+ turno.getNombre();
    for(let i = 0; i < fichasJugador1.length; i++){
        fichasJugador1[i].ponerEnTablero(false);
        fichasJugador2[i].ponerEnTablero(false);
    }
}

//reiniciar juego
function reiniciarJuego(){
    arreglosDeEspacios = [];
    matriz = [];
    fichasJugador1 = [];
    fichasJugador2 = [];
    CaidaZonaficha= [];
    turno = null;
    cambiarTurno()
    clearCanvas();
    cargarTablero();
    drawFigures();
    iniciarTiempo(false);
    iniciarTiempo(true);
}

//clear canvas
function clearCanvas(){
    ctx.clearRect(0, 0,canvasWidth,canvasHeight);
}


//Jugar juego
document.querySelector("#play-game").addEventListener('click',()=>{
    document.querySelector('.canvas').style.display="flex";
    document.querySelector('.canvas-form').style.display="none";
    reiniciarJuego();
})
//Fichas
function seleccionarFichaJugador2(ficha){
    ficha4.style.scale = "1.0"
    ficha5.style.scale = "1.0"
    ficha6.style.scale = "1.0"
    ficha.style.scale = "1.2"
}
function seleccionarFichaJugador1(ficha){
    ficha1.style.scale = "1.0"
    ficha2.style.scale = "1.0"
    ficha3.style.scale = "1.0"
    ficha.style.scale = "1.2"
}
ficha1 = document.querySelector("#ficha1");
ficha2 = document.querySelector("#ficha2");
ficha3 = document.querySelector("#ficha3");
ficha4 = document.querySelector("#ficha4");
ficha5 = document.querySelector("#ficha5");
ficha6 = document.querySelector("#ficha6");

ficha1.addEventListener('click',()=>{
    for(let i = 0; i < fichasJugador1.length;i++){
        fichasJugador1[i].setImagen(imgFicha1)
        imgFichaJugador1 = imgFicha1;
    }
    seleccionarFichaJugador1(ficha1);
})
ficha2.addEventListener('click',()=>{
    for(let i = 0; i < fichasJugador1.length;i++){
        fichasJugador1[i].setImagen(imgFicha2)
        imgFichaJugador1 = imgFicha2;
    }
    seleccionarFichaJugador1(ficha2);
})
ficha3.addEventListener('click',()=>{
    for(let i = 0; i < fichasJugador1.length;i++){
        fichasJugador1[i].setImagen(imgFicha3)
        imgFichaJugador1 = imgFicha3;
    }
    seleccionarFichaJugador1(ficha3);
})
ficha4.addEventListener('click',()=>{
    for(let i = 0; i < fichasJugador2.length;i++){
        fichasJugador2[i].setImagen(imgFicha4)
        imgFichaJugador2 = imgFicha4;
    }
    seleccionarFichaJugador2(ficha4);
})
ficha5.addEventListener('click',()=>{
    for(let i = 0; i < fichasJugador2.length;i++){
        fichasJugador2[i].setImagen(imgFicha5)
        imgFichaJugador2 = imgFicha5;
    }
    seleccionarFichaJugador2(ficha5);
})
ficha6.addEventListener('click',()=>{
    for(let i = 0; i < fichasJugador2.length;i++){
        fichasJugador2[i].setImagen(imgFicha6)
        imgFichaJugador2 = imgFicha6;
    }
    seleccionarFichaJugador2(ficha6);
})

// Establezco el tamaño del tablero dependiendo el tamaño indicado
document.querySelector("#linea4").addEventListener('click',()=>{//4 en linea
    cantEnLinea = 4;
    numColumn = 7;
    numFilas = 6;
    TAMESPACIO = 60;
    TAMANIOFICHA = 30;
    reiniciarJuego();
})
document.querySelector('#linea5').addEventListener('click',()=>{//5 en linea
    cantEnLinea = 5;
    numColumn = 8;
    numFilas = 7;
    TAMESPACIO = 50;
    TAMANIOFICHA = 25;
    reiniciarJuego();
})
document.querySelector('#linea6').addEventListener('click',()=>{//6 en linea
    cantEnLinea = 6;
    numColumn = 9;
    numFilas = 8;
    TAMESPACIO = 45;
    TAMANIOFICHA = 22;
    reiniciarJuego();
})
document.querySelector('#linea7').addEventListener('click',()=>{//7 en linea
    cantEnLinea = 7;
    numColumn = 10;
    numFilas = 9;
    TAMESPACIO = 40;
    TAMANIOFICHA = 20;
    reiniciarJuego();
})

cargarTablero();
drawFigures();

let fichaActual=null;
canvas.addEventListener("mousedown", (event) => {
    //layerX y layerY son posiciones del evento del mouse
    let mouseX = event.layerX;
    let mouseY = event.layerY;
    if(turno.getId()==1){
        for(let i = fichasJugador1.length-1; i>=0; i--){
            let ficha = fichasJugador1[i];
            if(ficha.isClicked(mouseX,mouseY)){
                fichaActual = ficha;
                break;
            }
        }
    }
    if(turno.getId() == 2){
        for(let i = fichasJugador2.length-1; i>=0; i--){
            let ficha = fichasJugador2[i];
            if(ficha.isClicked(mouseX,mouseY)){
                fichaActual = ficha;
                break;
            }
        }
    }
})

canvas.addEventListener("mousemove", (event) => {
    if(fichaActual!=null){
        fichaActual.move(event.layerX,event.layerY);
        drawFigures();
    }
})
canvas.addEventListener("mouseup", () =>{
    if(fichaActual!=null){
        let x = fichaActual.getX();
        let y = fichaActual.getY();
        //recorro todos los CaidaZonaFichas
        for(let i =0;i<CaidaZonaficha.length;i++){
            //si la ficha esta arriba de alguno
            if(CaidaZonaficha[i].detectarFicha(x,y)){
                insertarFicha(i);
                cambiarTurno();
                fichaActual = null;
            }
        }
        if(fichaActual != null){
            fichaActual.posInicial();
            fichaActual = null;
            drawFigures()
        }
    }
})
canvas.addEventListener("mouseleave", ()=>{
    if(fichaActual!=null){
        fichaActual.posInicial();
        fichaActual = null;
        drawFigures();
    }
})

//Turnos
titulo = document.querySelector("#turno");
function cambiarTurno(){
    if(turno == null){
        ganador.style.display = "none";
        titulo.innerHTML = `TURNO DE `+jugador1.getNombre();
        turno = jugador1;
        titulo.style.display="block";
        titulo.style.color="#FF7A00";
    }
    else if(turno.getId() == 1){
        turno = jugador2;
        titulo.innerHTML = `TURNO DE `+jugador2.getNombre();
        titulo.style.color="#FF7A00";
    }
    else{
        titulo.innerHTML = `TURNO DE `+jugador1.getNombre();
        turno = jugador1;
        titulo.style.color="#FF7A00";
    }
}
/*
let contadorJugador1 = 0;
let contadorJugador11 = 0;
const contadorJugador2 = 0;
const ultimaPosXJugador1=0;
const ultimaPosYJugador1=0;
const ultimaPosXJugador2=0;
const ultimaPosYJugador2=0; 
*/

//Insertar Ficha
function insertarFicha(columna){
   
    for(let i = matriz.length-1; i >= 0; i--){
        let fila = matriz[i];
        let m =matriz[i][columna];
           
        
      
        if(!fila[columna].estaOcupada()){
            fila[columna].setFicha(fichaActual);
            let x = (fila[columna].getX() +TAMESPACIO/1.8);
            let y = fila[columna].getY() + TAMESPACIO/1.7;
            fichaActual.move(x,y);
            fichaActual.ponerEnTablero(false);
            mover(x,y);
            drawFigures();
            ControlarGanador(fila,columna,m);
            break;
        }
        else if(i == 0){
            fichaActual.posInicial();
            drawFigures();
            ControlarGanador(fila,columna,m);
            cambiarTurno()

        }
    }
}


function ControlarGanador(fila,columna,m) {

   //console.log("la X: "+m.getX() +" la Y: "+m.getY()+" juagador: "+m.getJugador());
    let jugadorActual = fila[columna].getFicha().getJugador();
    let contador = 1; // Contador inicia en 1 por la ficha actual

    //Se verifica la presencia de fichas del mismo jugador en una fila hacia la izquierda desde una columna dada. Incrementando un contador cada vez que encuentra una ficha del jugador actual y deteniéndose si encuentra 
    //una ficha de otro jugador o si no hay más columnas que explorar en esa dirección.
    // Verificar hacia la izquierda
    for (let j = columna - 1; j >= 0; j--) {
        if (fila[j].getFicha() && fila[j].getFicha().getJugador() === jugadorActual) {
            contador++;
        } else {
            break; // Dejar de contar si no hay una ficha del mismo jugador
        }
    }


    //Serifica la presencia de fichas del mismo jugador en una fila hacia la derecha desde una columna dada. Se incrementa un contador cada vez que se encuentra una ficha del jugador actual. El bucle se detiene si se encuentra 
    //una ficha de otro jugador o si no hay más columnas que explorar en esa dirección.
    // Verificar hacia la derecha
    for (let j = columna + 1; j < numColumn; j++) {
        if (fila[j].getFicha() && fila[j].getFicha().getJugador() === jugadorActual) {
            contador++;
        } else {
            break; // Dejar de contar si no hay una ficha del mismo jugador
        }
    }

    if (contador >= cantEnLinea) {
        finalizarJuego();
        return;
    }

   // VERIFICAR VERTICALES
   
   /*const posicionX = m.getX();
   const posicionY = m.getY();
   if (jugadorActual === 1) {
    if(ultimaPosXJugador1===0&&ultimaPosYJugador1===0){
        ultimaPosXJugador1=posicionX;
        ultimaPosYJugador1=posicionY;
    }
       if (posicionX === ultimaPosXJugador1 && Math.abs(posicionY - ultimaPosYJugador1) <= 60) {
        
        contadorJugador1++;
        
        return contadorJugador1;  
       } else {
           contadorJugador1 = 0;
           return 0;
       }

       ultimaPosXJugador1 = posicionX;
       ultimaPosYJugador1 = posicionY;
    
   } /*else if (jugadorActual === 2) {
       if (posicionX === ultimaPosXJugador2 && Math.abs(posicionY - ultimaPosYJugador2) <= 60) {
           contadorJugador2++;
       } else {
           contadorJugador2 = 0;
       }

       ultimaPosXJugador2 = posicionX;
       ultimaPosYJugador2 = posicionY;

       if (contadorJugador2 >= 4) {
           console.log(`El jugador 2 ha ganado.`);
       }
   }
*/





    
//La verificación de la diagonal se realiza comprobando si las celdas se recorren en incrementos tanto en las filas como en las columnas dentro de un bucle anidado. Si ambas coordenadas (fila y columna) se incrementan simultáneamente, 
//entonces se está recorriendo una diagonal descendente.
    // Verificar diagonales descendentes
    for (let i = 0; i <= numFilas - cantEnLinea; i++) {
        for (let j = 0; j <= numColumn - cantEnLinea; j++) {
            let contador = 0;
            for (let k = 0; k < cantEnLinea; k++) {
                if (matriz[i + k][j + k].getFicha() && matriz[i + k][j + k].getFicha().getJugador() === jugadorActual) {
                    contador++;
                }
            }
            if (contador === cantEnLinea) {
                finalizarJuego();
                return;
            }
        }
    }

//Se recorren las celdas en incrementos tanto en las filas como en las columnas dentro de un bucle anidado para verificar si se encuentra una diagonal ascendente 
//con la longitud de secuencia requerida. Si se encuentra, se finaliza el juego.
    // Verificar diagonales ascendentes
    for (let i = cantEnLinea - 1; i < numFilas; i++) {
        for (let j = 0; j <= numColumn - cantEnLinea; j++) {
            let contador = 0;
            for (let k = 0; k < cantEnLinea; k++) {
                if (matriz[i - k][j + k].getFicha() && matriz[i - k][j + k].getFicha().getJugador() === jugadorActual) {
                    contador++;
                }
            }
            if (contador === cantEnLinea) {
                finalizarJuego();
                return;
            }
        }
    }
    
}





//Se utiliza un bucle de intervalo para actualizar continuamente la posición de la ficha en incrementos hasta que alcanza la posición deseada (x, y). Luego, 
//detiene la animación y actualiza la representación gráfica de las figuras en la pantalla.
function mover(x,y){
let pos=0;
let fichaAnimada = new Ficha();
    intervalo = setInterval(() => {
        pos += 1;
        fichaAnimada.move(x,fichaAnimada.getY()+pos);
        drawFigures()
        if(fichaAnimada.getY()>y){
            fichaAnimada.move(x+1,y);
            clearInterval(intervalo);
            drawFigures()
        }
    },10)


}

 
