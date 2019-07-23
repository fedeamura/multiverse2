import { getSketch } from "../_sketch";
import Colores from "../_colores";
import Item from "../Item";
import Recursos from "../_recursos";

const VIDA_MAX = 6;

export default class Piedra extends Item {
  constructor() {
    super();
    this.bloquear = true;
    this.vida = VIDA_MAX;
    this.vidaMaxima = VIDA_MAX;
    this.recompensa = getSketch().random([3, 4, 5]);
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
