import { getSketch } from "_sketch";
import State from "_state";
import Parametros from "_parametros";
import Constantes from "_constantes";

//Pisos
import PisoAgua from "juego/piso/agua";
import PisoBase from "juego/piso/base";

import { Hacha, Pico, Pala } from "juego/player";
import Arbusto from "juego/arbusto";
import Palo from "juego/palo";
import Flor from "juego/flor";
import Arbol from "juego/arbol";
import Nieve from "juego/nieve";
import Piedra from "juego/piedra";
import Oro from "juego/oro";
import Diamante from "juego/diamante";
import Tabla from "juego/tabla";
import SemillaArbol from "juego/semillaArbol";
import Muro from "juego/muro";

//rules
import Rules_Mapa from "rules/Rules_Mapa";
import Rules_Juego from "rules/Rules_Juego";

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
    let pos = metodos.calcularPosicion();
    State.player.x = pos.x;
    State.player.y = pos.y;
    State.player.dir = "d";
    State.player.dirContador = 0;
  },
  isNadando: () => {
    let item = State.itemMapa;
    if (item == undefined) return false;
    if (!(item instanceof PisoAgua)) return false;
    if (item.profundidad <= 1) return false;

    let tieneTabla = false;
    (item.items || []).forEach(element => {
      if (element instanceof Tabla) {
        tieneTabla = true;
      }
    });

    if (tieneTabla) return false;
    return true;
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

    let posNueva = getSketch().createVector(player.x, player.y);
    posNueva.x += offsetX_Nuevo;
    posNueva.y += offsetY_Nuevo;

    if (posNueva.x < 0 || posNueva.y < 0 || posNueva.x >= mapaRows || posNueva.y >= mapaCols) {
      metodos.dejarDeMover();
      console.log("Estoy saliendo del mapa");
      return;
    }

    let chunk = Rules_Mapa.getChunkActual(posNueva.x, posNueva.y);
    let pos = Rules_Mapa.getPosicionEnChunk(posNueva.x, posNueva.y);
    let m = State.chunks["" + chunk][pos.i][pos.j];
    if (m.bloqueaElPaso()) {
      metodos.dejarDeMover();
      console.log("Hay un bloque que me obstruye el paso");
      return;
    }

    State.offsetX += offsetX_Nuevo;
    State.offsetY += offsetY_Nuevo;
    State.itemMapa = m;
    player.mover(metodos.calcularPosicion());

    //Hambre
    player.sumarHambre();

    //Oxigeno
    let nadando = metodos.isNadando();
    if (nadando == true) {
      player.subirPuntoNadador();
      player.restarOxigeno();
    } else {
      player.subirPuntoCorredor();
      player.restaurarOxigeno();
    }

    //Mapa

    Rules_Juego.onMovido();
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
    if (metodos.isNadando() == true) return;

    //Si es item equipado
    if (player.itemEquipadoSeleccionado == true) {
      metodos.colocarItem(player.itemEquipado);
      return;
    }

    player.moverBrazo();
    player.sumarHambre();

    const posX = player.x;
    const posY = player.y;
    let item;
    let posMirando;

    switch (player.dir) {
      case "l":
        {
          if (posX == 0) return;
          let chunk = Rules_Mapa.getChunkActual(posX - 1, posY);
          let pos = Rules_Mapa.getPosicionEnChunk(posX - 1, posY);
          item = State.chunks["" + chunk][pos.i][pos.j];
          posMirando = getSketch().createVector(posX - 1, posY);
        }
        break;
      case "r":
        {
          if (posX == Parametros.mapaRows - 1) return;
          let chunk = Rules_Mapa.getChunkActual(posX + 1, posY);
          let pos = Rules_Mapa.getPosicionEnChunk(posX + 1, posY);
          item = State.chunks["" + chunk][pos.i][pos.j];

          posMirando = getSketch().createVector(posX + 1, posY);
        }
        break;
      case "u":
        {
          if (posY == 0) return;
          let chunk = Rules_Mapa.getChunkActual(posX, posY - 1);
          let pos = Rules_Mapa.getPosicionEnChunk(posX, posY - 1);
          item = State.chunks["" + chunk][pos.i][pos.j];

          posMirando = getSketch().createVector(posX, posY - 1);
        }
        break;

      case "d":
        {
          if (posY == Parametros.mapaRows - 1) return;
          let chunk = Rules_Mapa.getChunkActual(posX, posY + 1);
          let pos = Rules_Mapa.getPosicionEnChunk(posX, posY + 1);
          item = State.chunks["" + chunk][pos.i][pos.j];

          posMirando = getSketch().createVector(posX, posY + 1);
        }
        break;
    }

    const arma = player.arma;

    //Cavo (para hundir)
    if (
      item.puedeHundir == true &&
      item.hundido != true &&
      (item.items || [].length) == 0 &&
      arma instanceof Pala &&
      !(item instanceof PisoAgua) &&
      !(item instanceof PisoBase)
    ) {
      if (item.golpesHundir > 0) {
        item.golpesHundir -= 1;
      }

      if (item.golpesHundir == 0) {
        item.hundido = true;
      }
      return;
    }

    //Si no hay items
    if (item.items == undefined || item.items.length == 0) return;

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
    if (arma instanceof Pico && (element instanceof Piedra || element instanceof Oro || element instanceof Diamante)) {
      poder = 1 + 0.5 * player.nivelMinero;
    }

    //
    console.log("Porder de golpe", poder);

    //Hago el golpe
    Rules_Juego.onItemGolpeado(item, element, poder);
    let resultado = element.golpear(poder);
    if (resultado != true) return;

    //Destruyo el item
    item.items = item.items.slice(0, item.items.length - 1);
    Rules_Juego.onItemDestruido(item, element);
  },
  getItemMirando: () => {
    const player = State.player;

    const posX = player.x;
    const posY = player.y;

    let item;

    switch (player.dir) {
      case "l":
        {
          if (posX == 0) return;
          let chunk = Rules_Mapa.getChunkActual(posX - 1, posY);
          let pos = Rules_Mapa.getPosicionEnChunk(posX - 1, posY);
          item = State.chunks["" + chunk][pos.i][pos.j];
        }
        break;
      case "r":
        {
          if (posX == Parametros.mapaRows - 1) return;
          let chunk = Rules_Mapa.getChunkActual(posX + 1, posY);
          let pos = Rules_Mapa.getPosicionEnChunk(posX + 1, posY);
          item = State.chunks["" + chunk][pos.i][pos.j];
        }
        break;
      case "u":
        {
          if (posY == 0) return;
          let chunk = Rules_Mapa.getChunkActual(posX, posY - 1);
          let pos = Rules_Mapa.getPosicionEnChunk(posX, posY - 1);
          item = State.chunks["" + chunk][pos.i][pos.j];
        }
        break;

      case "d":
        {
          if (posY == Parametros.mapaRows - 1) return;
          let chunk = Rules_Mapa.getChunkActual(posX, posY + 1);
          let pos = Rules_Mapa.getPosicionEnChunk(posX, posY + 1);
          item = State.chunks["" + chunk][pos.i][pos.j];
        }
        break;
    }

    return item;
  },
  equiparItem: item => {
    switch (item) {
      case Constantes.ITEM_TABLA:
        {
          if (State.items.tabla == 0) {
            Rules_Juego.nuevoMensaje("No tiene tablas");
            return;
          }

          State.player.itemEquipadoEntity = new Tabla();
          State.player.itemEquipado = item;
          State.player.itemEquipadoSeleccionado = true;
          Rules_Juego.nuevoMensaje("Tabla equipada");
        }
        break;

      case Constantes.ITEM_MURO:
        {
          if (State.items.muro == 0) {
            Rules_Juego.nuevoMensaje("No tiene muros");
            return;
          }

          State.player.itemEquipadoEntity = new Muro();
          State.player.itemEquipado = item;
          State.player.itemEquipadoSeleccionado = true;
          Rules_Juego.nuevoMensaje("Muro equipada");
        }
        break;

      case Constantes.ITEM_SEMILLA_ARBOL:
        {
          if (State.items.semillaArbol == 0) {
            Rules_Juego.nuevoMensaje("No tiene semillas");
            return;
          }

          State.player.itemEquipadoEntity = new SemillaArbol();
          State.player.itemEquipado = item;
          State.player.itemEquipadoSeleccionado = true;
          Rules_Juego.nuevoMensaje("Semillas equipadas");
        }
        break;
    }
  },
  colocarItem: item => {
    if (metodos.isNadando() == true) {
      Rules_Juego.nuevoMensaje("No puede colocar items mientras está nadando");
      return;
    }

    let itemMirando = metodos.getItemMirando();
    if (itemMirando == undefined) {
      Rules_Juego.nuevoMensaje("No se puede colocar el item");
      return;
    }

    if (itemMirando.items != undefined && itemMirando.items.length != 0) {
      Rules_Juego.nuevoMensaje("El terreno no esta libre");
      return;
    }

    switch (item) {
      case Constantes.ITEM_TABLA:
        {
          if (State.items.tabla == 0) {
            Rules_Juego.nuevoMensaje("No tiene tablas");
            return;
          }

          State.items.tabla -= 1;
          itemMirando.items.push(new Tabla());

          Rules_Juego.nuevoMensaje("Tabla colocada");
        }
        break;

      case Constantes.ITEM_MURO:
        {
          if (State.items.muro == 0) {
            Rules_Juego.nuevoMensaje("No tiene muros");
            return;
          }

          State.items.muro -= 1;
          itemMirando.items.push(new Muro());

          Rules_Juego.nuevoMensaje("Muro colocado");
        }
        break;

      case Constantes.ITEM_SEMILLA_ARBOL:
        {
          if (itemMirando.hundido != true) {
            Rules_Juego.nuevoMensaje("Terreno no hundido");
            return;
          }

          if (State.items.semillaArbol == 0) {
            Rules_Juego.nuevoMensaje("No tiene semillas de arbol");
            return;
          }

          var s = new SemillaArbol(itemMirando);
          State.items.semillaArbol -= 1;
          itemMirando.items.push(s);

          State.semillasArbol.push(s);
          Rules_Juego.nuevoMensaje("Semilla colocada");
        }
        break;
    }
  },
  comer: item => {
    console.log("Por comer", item);
    const player = State.player;

    switch (item) {
      case Constantes.ITEM_MANZANA:
        {
          if (State.items.manzana == 0) {
            Rules_Juego.nuevoMensaje("No tiene ninguna manzana");
            return;
          }

          if (player.hambre == player.hambreMaxima) {
            Rules_Juego.nuevoMensaje("No tiene nada de hambre");
            return;
          }

          State.items.manzana -= 1;

          const cantidad = 10;
          console.log("Como manzana " + cantidad);
          player.restaurarHambre(cantidad);
          Rules_Juego.onItemComido(item, cantidad);
        }
        break;

      case Constantes.ITEM_BAYA_ROJA:
        {
          if (State.items.bayaRoja == 0) {
            Rules_Juego.nuevoMensaje("No tiene ninguna baya roja");
            return;
          }

          if (player.hambre == player.hambreMaxima) {
            Rules_Juego.nuevoMensaje("No tiene nada de hambre");
            return;
          }

          State.items.bayaRoja -= 1;

          const cantidad = 5;
          console.log("Como Baya " + cantidad);

          player.restaurarHambre(cantidad);
          Rules_Juego.onItemComido(item, cantidad);
        }
        break;

      case Constantes.ITEM_BAYA_AZUL:
        {
          if (State.items.bayaAzul == 0) {
            Rules_Juego.nuevoMensaje("No tiene ninguna baya azul");
            return;
          }

          if (player.hambre == player.hambreMaxima) {
            Rules_Juego.nuevoMensaje("No tiene nada de hambre");
            return;
          }

          State.items.bayaAzul -= 1;

          const cantidad = 5;
          console.log("Como Baya " + cantidad);

          player.restaurarHambre(cantidad);
          Rules_Juego.onItemComido(item, cantidad);
        }
        break;

      case Constantes.ITEM_BAYA_VIOLETA:
        {
          if (State.items.bayaVioleta == 0) {
            Rules_Juego.nuevoMensaje("No tiene ninguna baya violeta");
            return;
          }

          if (player.hambre == player.hambreMaxima) {
            Rules_Juego.nuevoMensaje("No tiene nada de hambre");
            return;
          }

          State.items.bayaVioleta -= 1;

          const cantidad = 5;
          console.log("Como Baya " + cantidad);

          player.restaurarHambre(cantidad);
          Rules_Juego.onItemComido(item, cantidad);
        }
        break;
    }
  }
};

export default metodos;
