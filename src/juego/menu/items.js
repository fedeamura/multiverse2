import { getSketch } from "_sketch";
import State from "_state";
import Constantes from "_constantes";
import Item from "./item";

const BOTONES = [
  //Madera
  [{ titulo: "Construccion" }, {}, {}],
  [
    //Madera
    { texto: "Madera", value: Constantes.ITEM_MADERA, tipo: Constantes.TIPO_ITEM_CONSTRUCCCION },
    //Palo
    { texto: "Palo", value: Constantes.ITEM_PALO, tipo: Constantes.TIPO_ITEM_CONSTRUCCCION },
    //Tabla
    { texto: "Tabla", value: Constantes.ITEM_TABLA, tipo: Constantes.TIPO_ITEM_CONSTRUCCCION }
  ],
  [
    //Muro
    { texto: "Muro", value: Constantes.ITEM_MURO, tipo: Constantes.TIPO_ITEM_CONSTRUCCCION },
    {},
    {}
  ],
  //Comida
  [{ titulo: "Comida" }, {}, {}],
  [
    //Manzana
    { texto: "Manzana", value: Constantes.ITEM_MANZANA, tipo: Constantes.ITEM_TIPO_COMIDA },
    //Baya roja
    { texto: "Baya roja", value: Constantes.ITEM_BAYA_ROJA, tipo: Constantes.ITEM_TIPO_COMIDA },
    //Baya azul
    { texto: "Baya azul", value: Constantes.ITEM_BAYA_AZUL, tipo: Constantes.ITEM_TIPO_COMIDA }
  ],
  [
    //Baya violeta
    { texto: "Baya violeta", value: Constantes.ITEM_BAYA_VIOLETA, tipo: Constantes.ITEM_TIPO_COMIDA },
    {},
    {}
  ],
  //Mineria
  [{ titulo: "Mineria" }, {}, {}],
  [
    //Piedra
    { texto: "Piedra", value: Constantes.ITEM_PIEDRA, tipo: Constantes.ITEM_TIPO_MINERIA },
    //Oro
    { texto: "Oro", value: Constantes.ITEM_ORO, tipo: Constantes.ITEM_TIPO_MINERIA },
    //Diamante
    { texto: "Diamante", value: Constantes.ITEM_DIAMANTE, tipo: Constantes.ITEM_TIPO_MINERIA }
  ],
  //Varios
  [{ titulo: "Varios" }, {}, {}],
  [
    //Flor azul
    { texto: "Flor azul", value: Constantes.ITEM_FLOR_AZUL, tipo: Constantes.ITEM_TIPO_VARIOS },
    //Flor roja
    { texto: "Flor roja", value: Constantes.ITEM_FLOR_ROJA, tipo: Constantes.ITEM_TIPO_VARIOS },
    //Flor violeta
    { texto: "Flor violeta", value: Constantes.ITEM_FLOR_VIOLETA, tipo: Constantes.ITEM_TIPO_VARIOS }
  ],
  [
    //Flor blanca
    { texto: "Flor blanca", value: Constantes.ITEM_FLOR_BLANCA, tipo: Constantes.ITEM_TIPO_VARIOS },
    //Flor amarilla
    { texto: "Flor amarilla", value: Constantes.ITEM_FLOR_AMARILLA, tipo: Constantes.ITEM_TIPO_VARIOS },
    //Nieve
    { texto: "Semilla de arbol", value: Constantes.ITEM_SEMILLA_ARBOL, tipo: Constantes.ITEM_TIPO_VARIOS }
  ],
  [
    //Nieve
    { texto: "Nieve", value: Constantes.ITEM_NIEVE, tipo: Constantes.ITEM_TIPO_VARIOS },
    {},
    {}
  ]
];

export default class Menu {
  constructor() {
    this.visible = true;

    this.botonActivo = undefined;
    this.itemSeleccionado = undefined;

    this.cargarCantidades();
  }

  cargarCantidades() {
    for (let j = 0; j < BOTONES.length; j++) {
      for (let i = 0; i < BOTONES[0].length; i++) {
        let b = BOTONES[j][i];

        if (b && b.value) {
          switch (b.value) {
            case Constantes.ITEM_MADERA:
              {
                b.cantidad = State.items.madera;
              }
              break;

            case Constantes.ITEM_PALO:
              {
                b.cantidad = State.items.palo;
              }
              break;

            case Constantes.ITEM_TABLA:
              {
                b.cantidad = State.items.tabla;
              }
              break;

            case Constantes.ITEM_MURO:
              {
                b.cantidad = State.items.muro;
              }
              break;

            case Constantes.ITEM_MANZANA:
              {
                b.cantidad = State.items.manzana;
              }
              break;

            case Constantes.ITEM_BAYA_ROJA:
              {
                b.cantidad = State.items.bayaRoja;
              }
              break;

            case Constantes.ITEM_BAYA_AZUL:
              {
                b.cantidad = State.items.bayaAzul;
              }
              break;

            case Constantes.ITEM_BAYA_VIOLETA:
              {
                b.cantidad = State.items.bayaVioleta;
              }
              break;

            case Constantes.ITEM_PIEDRA:
              {
                b.cantidad = State.items.piedra;
              }
              break;

            case Constantes.ITEM_ORO:
              {
                b.cantidad = State.items.oro;
              }
              break;

            case Constantes.ITEM_DIAMANTE:
              {
                b.cantidad = State.items.diamante;
              }
              break;

            case Constantes.ITEM_FLOR_AZUL:
              {
                b.cantidad = State.items.florAzul;
              }
              break;

            case Constantes.ITEM_FLOR_ROJA:
              {
                b.cantidad = State.items.florRoja;
              }
              break;

            case Constantes.ITEM_FLOR_VIOLETA:
              {
                b.cantidad = State.items.florVioleta;
              }
              break;
            case Constantes.ITEM_FLOR_AMARILLA:
              {
                b.cantidad = State.items.florAmarilla;
              }
              break;

            case Constantes.ITEM_FLOR_BLANCA:
              {
                b.cantidad = State.items.florBlanca;
              }
              break;

            case Constantes.ITEM_SEMILLA_ARBOL:
              {
                b.cantidad = State.items.semillaArbol;
              }
              break;

            case Constantes.ITEM_NIEVE:
              {
                b.cantidad = State.items.nieve;
              }
              break;
          }
        }
      }
    }
  }

  keyPressed(key) {
    if (key == "Escape") {
      if (this.itemSeleccionado) {
        this.cargarCantidades();
        this.itemSeleccionado = undefined;
        return;
      }

      State.menu.submenu = undefined;
      return;
    }

    if (this.itemSeleccionado) {
      this.itemSeleccionado.keyPressed(key);
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
    this.itemSeleccionado = new Item(this.botonActivo);
  }

  draw() {
    if (this.itemSeleccionado) {
      this.itemSeleccionado.draw();
      return;
    }

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
            getSketch().text(b.titulo, buttonPadding + i * buttonW + i * buttonSpacing + buttonTextPadding, buttonPadding + j * buttonH + j * buttonSpacing + buttonTextPadding);
          }

          if (b.value) {
            getSketch().fill(255);
            getSketch().strokeWeight(this.botonActivo != undefined && this.botonActivo.value == b.value ? 2 : 0);
            getSketch().stroke(0);
            getSketch().rect(buttonPadding + i * buttonW + i * buttonSpacing, buttonPadding + j * buttonH + j * buttonSpacing, buttonW, buttonH);
            getSketch().fill(0);
            getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
            getSketch().textSize(buttonTextSize);
            getSketch().noStroke();
            getSketch().text(b.texto, buttonPadding + i * buttonW + i * buttonSpacing + buttonTextPadding, buttonPadding + j * buttonH + j * buttonSpacing + buttonTextPadding);

            getSketch().text(b.cantidad || 0, buttonPadding + i * buttonW + i * buttonSpacing + buttonTextPadding + buttonW - 30, buttonPadding + j * buttonH + j * buttonSpacing + buttonTextPadding);
          }
        }
      }
    }
  }
}
