export default class Item {
  constructor(bloquear, recompensa, vida, vidaMaxima) {
    this.rompible = true;
    this.bloquear = bloquear;
    this.recompensa = recompensa;
    this.vida = vida;
    this.vidaMaxima = vidaMaxima;
  }

  golpear(poder) {
    console.log("golpe");
    if (this.rompible === false) return false;

    this.vida -= poder;
    if (this.vida < 0) this.vida = 0;

    return this.vida === 0;
  }
}
