import { getSketch } from "_sketch";

export default class Piso {
  constructor(pos, color) {
    this.x = pos.x;
    this.y = pos.y;
    this.color = color;
    this.item = undefined;
    this.items = [];
  }

  bloqueaElPaso() {
    if (this.items) {
      let bloquea = false;
      this.items.forEach(element => {
        if (element.bloquear == true) bloquea = true;
      });
      return bloquea;
    } else {
      return this.item && this.item.bloquear == true;
    }
  }
}
