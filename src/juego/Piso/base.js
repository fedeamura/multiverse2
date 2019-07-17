import { getSketch } from "../_sketch";

import Piso from "./index";

export default class PisoBase extends Piso {
  constructor(pos) {
    super(pos, getSketch().color("#212121"));
  }

  draw(i, j, canvasItemWidth) {
    const x = i * canvasItemWidth;
    const y = j * canvasItemWidth;
    getSketch().fill(this.color);
    getSketch().rect(x, y, canvasItemWidth, canvasItemWidth);
  }
}
