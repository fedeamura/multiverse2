import { getSketch } from "../_sketch";
import Colores from "../_colores";

import Piso from "./index";

export default class PisoMontaña extends Piso {
  constructor(pos, altura) {
    super(pos, getColor(altura));
    this.altura = altura;
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}

const getColor = altura => {
  if (altura == 1) return Colores.tierra1;
  if (altura == 2) return Colores.tierra2;
  if (altura == 3) return Colores.tierra3;
  return Colores.tierra1;
};
