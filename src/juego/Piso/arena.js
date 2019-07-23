import { getSketch } from "../_sketch";
import Colores from "../_colores";

import Piso from "./index";

export default class PisoArena extends Piso {
  constructor(pos) {
    super(pos, Colores.arena);
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(Colores.arena);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}
