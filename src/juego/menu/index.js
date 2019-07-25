import { getSketch } from "_sketch";
import Parametros from "_parametros";
import State from "_state";
import Colores from "_colores";
import Recursos from "_recursos";

import MenuItems from "juego/menu/items";
import MenuMapa from "juego/menu/mapa";

const ITEM_ITEMS = "items";
const ITEM_HABILIDADES = "habilidades";
const ITEM_MAPA = "mapa";
const ITEM_PERSONAJE = "personaje";

const BOTONES = [
  [{ texto: "Items", value: ITEM_ITEMS }, { texto: "Habilidades", value: ITEM_HABILIDADES }],
  [{ texto: "Mapa", value: ITEM_MAPA }, { texto: "Personaje", value: ITEM_PERSONAJE }]
];

export default class Menu {
  constructor() {
    this.visible = true;
    this.botonActivo = undefined;
    this.submenu = new MenuMapa();
  }

  keyPressed(key) {
    //Salir
    if (key == "i") {
      this.visible = false;
      return;
    }

    //Submenu
    if (this.submenu != undefined) {
      this.submenu.keyPressed(key);
      return;
    }

    if (key == "Escape") {
      this.visible = false;
      return;
    }

    if (key == " " || key == "Enter") {
      this.seleccionar();
      return;
    }

    if (key == "ArrowLeft") {
      let pos = this.buscarIndice();
      pos.i--;
      pos = this.corregirPosicion(pos);
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }

    if (key == "ArrowRight") {
      let pos = this.buscarIndice();
      pos.i++;
      pos = this.corregirPosicion(pos);
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }

    if (key == "ArrowDown") {
      let pos = this.buscarIndice();
      pos.j++;
      pos = this.corregirPosicion(pos);
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }

    if (key == "ArrowUp") {
      let pos = this.buscarIndice();
      pos.j--;
      pos = this.corregirPosicion(pos);
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }
  }

  buscarIndice() {
    if (this.botonActivo == undefined) return { i: -1, j: -1 };

    for (let j = 0; j < BOTONES.length; j++) {
      for (let i = 0; i < BOTONES[0].length; i++) {
        let b = BOTONES[j][i];
        if (b.value == this.botonActivo.value) {
          return { i, j };
        }
      }
    }

    return { i: -1, j: -1 };
  }

  corregirPosicion(pos) {
    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    if (pos.i > BOTONES.length - 1) pos.i = BOTONES.length - 1;
    if (pos.j > BOTONES[0].length - 1) pos.j = BOTONES[0].length - 1;

    return pos;
  }

  seleccionar() {
    if (this.botonActivo == undefined) return;

    switch (this.botonActivo.value) {
      case ITEM_ITEMS: {
        this.submenu = new MenuItems();
        return;
      }

      case ITEM_MAPA: {
        this.submenu = new MenuMapa();
        return;
      }
    }
  }

  draw() {
    if (this.visible == false) return;

    //Submenu
    if (this.submenu != undefined) {
      this.submenu.draw();
      return;
    }

    getSketch().fill(230);
    getSketch().noStroke();
    getSketch().rect(0, 0, getSketch().width, getSketch().height);

    const buttonSpacing = 16;
    const buttonW = (getSketch().width - buttonSpacing - buttonSpacing - buttonSpacing) / BOTONES[0].length;
    const buttonH = 40;
    const buttonTextSize = 20;

    for (let j = 0; j < BOTONES.length; j++) {
      for (let i = 0; i < BOTONES[0].length; i++) {
        let b = BOTONES[j][i];

        getSketch().fill(255);
        getSketch().strokeWeight(this.botonActivo != undefined && this.botonActivo.value == b.value ? 2 : 0);
        getSketch().stroke(0);
        getSketch().rect(
          buttonSpacing + i * buttonW + i * buttonSpacing,
          buttonSpacing + j * buttonH + j * buttonSpacing,
          buttonW,
          buttonH
        );
        getSketch().fill(0);
        getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
        getSketch().textSize(buttonTextSize);
        getSketch().noStroke();
        getSketch().text(
          b.texto,
          buttonSpacing + i * buttonW + i * buttonSpacing + 10,
          buttonSpacing + j * buttonH + j * buttonSpacing + 10
        );
      }
    }
    // //Items
    // getSketch().fill(255);
    // getSketch().strokeWeight(this.itemSeleccionado == ITEM_ITEMS ? 2 : 0);
    // getSketch().stroke(0);
    // getSketch().rect(16, 16, buttonW, 40);
    // getSketch().fill(0);
    // getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
    // getSketch().textSize(40 - 20);
    // getSketch().noStroke();
    // getSketch().text("Items", 16 + 10, 16 + 10);

    // //Habilidades
    // getSketch().fill(255);
    // getSketch().strokeWeight(this.itemSeleccionado == ITEM_HABILIDADES ? 2 : 0);
    // getSketch().stroke(0);
    // getSketch().rect(16 + buttonW + 16, 16, buttonW, 40);
    // getSketch().fill(0);
    // getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
    // getSketch().textSize(40 - 20);
    // getSketch().noStroke();
    // getSketch().text("Habilidades", 16 + buttonW + 16 + 10, 26);

    // //Mapa
    // getSketch().fill(255);
    // getSketch().strokeWeight(this.itemSeleccionado == ITEM_MAPA ? 2 : 0);
    // getSketch().stroke(0);
    // getSketch().rect(16, 16 + 40 + 16, buttonW, 40);
    // getSketch().fill(0);
    // getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
    // getSketch().textSize(40 - 20);
    // getSketch().noStroke();
    // getSketch().text("Mapa", 16 + 10, 16 + 40 + 16 + 10);

    // //Perfil
    // getSketch().fill(255);
    // getSketch().strokeWeight(this.itemSeleccionado == ITEM_PERSONAJE ? 2 : 0);
    // getSketch().stroke(0);
    // getSketch().rect(16 + buttonW + 16, 16 + 40 + 16, buttonW, 40);
    // getSketch().fill(0);
    // getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
    // getSketch().textSize(40 - 20);
    // getSketch().noStroke();
    // getSketch().text("Personaje", 16 + 10 + buttonW + 16, 16 + 40 + 16 + 10);
  }
}
