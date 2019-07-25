import Bioma from "juego/bioma/index";

export default class Llanura extends Bioma {
  constructor() {
    super();
    this.probabilidadArbol = 0.025;
    this.probabilidadArbusto = 0.0;
    this.probabilidadFlor = 0.05;
    this.probabilidadPalo = 0.05;
    this.flor = undefined;
  }
}
