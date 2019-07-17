import { getSketch } from "../_sketch";
import Colores from "../_colores";

import Piso from "./index";

export default class PisoAgua extends Piso {
  constructor(pos, profundidad) {
    super(pos, getSketch().color("#2196f3"));
    this.profundidad = profundidad;
  }

  draw(i, j, canvasItemWidth) {
    let color = this.getColor();
    getSketch().fill(color);
    getSketch().noStroke();
    getSketch().rect(
      i * canvasItemWidth,
      j * canvasItemWidth,
      canvasItemWidth,
      canvasItemWidth
    );
  }

  getColor() {
    if (this.profundidad == 1) return Colores.agua1;
    if (this.profundidad == 2) return Colores.agua2;
    if (this.profundidad == 3) return Colores.agua3;
    if (this.profundidad == 4) return Colores.agua4;
    if (this.profundidad == 5) return Colores.agua5;
    if (this.profundidad == 6) return Colores.agua6;
    return Colores.agua1;
  }
}
