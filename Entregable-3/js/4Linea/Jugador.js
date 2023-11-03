class Jugador{
    constructor(nombre,id){
        this.id = id;
        this.nombre = "JUGADOR "+id;
    }
    getId(){
        return this.id
    }
  
    getNombre(){
        return this.nombre;
    }
}