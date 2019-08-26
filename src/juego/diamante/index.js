import { getSketch } from "_sketch";
import Colores from "_colores";
import Item from "juego/item";

const VIDA_MAX = 20;

export default class Diamante extends Item {
  constructor() {
    super();
    this.bloquear = true;
    this.vida = VIDA_MAX;
    this.vidaMaxima = VIDA_MAX;
    this.recompensa = getSketch().random([1, 2, 3, 4, 5, 6]);
    this.color = getColor();
  }

  draw(x, y, w, h) {
    getSketch().strokeWeight(2);
    getSketch().stroke(0);
    getSketch().fill(this.color);
    getSketch().rect(x + w * 0.1, y + h * 0.1, w - w * 0.2, h - h * 0.2);
  }
}

const getColor = () => {
  return Colores.diamante;
};
