import { getSketch } from "_sketch";
import State from "_state";
import Constantes from "_constantes";

//Rules
import Rules_Mapa from "rules/Rules_Mapa";
import Rules_Player from "rules/Rules_Player";

//Items
import Arbusto from "juego/arbusto";
import Flor from "juego/flor";
import Arbol from "juego/arbol";
import Nieve from "juego/nieve";
import Palo from "juego/palo";

import Piedra from "juego/piedra";
import Oro from "juego/oro";
import Diamante from "juego/diamante";
import SemillaArbol from "juego/semillaArbol";

const metodos = {
  nuevoMensaje: mensaje => {
    if (this.timeoutMensaje) clearTimeout(this.timeoutMensaje);
    State.mensaje = mensaje;
    this.timeoutMensaje = setTimeout(() => {
      State.mensaje = undefined;
    }, 5000);
  },
  onMovido: () => {
    let dir = this.dir;
    if (dir == undefined) dir = true;

    if (dir == true) {
      State.hora += 60;
      if (State.hora >= 86400) {
        dir = false;
      }
    } else {
      State.hora -= 60;
      if (State.hora <= 0) {
        dir = true;
      }
    }

    this.dir = dir;

    //Hago crecer las semillas
    State.semillasArbol.forEach(semilla => {
      if (semilla.contador > 0) {
        semilla.contador -= 1;
      }
    });

    const nuevosArboles = [];
    const nuevasSemillas = [];
    State.semillasArbol.forEach(semilla => {
      if (semilla.contador != 0) {
        nuevasSemillas.push(semilla);
      } else {
        nuevosArboles.push(semilla);
      }
    });

    State.semillasArbol = nuevasSemillas;
    nuevosArboles.forEach(semilla => {
      semilla.item.hundido = false;
      semilla.item.golpesHundir = semilla.item.golpesHundirMaximo;
      semilla.item.items = [];
      semilla.item.items.push(new Arbol());
    });
  },
  onItemGolpeado: (piso, item, poder) => {},
  onItemDestruido: (piso, item) => {
    const player = State.player;

    //Semilla
    if (item instanceof SemillaArbol) {
      let nuevasSemillas = [];
      State.semillasArbol.forEach(s => {
        if (s != item) {
          nuevasSemillas.push(s);
        }
      });

      State.semillasArbol = nuevasSemillas;
      return;
    }

    // Arbol
    if (item instanceof Arbol) {
      player.subirPuntoLeñador();

      //Calculo si obtuvo manzada
      let manzanas = 0;
      if (getSketch().random() < item.probabilidadManzana) {
        manzanas = item.recompensaManzana;
      }

      //Calculo si obtuvo semilla
      let semillas = 0;
      if (getSketch().random() < item.probabilidadSemilla) {
        semillas = item.recompensaSemilla;
      }

      //Guardo madera
      State.items.madera += item.recompensa;
      State.items.manzana += manzanas;
      State.items.semillaArbol += semillas;

      //Mensaje
      let txt = `+${item.recompensa} madera`;

      if (manzanas != 0) {
        if (manzanas == 1) {
          txt += " | +1 manzana";
        } else {
          txt += ` | +${manzanas} manzanas`;
        }
      }

      if (semillas != 0) {
        if (semillas == 1) {
          txt += " | +1 semilla";
        } else {
          txt += ` | +${semillas} semillas`;
        }
      }

      metodos.nuevoMensaje(txt);

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

    //Diamante
    if (item instanceof Diamante) {
      if (item.recompensa != 1) metodos.nuevoMensaje(`+${item.recompensa} diamante`);
      if (item.recompensa == 1) metodos.nuevoMensaje(`+${item.recompensa} diamantes`);
      player.subirPuntoMinero();

      //Guardo
      State.items.diamante += item.recompensa;
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
  },
  onItemComido: (item, cantidad) => {
    metodos.nuevoMensaje("Restaurado " + cantidad + " de hambre");
  }
};

export default metodos;
