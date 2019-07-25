import { getSketch } from "_sketch";
import State from "_state";
import Parametros from "_parametros";

//Pisos
import PisoAgua from "../juego/piso/agua";
import Flor from "../juego/flor";
import Arbol from "../juego/arbol";
import Nieve from "../juego/nieve";
import Palo from "../juego/palo";

import { Hacha, Pico, Pala } from "../juego/player";
import Arbusto from "../juego/arbusto";
import Piedra from "../juego/piedra";
import Oro from "../juego/oro";

//rules
import Rules_Mapa from "../rules/Rules_Mapa";
import Rules_Juego from "../rules/Rules_Juego";

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
    State.player.dir = "d";
    State.player.dirContador = 0;
  },
  isNadando: () => {
    return State.itemMapa instanceof PisoAgua && State.itemMapa.profundidad > 1;
  },
  mover: dir => {
    if (this.timerMover != undefined) {
      clearInterval(this.timerMover);
    }

    this.timerMover = setInterval(() => {
      metodos.mover(dir);
    }, 100);

    const player = State.player;
    const mapaRows = Parametros.mapaRows;
    const mapaCols = Parametros.mapaCols;

    if (player.dir != dir) {
      player.setDireccion(dir);
      return;
    }

    let offsetX_Nuevo = 0;
    let offsetY_Nuevo = 0;
    if (dir == "l") offsetX_Nuevo--;
    if (dir == "r") offsetX_Nuevo++;
    if (dir == "u") offsetY_Nuevo--;
    if (dir == "d") offsetY_Nuevo++;

    let posNueva = getSketch().createVector(player.pos.x, player.pos.y);
    posNueva.x += offsetX_Nuevo;
    posNueva.y += offsetY_Nuevo;

    if (posNueva.x < 0 || posNueva.y < 0 || posNueva.x >= mapaRows || posNueva.y >= mapaCols) {
      metodos.dejarDeMover();
      console.log("Estoy saliendo del mapa");
      return;
    }

    let m = State.mapa[posNueva.x][posNueva.y];
    if (m.bloqueaElPaso()) {
      metodos.dejarDeMover();
      console.log("Hay un bloque que me obstruye el paso");
      return;
    }

    // let monstruosEnPosNueva = _.filter(State.monstruosVisibles, monstruo => {
    //   return monstruo.i == posNueva.x && monstruo.j == posNueva.y && monstruo.muerto == false;
    // });
    // if (monstruosEnPosNueva.length != 0) {
    //   console.log("Hay un monstruo que me obstruye el paso");
    //   return;
    // }

    State.offsetX += offsetX_Nuevo;
    State.offsetY += offsetY_Nuevo;
    State.itemMapa = m;
    player.mover(metodos.calcularPosicion());

    //Hambre
    player.sumarHambre();

    //Oxigeno
    let profundidad = State.itemMapa.bioma.profundidad || 1;
    if (profundidad != 1) {
      player.subirPuntoNadador();
      player.restarOxigeno();
    } else {
      player.subirPuntoCorredor();
      player.restaurarOxigeno();
    }

    //Mapa
    Rules_Mapa.crearMapa();
  },
  dejarDeMover: () => {
    if (this.timerMover != undefined) {
      clearInterval(this.timerMover);
    }

    const player = State.player;
    player.dejarDeMover();
  },
  golpear: () => {
    const player = State.player;
    if (player.puedeGolpear == false) return;

    player.moverBrazo();
    player.sumarHambre();

    const pos = player.pos;
    let item;
    let posMirando;

    switch (player.dir) {
      case "l":
        {
          if (pos.x == 0) return;
          item = State.mapa[pos.x - 1][pos.y];
          posMirando = getSketch().createVector(pos.x - 1, pos.y);
        }
        break;
      case "r":
        {
          if (pos.x == State.mapa.length - 1) return;
          item = State.mapa[pos.x + 1][pos.y];
          posMirando = getSketch().createVector(pos.x + 1, pos.y);
        }
        break;
      case "u":
        {
          if (pos.y == 0) return;
          item = State.mapa[pos.x][pos.y - 1];
          posMirando = getSketch().createVector(pos.x, pos.y - 1);
        }
        break;

      case "d":
        {
          if (pos.y == State.mapa.length - 1) return;
          item = State.mapa[pos.x][pos.y + 1];
          posMirando = getSketch().createVector(pos.x, pos.y + 1);
        }
        break;
    }

    //Item
    if (item.items == undefined || item.items.length == 0) {
      player.setPoderGolpe(poder);
      return;
    }

    const arma = player.arma;
    const element = item.items[item.items.length - 1];

    let poder = 0.5;

    //Leñador
    if (arma instanceof Hacha && element instanceof Arbol) {
      poder = 1 + 0.5 * player.nivelLeñador;
    }

    //Jardinero
    if (
      arma instanceof Pala &&
      (element instanceof Arbusto || element instanceof Flor || element instanceof Nieve || element instanceof Palo)
    ) {
      poder = 1 + 0.5 * player.nivelJardinero;
    }

    //Minero
    if (arma instanceof Pico && (element instanceof Piedra || element instanceof Oro)) {
      poder = 1 + 0.5 * player.nivelMinero;
    }

    //
    console.log("Porder de golpe", poder);
    player.setPoderGolpe(poder);

    //Hago el golpe
    Rules_Juego.onItemGolpeado(item, element, poder);
    let resultado = element.golpear(poder);
    if (resultado != true) return;

    //Destruyo el item
    item.items = item.items.slice(0, item.items.length - 1);
    Rules_Juego.onItemDestruido(item, element);
  }
};

export default metodos;
