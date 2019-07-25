import { getSketch } from "_sketch";
import Colores from "_colores";
import Item from "juego/item";

import Rules_Mapa from "rules/Rules_Mapa";

export default class Nave extends Item {
  constructor() {
    super();
    this.bloquear = true;
    this.rompible = false;
    this.color = getColor();
  }

  draw(i, j, canvasItemWidth) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }

  golpear(poder) {
    console.log("golpe nave");
    Rules_Mapa.reiniciar();
    return false;
  }
}

const getColor = () => {
  return Colores.nave;
};
