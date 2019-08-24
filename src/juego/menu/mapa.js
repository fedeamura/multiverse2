import { getSketch } from "_sketch";
import Parametros from "_parametros";
import State from "_state";
import Colores from "_colores";
import Recursos from "_recursos";

export default class Mapa {
  constructor() {
    this.dibujado = false;
  }

  keyPressed(key) {
    if (key == "Escape") {
      State.menu.submenu = undefined;
      return;
    }
  }

  draw() {
    if (this.dibujado == false) {
      this.dibujado = true;
      const strokeWeight = 4;
      getSketch().fill(255);
      getSketch().stroke(200);
      getSketch().strokeWeight(strokeWeight);
      getSketch().rect(strokeWeight / 2, strokeWeight / 2, getSketch().width - strokeWeight, getSketch().height - strokeWeight);

      getSketch().push();
      getSketch().translate((getSketch().width - Parametros.mapaRows) / 2, (getSketch().height - Parametros.mapaRows) / 2);

      for (let i = 0; i < Parametros.mapaRows; i++) {
        for (let j = 0; j < Parametros.mapaRows; j++) {
          try {
            let item = State.mapa[i][j];
            if (item != undefined) {
              getSketch().stroke(item.color);
            } else {
              getSketch().stroke(255);
            }
          } catch (ex) {
            getSketch().stroke(255);
          }

          getSketch().point(i, j);
        }
      }
    }
  }
}
