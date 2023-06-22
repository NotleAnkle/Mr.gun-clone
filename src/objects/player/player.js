import { Container, Graphics, Sprite, Ticker } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Gun } from "./gun";

export class Player extends Container {
    constructor(parent, app){
        super();
        this.parent = parent;
        this.app = app;
        this._initAbility();
        this._initCharacter();
        this._initGun();
    }
    _initCharacter(){
        this.parent.addChild(this);
        this.graphics = new Graphics();
        this.addChild(this.graphics);
        this.sprite = this.drawBody();
        this.sprite.anchor.set(0.5, 0);
        this.addChild(this.sprite);
        this.ticker = Ticker.shared;
        this.ticker.add(this.update, this);
    }
    _initGun(){
        this.gun = new Gun(this);
    }
    _initAbility(){
        this.x = GameConstant.GAME_WIDTH/2;
        this.y = 450 - 55;
        this.zIndex = 1;
        this.direction = -1;
        this.speech = 2;
        this.needFlip = false;
        this.canJump = true;
        this.isJumping = false;
        this.maxJumpForce = 8;
        this.jumpForce = this.maxJumpForce;
        this.minY = this.y;
        this.gravity = 0.5;
    }
    update(delta){
        this.move();
        this.sprite.scale.x = this.direction === 1 ? 1 : -1
    }

    move() {
        if (this.path2 > 0) {
            if (this.path1 > 0) {
                this.path1 -= this.speech;
            } else {
                if (this.jumpStep > 0) {
                    if (this.canJump && !this.isJumping) {
                        this.isJumping = true;
                        this.canJump = false;
                        this.minY = this.y - 25;
                        this.jumpForce = this.maxJumpForce; // Reset jump force when starting a new jump
                    }
                    this.jump();
                } else {
                    this.path2 -= this.speech;
                }
            }
            this.x += this.direction * this.speech;
        } else if (this.needFlip) {
            this.flip();
            this.needFlip = false;
        }
    }
    
    jump() {
        if (this.isJumping) {
            this.y += this.gravity;
            this.gravity += 0.1;
            if (this.jumpForce > 0) {
                this.jumpForce -= this.gravity;
                this.y -= this.jumpForce;
                if(this.y > this.minY) this.y = this.minY;
            } else {
                this.isJumping = false;
            }
        } else {
            this.jumpStep -= 1;
            this.canJump = true;
            this.gravity = 0.5;
            this.y = this.minY;
        }
    }
    
    calPath(nextStair){
        const width = GameConstant.GAME_WIDTH;
        const size = GameConstant.Step_Size;
        const wallDistance = this.direction === 1 ? this.x : width-this.x;
        this.path2 = nextStair.stepNumber * size;
        this.jumpStep = nextStair.stepNumber;
        this.path1 = width - wallDistance - this.path2*3;
        this.needFlip = true;
    }
    flip(){
        this.direction = this.direction == 1 ? -1 : 1;
    }
    drawBody(){
        this.graphics.lineStyle(1, 0x000000)
        this.graphics.beginFill(0xFFFFFF)
        this.graphics.drawRect(0,0, 25, 25)
        this.graphics.beginFill(0x00AA00)
        this.graphics.drawRect(0,25, 25, 30)
        // this.graphics.drawRect(20,25, 20, 2)
        const texture = this.app.renderer.generateTexture(this.graphics);
        const sprite = new Sprite(texture);
        this.graphics.clear();
        return sprite;
    }
}