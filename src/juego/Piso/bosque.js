import { getSketch } from "_sketch";
import Colores from "_colores";

import Piso from "juego/piso/index";

export default class PisoBosque extends Piso {
  constructor(pos) {
    super(pos);
    this.color = getColor();
    this.puedeHundir = true;
    this.golpesHundir = 3;
    this.golpesHundirMaximo = 3;
  }

  draw(x, y, w, h) {
    let color = this.color;
    if (this.hundido == true) {
      color = Colores.pisoHundido;
    }

    getSketch().fill(color);
    getSketch().noStroke();
    getSketch().rect(x, y, w, h);
  }
}

const getColor = () => {
  return Colores.pasto3;
}