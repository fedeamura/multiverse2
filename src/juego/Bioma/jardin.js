import Bioma from "./index";

export default class Jardin extends Bioma {
  constructor() {
    super();

    this.probabilidadArbol = 0;
    this.probabilidadArbusto = 0;
    this.probabilidadFlor = 0.2;
    this.flor = undefined;
  }
}
