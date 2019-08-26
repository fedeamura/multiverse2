import { getSketch } from "_sketch";
import Parametros from "_parametros";
import State from "_state";
import Colores from "_colores";
import Recursos from "_recursos";
import Constantes from "_constantes";

import { Pico, Pala, Hacha } from "juego/player";

import Tabla from "juego/tabla";

export default class HUD {
  constructor() {
    this.hambreW = 0.0;
    this.oxigenoW = 0.0;
    this.saludW = 0.0;
  }

  show() {
    const player = State.player;

    const canvasItemWidth = Parametros.canvasItemWidth;
    const canvasRows = Parametros.canvasRows;
    const padding = 8;
    const borderRadius = 8;

    //player avatar
    const player_w = 40;
    const player_h = 40;
    const player_x = padding;
    const player_y = padding;
    getSketch().noStroke();
    getSketch().fill(255);
    getSketch().rect(player_x, player_y, player_w, player_h, borderRadius);

    const barra_x = padding + player_w + padding;
    const barra_y = padding + 3;
    const barra_w = 100;
    const barra_h = 8;
    const barra_padding = 4;

    //player salud
    getSketch().noStroke();
    getSketch().fill(0, 100);
    getSketch().rect(barra_x, barra_y, barra_w, barra_h, borderRadius);

    const porcentajeSalud = player.salud / player.saludMaxima;
    this.saludW = getSketch().lerp(this.saludW, porcentajeSalud * barra_w, 0.1);
    getSketch().noStroke();
    getSketch().fill(Colores.colorSalud);
    getSketch().rect(barra_x, barra_y, this.saludW, barra_h, borderRadius);

    //player hambre
    const playerHambre_y = barra_y + barra_h + barra_padding;
    getSketch().noStroke();
    getSketch().fill(0, 100);
    getSketch().rect(barra_x, playerHambre_y, barra_w, barra_h, borderRadius);

    const porcentajeHambre = player.hambre / player.hambreMaxima;
    this.hambreW = getSketch().lerp(this.hambreW, porcentajeHambre * barra_w, 0.1);
    getSketch().noStroke();
    getSketch().fill(Colores.colorHambre);
    getSketch().rect(barra_x, playerHambre_y, this.hambreW, barra_h, borderRadius);

    //player oxigeno
    const playerOxigeno_y = barra_y + barra_h + barra_padding + barra_h + barra_padding;
    getSketch().noStroke();
    getSketch().fill(0, 100);
    getSketch().rect(barra_x, playerOxigeno_y, barra_w, barra_h, borderRadius);

    const porcentajeOxigeno = player.oxigeno / player.oxigenoMaximo;
    this.oxigenoW = getSketch().lerp(this.oxigenoW, porcentajeOxigeno * barra_w, 0.1);
    getSketch().noStroke();
    getSketch().fill(Colores.colorOxigeno);
    getSketch().rect(barra_x, playerOxigeno_y, this.oxigenoW, barra_h, borderRadius);

    //Armas
    const arma_w = 36;
    const arma_padding = 8;
    const arma_x = canvasItemWidth * canvasRows;
    const arma_y = canvasItemWidth * canvasRows - arma_w - arma_padding;
    const imgPico = Recursos.imagenes.pico1;
    const imgPala = Recursos.imagenes.pala1;
    const imgHacha = Recursos.imagenes.hacha1;

    //Equipado
    if (player.itemEquipado) {
      getSketch().fill(255);
      getSketch().stroke(0);
      getSketch().strokeWeight(player.itemEquipadoSeleccionado == true ? 2 : 0);


      const x = arma_x - arma_w * 4 - arma_padding * 4;
      const y = arma_y;
      getSketch().rect(x, y, arma_w, arma_w);

      //Preview
      player.itemEquipadoEntity.draw(x, y, arma_w, arma_w)
    }
    // getSketch().strokeWeight(player.itemEquipado ? 2 : 0);
    // getSketch().image(imgPico, arma_x - arma_w * 3 - arma_padding * 3 + 4, arma_y + 4, arma_w - 8, arma_w - 8);

    //Pico
    getSketch().fill(255);
    getSketch().stroke(0);
    getSketch().strokeWeight(player.itemEquipadoSeleccionado ? 0 : player.arma instanceof Pico ? 2 : 0);
    getSketch().rect(arma_x - arma_w * 3 - arma_padding * 3, arma_y, arma_w, arma_w);
    getSketch().image(imgPico, arma_x - arma_w * 3 - arma_padding * 3 + 4, arma_y + 4, arma_w - 8, arma_w - 8);

    //Pala
    getSketch().stroke(0);
    getSketch().strokeWeight(player.itemEquipadoSeleccionado ? 0 : player.arma instanceof Pala ? 2 : 0);
    getSketch().rect(arma_x - arma_w * 2 - arma_padding * 2, arma_y, arma_w, arma_w);
    getSketch().image(imgPala, arma_x - arma_w * 2 - arma_padding * 2 + 4, arma_y + 4, arma_w - 8, arma_w - 8);

    //Hacha
    getSketch().stroke(0);
    getSketch().strokeWeight(player.itemEquipadoSeleccionado ? 0 : player.arma instanceof Hacha ? 2 : 0);
    getSketch().rect(arma_x - arma_w * 1 - arma_padding * 1, arma_y, arma_w, arma_w);
    getSketch().image(imgHacha, arma_x - arma_w * 1 - arma_padding * 1 + 4, arma_y + 4, arma_w - 8, arma_w - 8);
  }
}
