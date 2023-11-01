class ficha{
    constructor(posX,posY,radio,fill,context){
        this.posX=posX;
        this.posY=posY;
        this.fill=fill;
        this.ctx=context;
        this.radio=radio;
    }
    setFill(fill){
        this.fill=fill;
    }
    setPosition(x,y){
        this.posX=x;
        this.posY=y;
    }
    getPosition(){
        return{
            x : this.getPosX(),
            y : this.getPosY()
        }
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getFill(){
        return this.fill;
    }
    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.posX,this.posY,this.radio, 0, 2 *Math.PI);
        this.ctx.fill();

        if(this.resaltado===true){
            this.ctx.strokeStyle=this.resaltadoEstilo;
            this.ctx.lineWidth =5;
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }
    getRadio(){
        return this.radio;
    }
    isPointInside(x,y){
        let _x=this.posX - x;
        let _y=this.posY - y;
        return Math.sqrt(_x *_x+_y *_y)<this.radio;
    }
}