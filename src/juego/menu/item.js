import { getSketch } from "_sketch";
import Constantes from "_constantes";

//Rules
import Rules_Player from "rules/Rules_Player";

export default class Item {
  constructor(item) {
    this.visible = true;
    this.item = item;

    this.botones = [];

    let bb = [];
    let b = [];

    const itemsColocar = [Constantes.ITEM_TABLA, Constantes.ITEM_SEMILLA_ARBOL, Constantes.ITEM_MURO];
    const itemsEquipar = [Constantes.ITEM_TABLA, Constantes.ITEM_SEMILLA_ARBOL, Constantes.ITEM_MURO];

    //Comer
    if (item.tipo == Constantes.ITEM_TIPO_COMIDA) {
      if (b.length == 3) {
        bb.push(b);
        b = [];
      }
      b.push({ texto: "Comer", value: Constantes.ITEM_BOTON_COMER });
    }

    //Colocar
    if (itemsColocar.indexOf(item.value) != -1) {
      if (b.length == 3) {
        bb.push(b);
        b = [];
      }
      b.push({ texto: "Colocar", value: Constantes.ITEM_BOTON_COLOCAR });
    }

    //Equipar
    if (itemsEquipar.indexOf(item.value) != -1) {
      if (b.length == 3) {
        bb.push(b);
        b = [];
      }
      b.push({ texto: "Equipar", value: Constantes.ITEM_BOTON_EQUIPAR });
    }

    if (b.length != 0) {
      let faltantes = 3 - b.length;
      for (let i = 0; i < faltantes; i++) {
        b.push({});
      }

      bb.push(b);
    }

    if (bb.length != 0) {
      this.botones.push([{ titulo: "Acciones" }, {}, {}]);
      bb.forEach(item => {
        this.botones.push(item);
      });
    }
  }

  keyPressed(key) {
    if (key == " " || key == "Enter") {
      this.seleccionar();
      return;
    }

    if (key == "ArrowLeft") {
      if (this.botones.length == 0) return;
      const pos = this.moverIzquierda();
      this.botonActivo = this.botones[pos.j][pos.i];
      return;
    }

    if (key == "ArrowRight") {
      if (this.botones.length == 0) return;
      const pos = this.moverDerecha();
      this.botonActivo = this.botones[pos.j][pos.i];
      return;
    }

    if (key == "ArrowDown") {
      if (this.botones.length == 0) return;
      const pos = this.moverAbajo();
      this.botonActivo = this.botones[pos.j][pos.i];
      return;
    }

    if (key == "ArrowUp") {
      if (this.botones.length == 0) return;
      const pos = this.moverArriba();
      this.botonActivo = this.botones[pos.j][pos.i];
      return;
    }
  }

  moverDerecha() {
    let pos = this.buscarIndice();
    pos.i++;
    if (pos.i < 0) pos.i = 0;
    if (pos.j < 0) pos.j = 0;

    try {
      let b = this.botones[pos.j][pos.i];
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
      let b = this.botones[pos.j][pos.i];
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
      let b = this.botones[pos.j][pos.i];
      if (b == undefined) {
        pos = posOriginal;
      } else {
        let esTitulo = this.botones[pos.j][0].titulo != undefined;
        if (esTitulo) {
          pos.j++;
        } else {
          if (b.value == undefined) {
            pos = posOriginal;
          }
        }

        b = this.botones[pos.j][pos.i];
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
      let b = this.botones[pos.j][pos.i];
      if (b == undefined) {
        pos.j++;
      } else {
        let esTitulo = this.botones[pos.j][0].titulo != undefined;
        if (esTitulo && pos.j != 0) {
          pos.j--;
        } else {
          if (b.value == undefined) {
            pos = posOriginal;
          }
        }
        b = this.botones[pos.j][pos.i];
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

    for (let j = 0; j < this.botones.length; j++) {
      for (let i = 0; i < this.botones[0].length; i++) {
        let b = this.botones[j][i];
        if (b.value == this.botonActivo.value) {
          return { i, j };
        }
      }
    }

    return { i: -1, j: -1 };
  }

  seleccionar() {
    if (this.botonActivo == undefined) return;

    if (this.botonActivo.value == Constantes.ITEM_BOTON_COMER) {
      Rules_Player.comer(this.item.value);
      return;
    }

    if (this.botonActivo.value == Constantes.ITEM_BOTON_COLOCAR) {
      Rules_Player.colocarItem(this.item.value);
      return;
    }

    if (this.botonActivo.value == Constantes.ITEM_BOTON_EQUIPAR) {
      Rules_Player.equiparItem(this.item.value);
      return;
    }
  }

  draw() {
    getSketch().fill(230);
    getSketch().noStroke();
    getSketch().rect(0, 0, getSketch().width, getSketch().height);

    //Acciones
    if (this.botones.length != 0) {
      const buttonPadding = 16;
      const buttonSpacing = 8;
      const buttonW = (getSketch().width - buttonPadding - buttonPadding - buttonSpacing * (this.botones[0].length - 1)) / this.botones[0].length;
      const buttonH = 20;
      const buttonTextSize = 10;
      const buttonTextPadding = (buttonH - buttonTextSize) / 2;

      for (let j = 0; j < this.botones.length; j++) {
        for (let i = 0; i < this.botones[0].length; i++) {
          let b = this.botones[j][i];

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

              // getSketch().text(
              //   b.cantidad || 0,
              //   buttonPadding + i * buttonW + i * buttonSpacing + buttonTextPadding + buttonW - 30,
              //   buttonPadding + j * buttonH + j * buttonSpacing + buttonTextPadding
              // );
            }
          }
        }
      }
    }
  }
}
