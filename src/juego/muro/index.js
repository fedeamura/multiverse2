import { getSketch } from "_sketch";
import Colores from "_colores";

import Item from "juego/item";

export default class Muro extends Item {
  constructor() {
    const bloquear = true;
    const recompensa = 0;
    const vidaMaxima = 1;
    const vida = vidaMaxima;

    super(bloquear, recompensa, vida, vidaMaxima);
    this.color = getColor();
  }

  draw(x, y, w, h) {
    getSketch().noStroke();
    getSketch().fill(this.color);
    getSketch().rect(x, y, w, h);
  }
}

const getColor = () => {
  return Colores.muro;
};
