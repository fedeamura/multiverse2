import { getSketch } from "_sketch";
import Colores from "_colores";
import Item from "juego/item";

const VIDA_MAX = 1;

export default class SemillaArbol extends Item {
  constructor(piso) {
    super();

    this.item = piso;
    this.bloquear = false;
    this.vida = VIDA_MAX;
    this.vidaMaxima = VIDA_MAX;
    this.recompensa = 0;
    this.color = getColor();
    this.contador = 20;
    this.contadorMaximo = 20;
  }

  draw(x, y, w, h) {
    getSketch().noStroke();
    getSketch().fill(this.color);
    getSketch().rect(x + w * 0.3, y + h * 0.5, w * 0.1, h * 0.1);
    getSketch().rect(x + w * 0.5, y + h * 0.7, w * 0.1, h * 0.1);
    getSketch().rect(x + w * 0.7, y + h * 0.2, w * 0.1, h * 0.1);
    getSketch().rect(x + w * 0.2, y + h * 0.8, w * 0.1, h * 0.1);
  }
}

const getColor = () => {
  return Colores.semillaArbol;
};
