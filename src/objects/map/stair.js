import { Container, Graphics, RenderTexture, Sprite } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class Stair extends Container{
    constructor(x, y ,parent, direction, z, stepNumber){
        super();
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.app = parent.app;
        this.direction = direction;
        this.zIndex = z;
        this.stepNumber = stepNumber;
        this._init();
    }
    _init(){
        this.parent.addChild(this)
        this.color = this.parent.color;
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this._initSprite();
        this._initShade();
    }

    _initSprite(){
        this.graphics.lineStyle(1, this.color);
        this.graphics.beginFill(this.color);
        this.drawRect();
    }
    _initShade(){
        this.graphics.beginFill("#000000");
        this.graphics.alpha = (-this.zIndex/10);
        this.drawRect();
    }
    drawRect(){
        const size = GameConstant.Step_Size;
        for (let i = 0; i < this.stepNumber; i++) {
            this.graphics.drawRect(0, + i*size, size * (i + 1) + this.stepNumber*25*2, size);
        }
        this.graphics.drawRect(0, this.stepNumber * size, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT - this.y + this.stepNumber * size);
        const texture = this.app.renderer.generateTexture(this.graphics);
        const sprite = new Sprite(texture);
        if(this.direction == 1){
            this.x + sprite.width/2;
            sprite.anchor.set(1, 0);
            sprite.scale.x = -1;
        }
        this.graphics.clear();
        this.addChild(sprite);
    }
}