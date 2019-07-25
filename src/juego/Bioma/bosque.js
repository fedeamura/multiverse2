import Bioma from "juego/bioma/index";

export default class Bosque extends Bioma {
  constructor() {
    super();

    this.probabilidadArbol = 0.3;
    this.probabilidadArbusto = 0.1;
    this.probabilidadFlor = 0.1;
    this.probabilidadPalo = 0.2;
    this.flor = undefined;
    this.arbusto = undefined;
  }
}
