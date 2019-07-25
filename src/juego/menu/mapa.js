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

      getSketch().loadPixels();
      for (let y = 0; y < Parametros.mapaRows; y++) {
        for (let x = 0; x < Parametros.mapaRows; x++) {
          try {
            let item = State.mapa[x][y];
            const color = item.color;

            const index = (x + y * getSketch().width) * 4;

            getSketch().pixels[index + 0] = color.levels[0];
            getSketch().pixels[index + 1] = color.levels[1];
            getSketch().pixels[index + 2] = color.levels[2];
            getSketch().pixels[index + 3] = 255;
          } catch (ex) {}
        }
      }
      getSketch().updatePixels();
      // getSketch().fill(230);
      // getSketch().noStroke();
      // getSketch().rect(0, 0, getSketch().width, getSketch().height);

      // getSketch().push();
      // getSketch().translate((getSketch().width - Parametros.mapaRows) / 2, (getSketch().height - Parametros.mapaRows) / 2);

      // getSketch().noStroke();
      // for (let i = 0; i < Parametros.mapaRows; i++) {
      //   for (let j = 0; j < Parametros.mapaRows; j++) {
      //     try {
      //       let item = State.mapa[i][j];
      //       if (item != undefined) {
      //         getSketch().fill(item.color);
      //       } else {
      //         getSketch().fill(255);
      //       }

      //       getSketch().rect(i, j, 1, 1);
      //     } catch (ex) {
      //       getSketch().fill(255);
      //       getSketch().rect(i, j, 1, 1);
      //     }
      //   }
      // }
    }
  }
}
