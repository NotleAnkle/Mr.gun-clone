import { Assets, Container, Graphics, Sprite, Ticker } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Gun } from "./gun";

export class Player extends Container {
    constructor(parent){
        super();
        this.parent = parent;
        this._initAbility();
        this._initCharacter();
        this._initGun();
    }
    _initCharacter(){
        this.parent.addChild(this);
        this.sortableChildren = true;
        this.sprite = Sprite.from(Assets.get('camouflage'))
        this.sprite.anchor.set(0.5, 0);
        this.addChild(this.sprite);
        this.ticker = Ticker.shared;
        this.ticker.add(this.update, this);
    }
    _initGun(){
        this.gun = new Gun(this, 'aug');
        this.gun.zIndex = 1;
    }
    _initAbility(){
        this.x = GameConstant.GAME_WIDTH/2;
        this.y = 450 - 55;
        this.zIndex = 1;
        this.direction = -1;
        this.speech = 2;
        this.isMoving = false;
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
        this.gun.update();
        this.sprite.scale.x = this.direction === 1 ? 1 : -1
    }

    move() {
        // Còn đoạn đường thứ 2 chưa đi thì tiếp tục di chuyển
        if (this.path2 > 0) {
            this.isMoving = true; // biến này hiện tại chưa sử dụng sau này để thêm đk cho player không thể bắn khi đang di chuyển
            if (this.path1 > 0) {
                // Đi đoạn đường thứ 1 trước
                this.path1 -= this.speech;
            } else {
                //Sau khi đi xong thì bắt đầu nhảy
                if (this.jumpStep > 0) {
                    if (this.canJump && !this.isJumping) {
                        this.isJumping = true; // biến thể hiện đang nhảy
                        this.canJump = false; // biến thể hiện rằng nhân vật sẵn sàng đê nhảy
                        this.minY = this.y - 25;
                        this.jumpForce = this.maxJumpForce; // Reset jump force when starting a new jump
                    }
                    this.jump();
                } else {
                    this.path2 -= this.speech;
                }
            }
            this.x += this.direction * this.speech;
        } else{
            this.isMoving = false;
            if (this.needFlip) {
            this.flip();
            this.needFlip = false;
            }
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
    changeClothes(name){
        this.removeChild(this.sprite);
        this.sprite = Sprite.from(Assets.get(name));
        this.sprite.zIndex = 0;
        this.sprite.anchor.set(0.5, 0);
        this.addChild(this.sprite);
    }
    changeGun(name){
        this.removeChild(this.gun);
        this.gun = new Gun(this, name);
    }
}