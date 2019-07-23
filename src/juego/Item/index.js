export default class Item {
  constructor(bloquear, recompensa, vida, vidaMaxima) {
    this.rompible = true;
    this.bloquear = bloquear;
    this.recompensa = recompensa;
    this.vida = vida;
    this.vidaMaxima = vidaMaxima;
  }
}
