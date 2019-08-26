import { getSketch } from "_sketch";
import Colores from "_colores";

import Piso from "juego/piso/index";

export default class PisoAgua extends Piso {
  constructor(pos, profundidad) {
    super(pos);
    this.color = getColor(profundidad);
    this.profundidad = profundidad;
  }

  draw(x, y, w, h) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(x, y, w, h);
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
