import { getSketch } from "_sketch";
import Colores from "_colores";

import Piso from "juego/piso/index";

export default class PisoJardin extends Piso {
  constructor(pos) {
    super(pos, Colores.pasto1);
    this.puedeHundir = true;
    this.golpesHundir = 3;
    this.golpesHundirMaximo = 3;
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
