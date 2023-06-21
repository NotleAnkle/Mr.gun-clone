import { Container, Graphics, Ticker } from "pixi.js";
import { Stair } from "./stair";
import { GameConstant } from "../../gameConstant";

export class Map extends Container{
    constructor(parent, app){
        super();
        this.parent = parent;
        this.app = app;
        this._init();
    }
    _init(){
        this.parent.addChild(this);
        this.sortableChildren = true;
        this.color = this.randomColor();
        this.stairs = [];
        this.stairs = this.genStairs();
        // this.ticker = Ticker.shared;
        // this.ticker.add(this.update, this);
    }
    // update(delta){
    //     console.log(this.stairs.length);
    // }
    genStairs(){
        this.stairs.push(new Stair(this.x, this.y+ 400, this, -1, 0, 2))
        for(let i = 1; i < 8; i++){
            this.genNewStair();
        }
    }
    genNewStair(){
        const previousStair = this.stairs[this.stairs.length - 1];
        const stepNumber = Math.floor(Math.random()*3 + 2);
        const dir = previousStair.direction == 1 ? -1 : 1;
        const y = previousStair.y - stepNumber* GameConstant.Step_Size;
        const z = previousStair.zIndex - 1;
        this.stairs.push(new Stair(this.x, y ,this, dir, z, stepNumber))
    }
    convertToHex(colorValue) {
        const hex = colorValue.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    randomColor() {
        const red = Math.floor(Math.random() * 200);
        const green = Math.floor(Math.random() * 200);
        const blue = Math.floor(Math.random() * 200);

        const color = "#" + this.convertToHex(red) + this.convertToHex(green) + this.convertToHex(blue);
        
        return color;
    }
}