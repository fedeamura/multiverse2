import { getSketch } from "../_sketch";
import Recursos from "../_recursos";

import Item from "../Item";

export default class Arbol extends Item {
  constructor() {
    let bloquear = true;
    let golpes = getSketch().random([3, 4, 5]);
    let recompensa = getSketch().random([3, 4]);
    super(bloquear, golpes, recompensa);
  }

  draw(i, j, canvasItemWidth) {
    let img = Recursos.imagenes.arbol1;
    getSketch().image(
      img,
      i * canvasItemWidth,
      j * canvasItemWidth,
      canvasItemWidth,
      canvasItemWidth
    );
  }
}
