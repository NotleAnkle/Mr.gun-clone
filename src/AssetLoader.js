import { Assets } from "pixi.js";

export class AssetLoader{
    static load(){
        const assets = Assets.load("/assets/images/guns/gun.json");
        return assets;
    }
}