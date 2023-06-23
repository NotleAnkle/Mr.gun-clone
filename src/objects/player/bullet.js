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
        // this.ticker = Ticker.shared;
        // this.ticker.add(this.update, this)

        this.direction = this.parent.parent.direction
        this.beta = this.direction == -1 ? this.parent.currentAnlge : Math.PI - this.parent.currentAnlge
        this.speech = 2;
    }
    update(delta){
        if(this.destroyed){
            return;
        }
        this.x += this.speech* this.direction;
        this.y = this.x * Math.tan(this.beta*Math.PI/180)
        this.drawBullet();
    }
    drawBullet(){
        this.graphics.clear();
        this.graphics.beginFill(0xFFFFFF)
        this.graphics.drawCircle(this.x, this.y, 5);
    }

    destroy(){
        super.destroy();
    }
}