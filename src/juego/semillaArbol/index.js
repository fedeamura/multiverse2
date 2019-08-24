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

  draw(i, j, canvasItemWidth) {
    getSketch().noStroke();
    getSketch().fill(this.color);

    getSketch().rect(i * canvasItemWidth + canvasItemWidth * 0.3, j * canvasItemWidth + canvasItemWidth * 0.5, 4, 4);
    getSketch().rect(i * canvasItemWidth + canvasItemWidth * 0.5, j * canvasItemWidth + canvasItemWidth * 0.7, 4, 4);
    getSketch().rect(i * canvasItemWidth + canvasItemWidth * 0.7, j * canvasItemWidth + canvasItemWidth * 0.2, 4, 4);
    getSketch().rect(i * canvasItemWidth + canvasItemWidth * 0.2, j * canvasItemWidth + canvasItemWidth * 0.8, 4, 4);

    // getSketch().rect(i * canvasItemWidth * 1.5, j * canvasItemWidth * 1.2, 4, 4);
    // getSketch().rect(i * canvasItemWidth * 1.2, j * canvasItemWidth * 1.7, 4, 4);
    // getSketch().rect(i * canvasItemWidth * 1.3, j * canvasItemWidth * 1.6, 4, 4);
  }
}

const getColor = () => {
  return Colores.semillaArbol;
};
