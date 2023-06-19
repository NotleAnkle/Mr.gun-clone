import { Application, Assets, Sprite } from "pixi.js";

export class Game {
    static init() {
        this.app = new Application({
            width: 500,
            height: 700,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 0px 0px 0px";
        this._loadGameAssets((textures) => {
            this.textures = textures;

            this.app.ticker.add(this.update, this);
        });  
    }


    static async _loadGameAssets() {
        await Assets.init({ manifest: manifest });
        return await Assets.loadBundle('Assets');
    }

    static _initScene() {
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene);
    }

    static update(dt) {
        Physics.update(dt);
        this.playScene.update(dt);
    }
}

window.onload = function () {
    Game.init();
}

window.addEventListener("resize", (event) => {
    Game.resize(window.innerWidth, window.innerHeight)
});
