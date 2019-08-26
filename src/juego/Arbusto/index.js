import { getSketch } from "_sketch";
import Recursos from "_recursos";

import Item from "juego/item";

export default class Arbusto extends Item {
  constructor() {
    const bloquear = false;
    const recompensa = getSketch().floor(getSketch().random(6, 13));
    const vida = 1;
    const vidaMaxima = 1;
    super(bloquear, recompensa, vida, vidaMaxima);

    this.tipo = getSketch().random([1, 2]);
    this.color = getSketch().random(["rojo", "azul", "violeta"]);
  }

  draw(x, y, w, h) {
    const img = this.getImagen();
    getSketch().image(img, x, y, w, h);
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
