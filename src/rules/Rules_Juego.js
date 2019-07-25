import { getSketch } from "_sketch";
import State from "_state";

import Arbusto from "../juego/arbusto";
import Piedra from "../juego/piedra";
import Oro from "../juego/oro";
import Flor from "../juego/flor";
import Arbol from "../juego/arbol";
import Nieve from "../juego/nieve";
import Palo from "../juego/palo";

const metodos = {
  nuevoMensaje: mensaje => {
    if (this.timeoutMensaje) clearTimeout(this.timeoutMensaje);
    State.mensaje = mensaje;
    this.timeoutMensaje = setTimeout(() => {
      State.mensaje = undefined;
    }, 5000);
  },
  onItemGolpeado: (piso, item, poder) => {},
  onItemDestruido: (piso, item) => {
    const player = State.player;

    // Arbol
    if (item instanceof Arbol) {
      if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} madera`);
      if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} madera`);
      player.subirPuntoLeñador();
      //Guardo
      State.items.madera += item.recompensa;
      return;
    }
    //Flor
    if (item instanceof Flor) {
      player.subirPuntoJardinero();
      switch (item.color) {
        case "azul":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} flores azules`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} flor azul`);
            State.items.florAzul += item.recompensa;
          }
          break;
        case "roja":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} flores rojas`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} flor roja`);
            State.items.florRoja += item.recompensa;
          }
          break;
        case "violeta":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} flores violetas`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} flor violeta`);
            State.items.florVioleta += item.recompensa;
          }
          break;
        case "blanca":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} flores blancas`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} flor blanca`);
            State.items.florBlanca += item.recompensa;
          }
          break;
        case "amarilla":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} flores amarillas`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} flor amarilla`);
            State.items.florAmarilla += item.recompensa;
          }
          break;
      }
      return;
    }
    //Arbusto
    if (item instanceof Arbusto) {
      player.subirPuntoJardinero();
      switch (item.color) {
        case "rojo":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} bayas rojas`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} baya roja`);
            State.items.bayaRoja += item.recompensa;
          }
          break;
        case "azul":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} bayas azules`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} baya azul`);
            State.items.bayaAzul += item.recompensa;
          }
          break;
        case "violeta":
          {
            if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} bayas violetas`);
            if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} baya violeta`);
            State.items.bayaVioleta += item.recompensa;
          }
          break;
      }
      return;
    }
    //Piedra
    if (item instanceof Piedra) {
      if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} piedras`);
      if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} piedra`);
      player.subirPuntoMinero();
      //Guardo
      State.items.piedra += item.recompensa;
      return;
    }
    //Oro
    if (item instanceof Oro) {
      if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} oro`);
      if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} oro`);
      player.subirPuntoMinero();
      //Guardo
      State.items.oro += item.recompensa;
      return;
    }

    //Nieve
    if (item instanceof Nieve) {
      if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} nieve`);
      if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} nieve`);
      player.subirPuntoJardinero();
      //Guardo
      State.items.nieve += item.recompensa;
      return;
    }

    //Palo
    if (item instanceof Palo) {
      if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} palos`);
      if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} palo`);
      player.subirPuntoJardinero();
      //Guardo
      State.items.palo += item.recompensa;
      return;
    }
  }
};

export default metodos;
