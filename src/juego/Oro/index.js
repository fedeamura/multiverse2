import { getSketch } from "../_sketch";
import Colores from "../_colores";
import Item from "../Item";
import Recursos from "../_recursos";

const VIDA_MAX = 10;

export default class Oro extends Item {
  constructor() {
    super();
    this.bloquear = true;
    this.vida = VIDA_MAX;
    this.vidaMaxima = VIDA_MAX;
    this.recompensa = getSketch().random([1, 2, 3]);
    this.color = getColor();
  }

  draw(i, j, canvasItemWidth) {
    const img = getImagen(this.vida);
    getSketch().image(img, i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
  }

  golpear() {}
}

const getImagen = vida => {
  if (vida > VIDA_MAX / 2) return Recursos.imagenes.piedra1;
  return Recursos.imagenes.piedra2;
};

const getColor = () => {
  return Colores.piedra;
};
