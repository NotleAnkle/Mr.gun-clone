import { Container } from "pixi.js";

export class OutfitsUI extends Container{

    constructor() {
        super();
        
        this.gameOverBar = new PIXI.Container();

        this.smallTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial Black',
            fontSize: 25,
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff'],
        });

        this.gameReloadText = new PIXI.Text("TAP TO START", this.smallTextStyle);
        console.log("menuUI oke");
        this.gameReloadText.anchor.set(0.5);
        this.gameReloadText.zIndex = 2;
        this.gameReloadText.interactive = true;
        this.gameReloadText.cursor = 'pointer';
        this.gameReloadText.position.set(0, 50);
        this.gameOverBar.addChild(this.gameReloadText);

        this.gameOverBar.position.set(600 / 2, 700 / 2);


        // this.gameReloadText.on('pointerdown', () => {
        //     new PlayScene();
        // });

        this.addChild(this.gameOverBar);
        this.zIndex = 100;

        this.blinkCounter = 1;
    }

}