import { getSketch } from "_sketch";
import Colores from "_colores";
import Item from "juego/item";

const VIDA_MAX = 10;

export default class Oro extends Item {
  constructor() {
    super();
    this.bloquear = true;
    this.vida = VIDA_MAX;
    this.vidaMaxima = VIDA_MAX;
    this.recompensa = getSketch().random([1, 2, 3]);
    this.color = getColor();
  }

  draw(i, j, canvasItemWidth) {
    getSketch().strokeWeight(2);
    getSketch().stroke(0);
    getSketch().fill(this.color);
    getSketch().rect(i * canvasItemWidth + 4, j * canvasItemWidth + 4, canvasItemWidth - 8, canvasItemWidth - 8);
  }
}

const getColor = () => {
  return Colores.oro;
};
