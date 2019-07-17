import { getSketch } from "../_sketch";
import Recursos from "../_recursos";

import Item from "../Item";

export default class Arbusto extends Item {
  constructor() {
    let bloquear = false;
    let golpes = 1;
    let recompensa = getSketch().floor(getSketch().random(6, 13));
    super(bloquear, golpes, recompensa);

    this.tipo = getSketch().random([1, 2]);
    this.color = getSketch().random(["rojo", "azul", "violeta"]);
  }

  draw(i, j, canvasItemWidth) {
    const img = this.getImagen();
    getSketch().image(
      img,
      i * canvasItemWidth,
      j * canvasItemWidth,
      canvasItemWidth,
      canvasItemWidth
    );
  }

  getImagen() {
    if (this.tipo == 1) {
      if (this.color == "rojo") return Recursos.imagenes.arbustoRojo1;
      if (this.color == "violeta") return Recursos.imagenes.arbustoVioleta1;
      return Recursos.imagenes.arbustoAzul1;
    }

    if (this.color == "rojo") return Recursos.imagenes.arbustoRojo2;
    if (this.color == "violeta") return Recursos.imagenes.arbustoVioleta2;
    return Recursos.imagenes.arbustoAzul2;
  }
}
