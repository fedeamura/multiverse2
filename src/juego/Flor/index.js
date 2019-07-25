import Item from "juego/item";

export default class Flor extends Item {
  constructor(color) {
    const bloquea = false;
    const recompensa = 1;
    const vida = 1;
    const vidaMaxima = 1;
    super(bloquea, recompensa, vida, vidaMaxima);
    this.color = color;
  }
}
