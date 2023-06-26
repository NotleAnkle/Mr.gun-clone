import { Application, Assets, Container, Sprite, Texture } from "pixi.js";
import { AssetLoader } from "./AssetLoader";
import { Enemy } from "./enemy/enemy";
import { Weapon } from "./weapon/weapon";
import { manifest } from "./bundle/manifest";
import { ShortSkinnyEnemy } from "./enemy/short_skinny_enemy";
import { ShortFatEnemy } from "./weapon/short_fat_enemy";
import { TallEnemy } from "./weapon/tall_enemy";

export class Game {
    static init() {
        this.app = new Application({
            width: 720,
            height: 1080,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 0px 0px 0px";

        this.gamePlay = new Container();
        this._loadGameAssets().then((asset)=> {
            console.log(asset['gun']['ak']);
            const test = new ShortSkinnyEnemy(700, 200, -1);
            const weapon = new Weapon(asset['gun']['usp-s']);
            // test.equipWeapon(weapon);
            this.gamePlay.addChild(test);
            
            this.app.stage.addChild(this.gamePlay);
            this.app.ticker.add(this.update, this);
            // console.log(tex);
        });
        // test.then(() => {
        //     console.log(test);
        // })
        // const test1 = new Sprite(test);
        // test1.x = 200;
        // test1.y = 200;
        // console.log(test.ak);
        // this.app.stage.addChild(test1);
        // AssetLoader.load().then(() =>{
        //     this.gamePlay = new Container();
        //     this.enemy = new Enemy(500, 200, 3);
        //     this.weapon = new Weapon(Texture.from("1_1.png"));
        //     this.weapon.x = 100;
        //     this.weapon.y = 100;
        //     this.gamePlay.addChild(this.enemy);
        //     this.gamePlay.addChild(this.weapon);
        //     this.app.stage.addChild(this.gamePlay);
        // })
    }


    static async _loadGameAssets() {
        await Assets.init({ manifest: manifest });
        const bundleIds =  manifest.bundles.map(bundle => bundle.name);
        return await Assets.loadBundle(bundleIds);
    }

    static _initScene() {
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene);
    }

    static update(dt) {
        
    }
}

window.onload = function () {
    Game.init();
}
