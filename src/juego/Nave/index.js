import { getSketch } from "../_sketch";
import Colores from "../_colores";
import Item from "../Item";

import Rules_Mapa from "../Rules/Rules_Mapa";

export default class Nave extends Item {
  constructor() {
    super();
    this.bloquear = true;
    this.rompible = false;
    this.color = getColor();
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }

  golpear() {
    Rules_Mapa.reiniciar();
  }
}

const getColor = () => {
  return Colores.nave;
};
