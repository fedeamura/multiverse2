import { getSketch } from "../_sketch";

import Piso from "./index";

export default class PisoBase extends Piso {
  constructor(pos, centro) {
    super(pos);
    this.color = getColor(centro);
  }

  draw(i, j, canvasItemWidth) {
    const x = i * canvasItemWidth;
    const y = j * canvasItemWidth;
    getSketch().fill(this.color);
    getSketch().rect(x, y, canvasItemWidth, canvasItemWidth);
  }
}

const getColor = centro => {
  if (centro) return getSketch().color(255);
  return getSketch().color("#212121");
};
