import { getSketch } from "_sketch";
import Recursos from "_recursos";

import Item from "juego/item";

export default class Arbol extends Item {
  constructor() {
    let bloquear = true;
    let recompensa = getSketch().random([3, 4]);
    const vidaMaxima = getSketch().random([3, 4, 5]);
    const vida = vidaMaxima;
    super(bloquear, recompensa, vida, vidaMaxima);
  }

  draw(i, j, canvasItemWidth) {
    let img = Recursos.imagenes.arbol1;
    getSketch().image(img, i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}
