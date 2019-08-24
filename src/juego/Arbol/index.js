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

    this.probabilidadManzana = 0.1;
    this.recompensaManzana = getSketch().random([1, 3]);

    this.probabilidadSemilla = 0.05;
    this.recompensaSemilla = getSketch().random([1, 5]);
  }

  draw(i, j, canvasItemWidth) {
    let img = Recursos.imagenes.arbol1;
    getSketch().image(img, i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }
}
