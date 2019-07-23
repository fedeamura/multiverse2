import { getSketch } from "../_sketch";
import Colores from "../_colores";

import Piso from "./index";

export default class PisoJardin extends Piso {
  constructor(pos) {
    super(pos, Colores.pasto1);
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}
