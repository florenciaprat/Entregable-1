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

//variables
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


//poner nombres en el canvas juego
function ponerNombres(){
    let nombre1=document.querySelector("#titulo1");
    let nombre2=document.querySelector("#titulo2");

        nombre1.innerHTML = jugador1.getNombre();
        nombre2.innerHTML = jugador2.getNombre();


}

//esta función se encarga de configurar el tablero de juego, crear los espacios en el tablero, definir 
//las áreas donde las fichas pueden caer y cargar las fichas de los jugadores en posiciones iniciales en el tablero.
function cargarTablero(){
    //calcula la cantidad total de fichas multipichando el num de filas por num de columnas
    cantidadFichas = numFilas * numColumn;
    //Calcula las coordenadas posicionTableroX y posicionTableroY 
    //para el tablero. Estas coordenadas representan la posición del canvas 
    // donde se colocará el tablero, de modo que quede centrado en el canvas.
    posicionTableroX = (canvasWidth/2)-(((numColumn)*TAMESPACIO)/2);
    posicionTableroY = (canvasHeight/2)-(((TAMESPACIO)*(numFilas))/2);
    //Calcula el ancho (widhtBoard) y la altura (heightBoard) del tablero multiplicando el número
    // de columnas y filas por el tamaño de cada espacio (TAMESPACIO).
    widhtBoard = (numColumn * (TAMESPACIO));
    heightBoard = (numFilas * (TAMESPACIO));
    //Se inicializa la variable fichasJugadas en 0. Esta variable se utiliza para realizar 
    //un seguimiento de la cantidad de fichas jugadas en el juego.
    fichasJugadas = 0;
    let posicionEspacioX = posicionTableroX;
    let posicionEspacioY = posicionTableroY;   
    //recorro todas las filas

    //Se inicia un bucle que recorre todas las filas del tablero (numFilas). Dentro de este bucle, se 
    //crea un arreglo llamado fila que representará una fila en el tablero.
    for(let i=0;i<numFilas;i++){
        //a cada i le cargo un arreglo que es una fila
        let fila=[];
        //recorro las Columnas(numColumn). En este bucle, se crea un rectángulo (rect) en la posición 
        //(posicionEspacioX, posicionEspacioY) utilizando una función llamada addEspacio. Luego, se incrementa 
        //posicionEspacioX para posicionar el siguiente espacio en la misma fila, y se agrega el rect al arreglo fila.
        for(let j=0;j<numColumn;j++){
            if(j==0){
                posicionEspacioX = posicionTableroX;
            }
            let rect = addEspacio(posicionEspacioX,posicionEspacioY);
            posicionEspacioX+=TAMESPACIO;
            fila.push(rect); 
        }
        //Una vez que se ha creado una fila completa de espacios, se agrega la fila al arreglo matriz, que
        //representará el tablero en su conjunto.
        matriz.push(fila)
        //Después de agregar la fila, se incrementa posicionEspacioY para pasar a la siguiente fila en el tablero.
        posicionEspacioY+=TAMESPACIO;
    }
   
    //cargo los CaidaZonaficha,se crea una serie de "CaidaZonaficha" en la parte superior del
    //tablero para permitir que las fichas caigan en las columnas.
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

//Crea y almacena espacios en el tablero. Cada vez que se llama a 
//addEspacio, se crea un nuevo espacio en las coordenadas especificadas, se almacena en un arreglo y se 
//devuelve el espacio recién creado.
function addEspacio(locationX,locationY){
    let rect = new EspacioTablero(locationX,locationY,TAMESPACIO,ctx);
    arreglosDeEspacios.push(rect);
    return rect;
}

//se encarga de dibujar elementos gráficos como imágenes de fondo, espacios en 
//el tablero, fichas de jugadores. 
function drawFigures(){
    //Limpiar el contenido previamente dibujado para que no se superpongan elementos gráficos
    clearCanvas();
    //dibuja la imagen de fondo
    ctx.drawImage(imgFondo,0,0,canvasWidth,canvasHeight)
    for(let i = 0; i<CaidaZonaficha.length; i++){
        CaidaZonaficha[i].drawImg(dropimg)
    }
    // para dibujar la imagen de la ficha del jugador correspondiente.
    for(let i = 0;i<fichasJugador1.length;i++){
        fichasJugador1[i].drawImg(imgFichaJugador1);
        fichasJugador2[i].drawImg(imgFichaJugador2);
    }
    // para dibujar una imagen asociada a cada espacio
    for(let i = 0; i<arreglosDeEspacios.length; i++){
        arreglosDeEspacios[i].drawImg(imgEspacio);
    }

    //dibujar nombres en el canvas
    ponerNombres();
}


let cronometro = 0;
//Cronometro
function iniciarTiempo(boolean){
    let element = document.getElementById("tiempo");
    //la duración total del cronómetro en 3 minutos.
    let cantminutos = 3;
    // Calcula el tiempo total en segundos
    let tiempo = cantminutos * 60;
    //si se debe iniciar o detener el cronómetro.
    if(boolean){
        //Si es true, se inicia el cronómetro utilizando setInterval
        cronometro = setInterval(()=>{
            let minutos = Math.floor(tiempo / 60);
            let segundos = tiempo % 60;
            segundos = segundos < 10 ? '0' + segundos : segundos;
            //se actualiza el contenido del elemento (que es donde se muestra el tiempo)
            element.innerHTML = `${minutos}:${segundos}`;
            //Se verifica si el tiempo ha llegado a cero (0 minutos y 0 segundos). Si es así, se 
            //detiene el cronómetro y se llama a finalizar en empate
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

//variables para acceder a las fichas 
ficha1 = document.querySelector("#ficha1");
ficha2 = document.querySelector("#ficha2");
ficha3 = document.querySelector("#ficha3");
ficha4 = document.querySelector("#ficha4");
ficha5 = document.querySelector("#ficha5");
ficha6 = document.querySelector("#ficha6");

//Cuando un jugador hace clic en una ficha específica, se cambia la imagen de todas las fichas
// de ese jugador y se almacena la imagen seleccionada en una variable.Estos
// eventos de clic permiten a los jugadores elegir una ficha antes de iniciar el juego.
ficha1.addEventListener('click',()=>{
    //Para cada ficha, se utiliza el método setImagen para establecer su imagen en imgFicha
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

//Esta variable se utiliza para hacer un seguimiento de la ficha
let fichaActual=null;
// dispara cuando se hace clic con el botón del mouse. La función de flecha (arrow function) 
//proporcionada se ejecutará cuando ocurra el evento de clic.
canvas.addEventListener("mousedown", (event) => {
    //layerX y layerY son posiciones del evento del mouse
    let mouseX = event.layerX;
    let mouseY = event.layerY;
    if(turno.getId()==1){
        // Se inicia un bucle que recorre todas las fichas del jugador 1, desde la última ficha hasta
        // la primera.Para verificar las fichas en orden inverso para seleccionar la ficha 
        //superior en caso de superposición.
        for(let i = fichasJugador1.length-1; i>=0; i--){
            let ficha = fichasJugador1[i];
            // Se verifica si la ficha actual se ha clicado.Llamando al método 
            //isClicked de la ficha, pasando las coordenadas del clic del mouse (mouseX y mouseY) como argumentos.
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

//Se activará cuando el usuario mueva el mouse
canvas.addEventListener("mousemove", (event) => {
    if(fichaActual!=null){
        fichaActual.move(event.layerX,event.layerY);
        drawFigures();
    }
})

//cuando el usuario suelte el botón del mouse después de un clic
canvas.addEventListener("mouseup", () =>{
    if(fichaActual!=null){
        // Se obtienen las coordenadas actuales X e Y de la ficha seleccionada,Estas coordenadas 
        //representan la posición actual de la ficha
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
        //Si la ficha actual no se encuentra sobre ninguna "CaidaZonaFicha", se restablece su posición inicial
        if(fichaActual != null){
            fichaActual.posInicial();
            fichaActual = null;
            drawFigures()
        }
    }
})

//si el mouse sale del canvas
canvas.addEventListener("mouseleave", ()=>{
    if(fichaActual!=null){
        fichaActual.posInicial();
        fichaActual = null;
        drawFigures();
    }
})

//Se utiliza un bucle de intervalo para actualizar continuamente la posición de la ficha en 
//incrementos hasta que alcanza la posición deseada (x, y). Luego, 
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

//Inserta una ficha en una columna específica del tablero
function insertarFicha(columna){
   // Se inicia un bucle que recorre las filas de la matriz desde la parte inferior hacia arriba
   
   //para encontrar la posición adecuada en la columna en la que se debe insertar la ficha
    for(let i = matriz.length-1; i >= 0; i--){
        let fila = matriz[i];
        let m =matriz[i][columna];
        
        
        
      //Se verifica si la celda en la posición actual de la columna no está ocupada por ninguna ficha
        if(!fila[columna].estaOcupada()){
            fila[columna].setFicha(fichaActual);
            let x = (fila[columna].getX() +TAMESPACIO/1.8);
            let y = fila[columna].getY() + TAMESPACIO/1.7;
            //e llama al método "move" de la ficha actual para moverla a las coordenadas calculadas.
            fichaActual.move(x,y);
            
            // indica que la ficha ya no está en movimiento y está en el tablero.
            fichaActual.ponerEnTablero(false);
            mover(x,y);
            drawFigures();//actualiza la vista
            ControlarGanador(fila,columna,m); //verifica si la inserción de la ficha ha llevado a una victoria.
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

    if(esGanadorEnColumna(jugadorActual)){
        console.log("gano vertical");
    }

    
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

function esGanadorEnColumna(jugador) {
     

    for (let columna = 0; columna < matriz[0].length; columna++) {
        let contador = 0;
        for (let fila = 0; fila < matriz.length; fila++) {
            if (matriz[fila][columna].getFicha() && matriz[fila][columna].getFicha().getJugador() === jugador) {
                contador++;
                if (contador === cantEnLinea) {
                    finalizarJuego();
                    return;
                }
            } else {
                contador = 0;
            }
        }
    }
}





 
