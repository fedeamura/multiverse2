import { getSketch } from "../_sketch";
import State from "../_state";
import Parametros from "../_parametros";

//Pisos
import PisoAgua from "../Piso/agua";

const metodos = {
  calcularPosicion: () => {
    const offsetX = State.offsetX;
    const canvasRows = Parametros.canvasRows;
    const mapaRows = Parametros.mapaRows;
    const difRows = mapaRows - canvasRows;

    const offsetY = State.offsetY;
    const canvasCols = Parametros.canvasCols;
    const mapaCols = Parametros.mapaCols;
    const difCols = mapaCols - canvasCols;

    return getSketch().createVector(
      offsetX + getSketch().floor((canvasRows + difRows) / 2),
      offsetY + getSketch().floor((canvasCols + difCols) / 2)
    );
  },
  reiniciarPosicion: () => {
    State.offsetX = 0;
    State.offsetY = 0;
    State.player.pos = metodos.calcularPosicion();
    State.itemMapa = State.mapa[State.player.pos.x][State.player.pos.y];
    State.player.nadando = metodos.isNadando();
  },
  isNadando: () => {
    return State.itemMapa instanceof PisoAgua && State.itemMapa.profundidad > 1;
  }
};

export default metodos;
