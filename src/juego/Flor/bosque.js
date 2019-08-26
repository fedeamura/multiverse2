import { getSketch } from "_sketch";
import Recursos from "_recursos";

import Flor from "juego/flor/index";

export default class FlorBosque extends Flor {
  constructor() {
    let color = getSketch().random(["azul", "roja", "violeta"]);
    super(color);
  }

  draw(x, y, w, h) {
    const img = this.getImagen();

    getSketch().image(img, x, y, w, h);
  }

  getImagen() {
    if (this.color == "azul") return Recursos.imagenes.florAzul;
    if (this.color == "roja") return Recursos.imagenes.florRoja;
    if (this.color == "violeta") return Recursos.imagenes.florVioleta;
    return Recursos.imagenes.florAzul;
  }
}
