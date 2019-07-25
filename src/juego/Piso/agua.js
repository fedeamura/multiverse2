import { getSketch } from "_sketch";
import Colores from "_colores";

import Piso from "juego/piso/index";

export default class PisoAgua extends Piso {
  constructor(pos, profundidad) {
    super(pos, getColor(profundidad));
    this.profundidad = profundidad;
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}

const getColor = profundidad => {
  if (profundidad == 1) return Colores.agua1;
  if (profundidad == 2) return Colores.agua2;
  if (profundidad == 3) return Colores.agua3;
  if (profundidad == 4) return Colores.agua4;
  if (profundidad == 5) return Colores.agua5;
  if (profundidad == 6) return Colores.agua6;
  return Colores.agua1;
};
