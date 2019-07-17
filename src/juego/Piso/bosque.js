import { getSketch } from "../_sketch";
import Recursos from "../_recursos";

import Piso from "./index";

export default class PisoBosque extends Piso {
  constructor(pos) {
    super(pos, getSketch().color("#43a047"));
    this.tipo = getSketch().random(["1", "2"]);
  }

  draw(i, j, canvasItemWidth) {
    let img = this.getImagen();
    getSketch().image(
      img,
      i * canvasItemWidth,
      j * canvasItemWidth,
      canvasItemWidth,
      canvasItemWidth
    );
  }

  getImagen() {
    if (this.tipo == "1") return Recursos.imagenes.pisoBosque1;
    return Recursos.imagenes.pisoBosque2;
  }
}
