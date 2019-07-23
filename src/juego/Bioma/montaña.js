import Bioma from "./index";
import { isFunction } from "util";

export default class Montaña extends Bioma {
  constructor(altura) {
    super();
    this.altura = altura;

    if (altura == 1) {
      this.probabilidadNieve = 0;
      this.probabilidadPiedra = 0.1;
      this.probabilidadOro = 0.01;
    }

    if (this.altura == 2) {
      this.probabilidadNieve = 0;
      this.probabilidadPiedra = 0.1;
      this.probabilidadOro = 0.01;
    }

    if (this.altura == 3) {
      this.probabilidadNieve = 0.4;
      this.probabilidadPiedra = 0.05;
      this.probabilidadOro = 0.01;
    }

    if (this.altura == 4) {
      this.probabilidadNieve = 0.8;
      this.probabilidadPiedra = 0.05;
      this.probabilidadOro = 0.01;
    }

    if (this.altura == 5) {
      this.probabilidadNieve = 1;
      this.probabilidadPiedra = 0.05;
      this.probabilidadOro = 0.03;
    }
  }
}
