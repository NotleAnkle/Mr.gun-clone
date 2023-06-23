import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Bullet } from "./bullet";

export class Gun extends Container{
    constructor(parent, radius, speech, damage){
        super();
        this.parent = parent;
        this.y = 30;
        this.radius = radius;
        this.speech = speech;
        this.damage = damage;
        this._init();
    }
    _init(){
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this.parent.addChild(this);
        // this.sprite = Sprite.from("../../../assets/images/guns/1_1.png")
        this.sprite = Sprite.from(Assets.get('ak'));
        this.addChild(this.sprite);
        this.sprite.anchor.set(0.5);

        this.currentAnlge = 0;
        this.maxAngle = 45;
        // this.radius = 100;
        // this.speech = 0.2;
        this.isIncresing = true;
        this.isShot = false;
        this.bullets = [];
        this.ticker = Ticker.shared;
        this.ticker.add(this.update, this);
    }
    update(delta){
        this.flip();
        this.x = 10*this.parent.direction;
        this.drawAimBar();
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
        this.graphics.clear();
        if(this.parent.isMoving){
            this.isIncresing = false;
        } 
        else this.drawCircularSector(this.currentAnlge);
    }
    drawCircularSector(angle) {
        let startAngle = Math.PI; 
        let endAngle = (Math.PI + angle * (Math.PI / 180));
        
        if(this.parent.direction == 1){
            startAngle = 2*Math.PI - angle * (Math.PI / 180); 
            endAngle = 2*Math.PI;
        }
        
        this.graphics.beginFill(0xFFFFFF, 0.15);
        this.graphics.arc(0, 0, this.radius, startAngle, endAngle, false);
        this.graphics.lineTo(0, 0);
        this.graphics.closePath();
        
        this.graphics.beginFill(0xFFFFFF, 0.6);
        const beta = angle * Math.PI / 180 - Math.PI/2;
        this.graphics.lineStyle(1, 0xFFFFFF);
        const dotX = -this.parent.direction*this.radius* Math.sin(beta);
        const dotY = -this.radius* Math.cos(beta)
        this.graphics.lineTo(dotX, dotY);
        this.graphics.drawCircle(dotX, dotY, 1)
        this.graphics.endFill(); // Thêm dòng này để kết thúc việc vẽ và điền màu
      }
    flip(){
        this.sprite.scale.x = this.parent.direction == 1 ? 1 : -1;
    }
    shoot(){
        this.bullets.push(new Bullet(this));
        this.isShot = true;
    }
}