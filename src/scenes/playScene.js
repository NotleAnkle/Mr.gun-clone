import { Container, Graphics } from "pixi.js";
import { Player } from "../objects/player/player";
import { Enemy } from "../objects/enemy/enemy";
import { Map } from "../objects/map/map";
import { GameConstant } from "../gameConstant";
import { ShortFatEnemy } from "../enemy/short_fat_enemy";
import { ShortSkinnyEnemy } from "../enemy/short_skinny_enemy";
import { TallEnemy } from "../enemy/tall_enemy";

export class PlayScene extends Container{
    constructor(app){
        super();
        this.app = app;
        this._init();
    }
    _init(){
        this.map = new Map(this, this.app);
        this.player = new Player(this.map);
        this.enemy = new Enemy(50, 330, 2);
        this.map.addChild(this.enemy)

        this.graphics = new Graphics();
        this.addChild(this.graphics);

        this.interactive = true;
        this.buttonMode = true;
        document.body.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                // this.player.calPath(this.map.nextStair());
                this.player.changeClothes("gunner");
                this.player.changeGun("sawed_off");
            }
        });
        this.on("pointerdown", () => {
            if(!this.player.gun.isShot)this.player.gun.shoot()
        })
    }
    update(dt) {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xFF0000);

        this.checkBullets(dt);
        
    }
    checkBullets(dt){
        let bullets = this.player.gun.bullets;
        let bulletsToRemove = [];
        const steps = this.map.stairs[this.map.currentIndex + 1].stairSprites; // xét các bậc của cầu thang ngay trước mặt
        bullets.forEach(bullet => {
            bullet.update(dt);
            const bound = bullet.getBounds();
            // this.graphics.drawRect(bound.x, bound.y, bound.width, bound.height)
            if(this.checkCollision(bullet, this.enemy.head) ){ // kiểm tra va chạm giữa đạn và địch
                bulletsToRemove.push(bullet)
                this.hitEnemy();
            }
            else {
                steps.forEach(step => { // kiểm tra va trạm giữa đạn và cầu thang
                if(this.checkCollision(step, bullet)){
                    bulletsToRemove.push(bullet)

                }
                })
            }
            if(bound.x < 0 || bound.x > GameConstant.GAME_WIDTH) bulletsToRemove.push(bullet)
        });
        bulletsToRemove.forEach(bullet => { // loại bỏ các viên đạn va chạm đã được đánh dấu
            const index = bullets.indexOf(bullet);
            if (index > -1) {
                bullets.splice(index, 1);
            }
            bullet.destroy();
        });   
    }
    hitEnemy(){
        this.map.removeChild(this.enemy);
        this.enemy.destroy();
        const currenStair = this.map.stairs[this.map.currentIndex+2];
        const size = GameConstant.Step_Size;
        const run = Math.floor(Math.random() * 3) + 1;
        const x = this.player.direction == -1 ? GameConstant.GAME_WIDTH - currenStair.stepNumber*size*2  : currenStair.stepNumber*size*2 - 40;
        const y = currenStair.y - 70;
        const direction = 1;
        switch (run) {
            case 1:
                this.enemy = new ShortFatEnemy();
                break;
            case 2: 
                this.enemy = new ShortSkinnyEnemy();
                break;
            case 3:
                this.enemy = new TallEnemy();
            default:
                break;
        }
        this.enemy = new Enemy(this.player.direction == -1 ? GameConstant.GAME_WIDTH - currenStair.stepNumber*size*2  : currenStair.stepNumber*size*2 - 40, currenStair.y - 70, 1);
        this.map.addChild(this.enemy);
        if(!this.player.isMoving) this.player.calPath(this.map.nextStair());
    }
    hitStair(){
        console.log("hit the wall");
    }
    checkCollision(objA, objB) {
        var a = objA.getBounds();
        var b = objB.getBounds();
    
        var rightmostLeft = a.left < b.left ? b.left : a.left;
        var leftmostRight = a.right > b.right ? b.right : a.right;
    
        if (leftmostRight <= rightmostLeft) {
            return false;
        }
    
        var bottommostTop = a.top < b.top ? b.top : a.top;
        var topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;
    
        return topmostBottom > bottommostTop;
    }
}