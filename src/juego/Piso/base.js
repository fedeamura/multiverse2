import { getSketch } from "_sketch";
import Colores from "_colores";

import Piso from "juego/piso/index";

export default class PisoBase extends Piso {
  constructor(pos, centro) {
    super(pos);
    this.color = getColor(centro);
  }

  draw(x, y, w, h) {
    getSketch().noStroke();
    getSketch().fill(this.color);
    getSketch().rect(x, y, w, h);
  }
}

const getColor = centro => {
  if (centro) return Colores.baseCentro;
  return Colores.base;
};
