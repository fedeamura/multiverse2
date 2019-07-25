import { getSketch } from "_sketch";
import Recursos from "_recursos";

import Flor from "juego/flor/index";

export default class FlorLlanura extends Flor {
  constructor() {
    let color = getSketch().random(["blanca", "amarilla"]);
    super(color);
  }

  draw(i, j, canvasItemWidth) {
    let img = this.getImagen();
    getSketch().image(img, i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }

  getImagen() {
    if (this.color == "blanca") return Recursos.imagenes.florBlanca;
    if (this.color == "amarilla") return Recursos.imagenes.florAmarilla;
    return Recursos.imagenes.florBlanca;
  }
}
