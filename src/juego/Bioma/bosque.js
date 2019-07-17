import Bioma from "./index";

export default class Bosque extends Bioma {
  constructor() {
    super();

    this.probabilidadArbol = 0.3;
    this.probabilidadArbusto = 0.1;
    this.probabilidadFlor = 0.1;
    this.flor = undefined;
    this.arbusto = undefined;
  }
}
