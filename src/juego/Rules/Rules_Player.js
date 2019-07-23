import { getSketch } from "../_sketch";
import State from "../_state";
import Parametros from "../_parametros";

//Pisos
import PisoAgua from "../Piso/agua";
import Flor from "../Flor";
import Arbol from "../Arbol";
import Nieve from "../Nieve";

import { Hacha, Pico, Pala } from "../Player";
import Arbusto from "../Arbusto";
import Piedra from "../Piedra";
import Oro from "../Oro";

//Rules
import Rules_Mapa from "../Rules/Rules_Mapa";
import Rules_Juego from "../Rules/Rules_Juego";

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

    try {
      let resultado = element.golpear();
      if (resultado == false) return;
    } catch (ex) {}

    //Verifico que sea rompible
    if (element.rompible == false) {
      console.log("El objeto no se puede romper", element);
      return;
    }

    let poder = 0.5;

    //Leñador
    if (arma instanceof Hacha && element instanceof Arbol) {
      poder = 1 + 0.5 * player.nivelLeñador;
    }

    //Jardinero
    if (arma instanceof Pala && (element instanceof Arbusto || element instanceof Flor || element instanceof Nieve)) {
      poder = 1 + 0.5 * player.nivelJardinero;
    }

    //Minero
    if (arma instanceof Pico && (element instanceof Piedra || element instanceof Oro)) {
      poder = 1 + 0.5 * player.nivelMinero;
    }

    //
    console.log("Porder de golpe", poder);
    player.setPoderGolpe(poder);

    element.vida -= poder;
    if (element.vida < 0) element.vida = 0;
    if (element.vida == 0) {
      item.items = item.items.slice(0, item.items.length - 1);

      if (element instanceof Arbol) {
        if (element.recompensa != 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} madera`);
        if (element.recompensa == 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} madera`);
        player.subirPuntoLeñador();
        return;
      }

      if (element instanceof Flor) {
        if (element.recompensa != 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} flores`);
        if (element.recompensa == 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} flor`);
        player.subirPuntoJardinero();
        return;
      }

      if (element instanceof Arbusto) {
        if (element.recompensa != 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} bayas`);
        if (element.recompensa == 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} baya`);
        player.subirPuntoJardinero();
        return;
      }

      if (element instanceof Piedra) {
        if (element.recompensa != 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} piedras`);
        if (element.recompensa == 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} piedra`);
        player.subirPuntoMinero();
        return;
      }

      if (element instanceof Oro) {
        if (element.recompensa != 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} oro`);
        if (element.recompensa == 1) Rules_Juego.nuevoMensaje(`+${element.recompensa} oro`);
        player.subirPuntoMinero();
        return;
      }
    }
  }
};

export default metodos;
