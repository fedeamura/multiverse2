import { getSketch } from "_sketch";
import Colores from "_colores";

import Piso from "juego/piso/index";

export default class PisoMontaña extends Piso {
  constructor(pos, altura) {
    super(pos, getColor(altura));
    this.altura = altura;
    this.puedeHundir = true;
    this.golpesHundir = 5;
    this.golpesHundirMaximo = 5;
  }

  draw(i, j, canvasItemWidth) {
    let color = this.color;
    if (this.hundido == true) {
      color = Colores.pisoHundido;
    }

    getSketch().fill(color);
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
