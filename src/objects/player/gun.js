import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { Bullet } from "./bullet";
import TWEEN from "@tweenjs/tween.js"

export class Gun extends Container{
    constructor(parent, name){
        super();
        this.parent = parent;
        this.y = 30;
        this.name = name;
        this.dt = 0;
        this._init();
    }
    _init(){
        this.sortableChildren = true;
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this.parent.addChild(this);
        this.sprite = Sprite.from(Assets.get(this.name));
        this.addChild(this.sprite);
        this.sprite.anchor.set(0.5);
        this.sprite.zIndex = 2;

        const gunData = Assets.get("gunData")

        this.type = gunData[this.name].type;
        this.radius = gunData[this.name].radius;
        this.speech = gunData[this.name].speech;
        this.damage = gunData[this.name].damage;
        this.bulletRadius = gunData[this.name].bulletRadius;
        this.bulletNumber = gunData[this.name].bulletNumber;
        this.bulletSpeech = gunData[this.name].bulletSpeech
        this.deviation = gunData[this.name].deviation;

        this.currentAnlge = 0;
        this.maxAngle = 45;
        this.isIncresing = true;
        this.isShot = false;
        this.bullets = [];

    }
    update(delta){
        this.flip();
        this.x = 10*this.parent.direction;
        this.drawAimBar();
        this.dt += Ticker.shared.deltaMS;
        this.sprite.angle = this.parent.direction == -1 ? this.currentAnlge : -this.currentAnlge
        TWEEN.update(this.dt * 1000);
    }
    runAngle(){
        if(this.isIncresing){
            
            if(this.currentAnlge  < this.maxAngle){
                this.currentAnlge += this.speech;
            }
            else this.isIncresing = false;
        }
        else {
            if(this.currentAnlge  > 0){
                this.currentAnlge -= this.speech;
                this.currentAnlge = this.currentAnlge < 0 ? 0 : this.currentAnlge
            }
            else this.isIncresing = true;
        }
    }
    drawAimBar(){
        if(!this.isShooting)this.runAngle();
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
        this.graphics.endFill(); // Thêm dòng này để kết thúc việc vẽ và điền màu
      }
    flip(){
        this.sprite.scale.x = this.parent.direction == 1 ? 1 : -1;
    }
    shoot(){
        
        if(this.type == "rapid"){
            new TWEEN.Tween({t: 0}).to({t: 1}, 100*1000).repeat(this.bulletNumber).onRepeat(()=> {
                this.bullets.push(new Bullet(this));  
                this.isShooting = true;
            }).start(this.dt * 1000)
            .onComplete(() => {
                this.isShooting = false;
            });
        }
        else for(let i = 0; i < this.bulletNumber; i++) this.bullets.push(new Bullet(this)); 
        this.isShot = true;
       
    }
}