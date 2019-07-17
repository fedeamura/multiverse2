import { getSketch } from "../_sketch";
import Colores from "../_colores";

import Piso from "./index";

export default class PisoArena extends Piso {
  constructor(pos) {
    super(pos, getSketch().color("#fdd835"));
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(Colores.arena);
    getSketch().noStroke();
    getSketch().rect(
      i * canvasItemWidth,
      j * canvasItemWidth,
      canvasItemWidth,
      canvasItemWidth
    );
  }
}
