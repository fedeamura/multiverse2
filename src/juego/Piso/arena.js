import { getSketch } from "_sketch";
import Colores from "_colores";

import Piso from "juego/piso/index";

export default class PisoArena extends Piso {
  constructor(pos) {
    super(pos, Colores.arena);
    this.puedeHundir = true;
    this.golpesHundir = 2;
    this.golpesHundirMaximo = 2;
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
