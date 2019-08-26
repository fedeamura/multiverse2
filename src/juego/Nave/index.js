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

  draw(x, y, w, h) {
    getSketch().fill(this.color);
    getSketch().noStroke();
    getSketch().rect(x, y, w, h);
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
