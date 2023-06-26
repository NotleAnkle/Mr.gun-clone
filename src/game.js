import { Application, Assets, Container, Graphics, RenderTexture, Sprite } from "pixi.js";
import { manifest} from "./bundle/manifest";
import { GameConstant } from "./gameConstant";
import { PlayScene } from "./scenes/playScene";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 300px";

        this._loadGameAssets().then((asset)=> {

            this._initScene();
            this.app.ticker.add(this.update, this);
        });
    }

    static async _loadGameAssets() {
        await Assets.init({ manifest: manifest });
        const bundleIds =  manifest.bundles.map(bundle => bundle.name);
        return await Assets.loadBundle(bundleIds);
    }
    static update(dt){
        this.playScene.update(dt);
    }

    static _initScene() {
        this.playScene = new PlayScene(this.app);
        this.app.stage.addChild(this.playScene);
    }
}
window.onload = function () {
    Game.init();
}

// window.addEventListener("resize", (event) => {
//     Game.resize(window.innerWidth, window.innerHeight)
// });
