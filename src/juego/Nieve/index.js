import { getSketch } from "_sketch";
import Colores from "_colores";
import Item from "juego/item";

export default class Nieve extends Item {
  constructor() {
    const bloquea = false;
    const recompensa = 2;
    const vida = 1;
    const vidaMaxima = 1;
    super(bloquea, recompensa, vida, vidaMaxima);
    this.color = getColor();
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}

const getColor = () => {
  return Colores.nieve;
};
