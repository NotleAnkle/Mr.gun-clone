import { Container, Graphics, Ticker } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class Bullet extends Container{
    constructor(parent){
        super();
        this.parent = parent;
        this._init()
    }
    _init(){
        this.parent.addChild(this);
        this.graphics = new Graphics();
        this.addChild(this.graphics);

        this.direction = this.parent.parent.direction // hướng bắn
        this.beta = this.direction == -1 ? this.parent.currentAnlge : Math.PI - this.parent.currentAnlge // góc lệch của đạn
        this.speech = this.parent.bulletSpeech; // tốc độ bay
        this.deviation = this.parent.deviation; // độ lệch của đạn 
        const randomValue = Math.random() * (2 * this.deviation) - this.deviation;
        this.type = this.parent.type; // kiểu bắn

        this.x +=  this.direction*this.parent.sprite.width/4*Math.cos(this.beta*Math.PI/180);
        this.y +=  this.direction*this.parent.sprite.width/4*Math.sin(this.beta*Math.PI/180);

        switch (this.type) {
            case "rapid":
                this.x -= randomValue*Math.cos(this.beta*Math.PI/180) ;
                this.y -= randomValue * Math.sin(this.beta*Math.PI/180) ; 
                this.beta += randomValue / 5;
                break;
            case "shotgun":
                this.beta += randomValue;
                break;
            default:
                break;
        }
    }
    update(delta){
        if(this.destroyed){
            return;
        }
        const realSpeech = this.speech* this.direction;
        this.x += realSpeech*Math.cos(this.beta*Math.PI/180);
        this.y += realSpeech * Math.sin(this.beta*Math.PI/180)
        this.drawBullet();

    }
    drawBullet(){
        this.graphics.clear();
        this.graphics.beginFill(0xFFFFFF)
        this.graphics.drawCircle(this.x, this.y, this.parent.bulletRadius);
    }

    destroy(){
        super.destroy();
    }
}