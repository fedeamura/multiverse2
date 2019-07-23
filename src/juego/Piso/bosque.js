import { getSketch } from "../_sketch";
import Colores from "../_colores";

import Piso from "./index";

export default class PisoBosque extends Piso {
  constructor(pos) {
    super(pos, Colores.pasto3);
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}
