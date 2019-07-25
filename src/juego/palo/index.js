import { getSketch } from "_sketch";
import Colores from "_colores";

import Item from "juego/item";

export default class Palo extends Item {
  constructor() {
    let bloquear = false;
    let recompensa = 1;
    const vidaMaxima = 1;
    const vida = vidaMaxima;
    super(bloquear, recompensa, vida, vidaMaxima);
    this.color = getColor();
    this.rot = getSketch().floor(getSketch().random(180));
    this.w = getSketch().random([0.2, 0.3, 0.4]);
    this.h = getSketch().random([0.2, 0.3, 0.4]);
  }

  draw(i, j, canvasItemWidth) {
    getSketch().push();
    getSketch().translate(i * canvasItemWidth + canvasItemWidth / 2, j * canvasItemWidth + canvasItemWidth / 2);
    getSketch().rotate(this.rot);

    getSketch().stroke(this.color);
    getSketch().strokeWeight(2);
    getSketch().line(0, 0, canvasItemWidth * this.w, canvasItemWidth * this.h);

    getSketch().pop();
  }
}

const getColor = () => {
  return Colores.tierra1;
};
