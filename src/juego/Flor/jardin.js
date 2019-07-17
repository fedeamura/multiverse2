import { getSketch } from "../_sketch";
import Recursos from "../_recursos";

import Flor from "./index";

export default class FlorJardin extends Flor {
  constructor() {
    let color = getSketch().random([
      "blanca",
      "amarilla",
      "azul",
      "roja",
      "violeta"
    ]);
    super(color);
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
    if (this.color == "azul") return Recursos.imagenes.florAzul;
    if (this.color == "roja") return Recursos.imagenes.florRoja;
    if (this.color == "violeta") return Recursos.imagenes.florVioleta;
    if (this.color == "blanca") return Recursos.imagenes.florBlanca;
    if (this.color == "amarilla") return Recursos.imagenes.florAmarilla;
    return Recursos.imagenes.florAzul;
  }
}
