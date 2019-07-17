import { getSketch } from "../_sketch";

export default class Piso {
  constructor(pos, color) {
    this.pos = pos;
    this.color = color;
    this.item = undefined;
  }

  bloqueaElPaso() {
    return this.item && this.item.bloquear == true;
  }
}
