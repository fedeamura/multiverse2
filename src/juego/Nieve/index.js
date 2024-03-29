import { getSketch } from "_sketch";
import Colores from "_colores";
import Item from "juego/item";

export default class Nieve extends Item {
  constructor() {
    const bloquea = false;
    const recompensa = getSketch().random([1, 2, 3]);
    const vida = 1;
    const vidaMaxima = 1;
    super(bloquea, recompensa, vida, vidaMaxima);
    this.color = getColor();
  }

  draw(x, y, w, h) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(x, y, w, h);
  }
}

const getColor = () => {
  return Colores.nieve;
};
