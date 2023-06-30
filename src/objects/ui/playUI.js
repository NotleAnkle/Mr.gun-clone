import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";

export class PlayUI extends Container{
  constructor() {
    super();
    this._initScore();
    this.resize();
  }

  _initScore() {
    let textStyle = new TextStyle({ fontSize: 52, align: "center", fill: 0xffffff });
    this.scoreText = new Text(`Score: 0`, textStyle);
    this.scoreText.anchor.set(1, 0);
    this.addChild(this.scoreText);
  }

  updateScore(score) {
    this.scoreText.text = `Score: ${score}`;
  }

  resize() {
    console.log(Game.windowWidth);
    this.scoreText.x = Game.windowWidth - 50;
    this.scoreText.y = 50;
  }

}