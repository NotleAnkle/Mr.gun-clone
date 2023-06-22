import { Container, Graphics, Sprite, Ticker } from "pixi.js";

export class Gun extends Container{
    constructor(parent){
        super();
        this.parent = parent;
        this.app = parent.app;
        this.y = 30;
        this._init();
        
        this._initAimBar();
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
        this.isIncresing = true;
        this.ticker = Ticker.shared;
        this.ticker.add(this.update, this);
    }
    _initAimBar(){
        this.aimBar = 1;
        this.drawCircularSector(45);

    }
    drawCircularSector(angle) {
        const startAngle = Math.PI; // Góc bắt đầu (rad)
        const endAngle = (Math.PI + angle * (Math.PI / 180)); // Góc kết thúc (rad)
        
        this.graphics.alpha = 0.2;
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.arc(0, 0, this.radius, startAngle, endAngle, false);
        this.graphics.lineTo(0, 0);
        this.graphics.closePath();

      }
    update(delta){
        this.flip();
        this.x = 10*this.parent.direction;
        if(this.isIncresing){
            console.log("đang cộng", this.currentAnlge, this.maxAngle);
            if(this.currentAngle  < this.maxAngle){
                this.currentAngle += 0.1;
            }
            else this.isIncresing = false;
        }
        else {
            if(this.currentAngle  > 0){
                this.currentAngle -= 0.1;
            }
            else this.isIncresing = true;
        }
        // if(this.currentAngle  < this.maxAngle){
        //     this.currentAngle += 0.1;
        // }
        // else this.currentAngle = 0;
        this.graphics.clear();
        this.drawCircularSector(this.currentAngle);
    }
    flip(){
        this.sprite.scale.x = this.parent.direction == 1 ? 1 : -1;
    }
}