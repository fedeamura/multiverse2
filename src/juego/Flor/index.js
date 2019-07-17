import Item from "../Item";

export default class Flor extends Item {
  constructor(color) {
    let bloquea = false;
    let recompensa = 1;
    let golpes = 1;
    super(bloquea, recompensa, golpes);
    this.color = color;
  }
}
