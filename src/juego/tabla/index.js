import { getSketch } from "_sketch";
import Colores from "_colores";

import Item from "juego/item";

export default class Tabla extends Item {
  constructor() {
    let bloquear = false;
    let recompensa = 0;
    const vidaMaxima = 1;
    const vida = vidaMaxima;
    super(bloquear, recompensa, vida, vidaMaxima);
    this.color = getColor();
  }

  draw(i, j, canvasItemWidth) {
    getSketch().noStroke();
    getSketch().fill(this.color);
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}

const getColor = () => {
  return Colores.tabla;
};
