import { getSketch } from "_sketch";
import Parametros from "_parametros";
import State from "_state";
import Colores from "_colores";
import Recursos from "_recursos";

const ITEM_MADERA = "madera";
const ITEM_PALO = "palo";

const ITEM_MANZANA = "manzana";
const ITEM_BAYA_ROJA = "baya_roja";
const ITEM_BAYA_AZUL = "baya_azul";
const ITEM_BAYA_VIOLETA = "baya_violeta";

const ITEM_PIEDRA = "piedra";
const ITEM_ORO = "oro";
const ITEM_DIAMANTE = "diamante";

const ITEM_FLOR_AZUL = "flor_azul";
const ITEM_FLOR_ROJA = "flor_roja";
const ITEM_FLOR_VIOLETA = "flor_violeta";
const ITEM_FLOR_BLANCA = "flor_blanca";
const ITEM_FLOR_AMARILLA = "flor_amarilla";

const BOTONES = [
  //Madera
  [{ titulo: "Construccion" }, {}, {}],
  [
    //Madera
    { texto: "Madera", value: ITEM_MADERA },
    //Palo
    { texto: "Palo", value: ITEM_PALO },
    {}
  ],
  //Comida
  [{ titulo: "Comida" }, {}, {}],
  [
    //Manzana
    { texto: "Manzana", value: ITEM_MANZANA },
    //Baya roja
    { texto: "Baya roja", value: ITEM_BAYA_ROJA },
    //Baya azul
    { texto: "Baya azul", value: ITEM_BAYA_AZUL }
  ],
  [
    //Baya violeta
    { texto: "Baya violeta", value: ITEM_BAYA_VIOLETA },
    {},
    {}
  ],
  //Mineria
  [{ titulo: "Mineria" }, {}, {}],
  [
    //Piedra
    { texto: "Piedra", value: ITEM_PIEDRA },
    //Oro
    { texto: "Oro", value: ITEM_ORO },
    //Diamante
    { texto: "Diamante", value: ITEM_DIAMANTE }
  ],
  //Varios
  [{ titulo: "Varios" }, {}, {}],
  [
    //Flor azul
    { texto: "Flor azul", value: ITEM_FLOR_AZUL },
    //Flor roja
    { texto: "Flor roja", value: ITEM_FLOR_ROJA },
    //Flor violeta
    { texto: "Flor violeta", value: ITEM_FLOR_VIOLETA }
  ],
  [
    //Flor blanca
    { texto: "Flor blanca", value: ITEM_FLOR_BLANCA },
    //Flor amarilla
    { texto: "Flor amarilla", value: ITEM_FLOR_AMARILLA },
    //
    {}
  ]
];

export default class Menu {
  constructor() {
    this.visible = true;

    this.botonActivo = undefined;

    for (let j = 0; j < BOTONES.length; j++) {
      for (let i = 0; i < BOTONES[0].length; i++) {
        let b = BOTONES[j][i];

        if (b && b.value) {
          switch (b.value) {
            case ITEM_MADERA:
              {
                b.cantidad = State.items.madera;
              }
              break;

            case ITEM_PALO:
              {
                b.cantidad = State.items.palo;
              }
              break;

            case ITEM_MANZANA:
              {
                b.cantidad = State.items.manzana;
              }
              break;

            case ITEM_BAYA_ROJA:
              {
                b.cantidad = State.items.bayaRoja;
              }
              break;

            case ITEM_BAYA_AZUL:
              {
                b.cantidad = State.items.bayaAzul;
              }
              break;

            case ITEM_BAYA_VIOLETA:
              {
                b.cantidad = State.items.bayaVioleta;
              }
              break;

            case ITEM_PIEDRA:
              {
                b.cantidad = State.items.piedra;
              }
              break;

            case ITEM_ORO:
              {
                b.cantidad = State.items.oro;
              }
              break;

            case ITEM_DIAMANTE:
              {
                b.cantidad = State.items.diamante;
              }
              break;

            case ITEM_FLOR_AZUL:
              {
                b.cantidad = State.items.florAzul;
              }
              break;

            case ITEM_FLOR_ROJA:
              {
                b.cantidad = State.items.florRoja;
              }
              break;

            case ITEM_FLOR_VIOLETA:
              {
                b.cantidad = State.items.florVioleta;
              }
              break;
            case ITEM_FLOR_AMARILLA:
              {
                b.cantidad = State.items.florAmarilla;
              }
              break;

            case ITEM_FLOR_BLANCA:
              {
                b.cantidad = State.items.florBlanca;
              }
              break;
          }
        }
      }
    }
  }

  keyPressed(key) {
    if (key == "Escape") {
      State.menu.submenu = undefined;
      return;
    }

    if (key == " " || key == "Enter") {
      this.seleccionar();
      return;
    }

    if (key == "ArrowLeft") {
      const pos = this.moverIzquierda();
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }

    if (key == "ArrowRight") {
      const pos = this.moverDerecha();
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }

    if (key == "ArrowDown") {
      const pos = this.moverAbajo();
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }

    if (key == "ArrowUp") {
      const pos = this.moverArriba();
      this.botonActivo = BOTONES[pos.j][pos.i];
      return;
    }
  }

  moverDerecha() {
    let pos = this.buscarIndice();
    pos.i++;
    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    try {
      let b = BOTONES[pos.j][pos.i];
      if (b == undefined || b.value == undefined) {
        pos.i--;
      }
    } catch (ex) {
      pos.i--;
    }

    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    return pos;
  }

  moverIzquierda() {
    let pos = this.buscarIndice();
    pos.i--;
    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    try {
      let b = BOTONES[pos.j][pos.i];
      if (b == undefined || b.value == undefined) {
        pos.i++;
      }
    } catch (ex) {
      pos.i++;
    }

    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    return pos;
  }

  moverAbajo() {
    let posOriginal = this.buscarIndice();
    let pos = this.buscarIndice();
    pos.j++;
    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    try {
      let b = BOTONES[pos.j][pos.i];
      if (b == undefined) {
        pos = posOriginal;
      } else {
        let esTitulo = BOTONES[pos.j][0].titulo != undefined;
        if (esTitulo) {
          pos.j++;
        } else {
          if (b.value == undefined) {
            pos = posOriginal;
          }
        }

        b = BOTONES[pos.j][pos.i];
        if (b == undefined || (b.value == undefined && b.titulo == undefined)) {
          pos = posOriginal;
        }
      }
    } catch (ex) {
      pos = posOriginal;
    }

    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    return pos;
  }

  moverArriba() {
    let posOriginal = this.buscarIndice();
    let pos = this.buscarIndice();
    pos.j--;
    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    try {
      let b = BOTONES[pos.j][pos.i];
      if (b == undefined) {
        pos.j++;
      } else {
        let esTitulo = BOTONES[pos.j][0].titulo != undefined;
        if (esTitulo && pos.j != 0) {
          pos.j--;
        } else {
          if (b.value == undefined) {
            pos = posOriginal;
          }
        }
        b = BOTONES[pos.j][pos.i];
        if (b == undefined || (b.value == undefined && b.titulo == undefined)) {
          pos = posOriginal;
        }
      }
    } catch (ex) {
      console.log(ex);
      pos = posOriginal;
    }

    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    return pos;
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

  seleccionar() {
    if (this.botonActivo == undefined) return;
  }

  draw() {
    getSketch().fill(230);
    getSketch().noStroke();
    getSketch().rect(0, 0, getSketch().width, getSketch().height);

    const buttonPadding = 16;
    const buttonSpacing = 8;
    const buttonW = (getSketch().width - buttonPadding - buttonPadding - buttonSpacing * (BOTONES[0].length - 1)) / BOTONES[0].length;
    const buttonH = 20;
    const buttonTextSize = 10;
    const buttonTextPadding = (buttonH - buttonTextSize) / 2;

    for (let j = 0; j < BOTONES.length; j++) {
      for (let i = 0; i < BOTONES[0].length; i++) {
        let b = BOTONES[j][i];

        if (b) {
          if (b.titulo) {
            getSketch().fill(0);
            getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
            getSketch().textSize(buttonTextSize);
            getSketch().noStroke();
            getSketch().text(
              b.titulo,
              buttonPadding + i * buttonW + i * buttonSpacing + buttonTextPadding,
              buttonPadding + j * buttonH + j * buttonSpacing + buttonTextPadding
            );
          }

          if (b.value) {
            getSketch().fill(255);
            getSketch().strokeWeight(this.botonActivo != undefined && this.botonActivo.value == b.value ? 2 : 0);
            getSketch().stroke(0);
            getSketch().rect(
              buttonPadding + i * buttonW + i * buttonSpacing,
              buttonPadding + j * buttonH + j * buttonSpacing,
              buttonW,
              buttonH
            );
            getSketch().fill(0);
            getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
            getSketch().textSize(buttonTextSize);
            getSketch().noStroke();
            getSketch().text(
              b.texto,
              buttonPadding + i * buttonW + i * buttonSpacing + buttonTextPadding,
              buttonPadding + j * buttonH + j * buttonSpacing + buttonTextPadding
            );

            getSketch().text(
              b.cantidad || 0,
              buttonPadding + i * buttonW + i * buttonSpacing + buttonTextPadding + buttonW - 30,
              buttonPadding + j * buttonH + j * buttonSpacing + buttonTextPadding
            );
          }
        }
      }
    }
  }
}
