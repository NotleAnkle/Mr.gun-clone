import { Container, Graphics, Sprite, Ticker } from "pixi.js";

export class Gun extends Container{
    constructor(parent){
        super();
        this.parent = parent;
        this.app = parent.app;
        this.y = 30;
        this._init();
    }
    _init(){
        this.parent.addChild(this);
        this.sprite = Sprite.from("../../../assets/images/guns/1_1.png")
        this.addChild(this.sprite);
        this.sprite.anchor.set(0.5);
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        // this.drawCircularSector(0,0,100,45)
        this.currentAnlge = 0;
        this.maxAngle = 45;
        this.radius = 100;
        this.speech = 0.2;
        this.isIncresing = true;
        this.ticker = Ticker.shared;
        this.ticker.add(this.update, this);
    }
    update(delta){
        this.flip();
        this.x = 10*this.parent.direction;
        if(!this.parent.isMoving){
            this.drawAimBar();
        }
        else this.graphics.clear();
        this.sprite.angle = this.parent.direction == -1 ? this.currentAnlge : -this.currentAnlge
    }
    drawAimBar(){
        if(this.isIncresing){
            
            if(this.currentAnlge  < this.maxAngle){
                this.currentAnlge += this.speech;
            }
            else this.isIncresing = false;
        }
        else {
            if(this.currentAnlge  > 0){
                this.currentAnlge -= this.speech;
            }
            else this.isIncresing = true;
        }
        // if(this.currentAngle  < this.maxAngle){
        //     this.currentAngle += 0.1;
        // }
        // else this.currentAngle = 0;
        this.graphics.clear();
        this.drawCircularSector(this.currentAnlge);
    }
    drawCircularSector(angle) {
        let startAngle = Math.PI; 
        let endAngle = (Math.PI + angle * (Math.PI / 180));
        if(this.parent.direction == 1){
            startAngle = 2*Math.PI - angle * (Math.PI / 180); 
            endAngle = 2*Math.PI;
        }
        
        this.graphics.alpha = 0.2;
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.arc(0, 0, this.radius, startAngle, endAngle, false);
        this.graphics.lineTo(0, 0);
        this.graphics.closePath();

      }
    flip(){
        this.sprite.scale.x = this.parent.direction == 1 ? 1 : -1;
    }
}