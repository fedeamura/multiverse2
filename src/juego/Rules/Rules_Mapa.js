import { getSketch } from "../_sketch";
import State from "../_state";
import Parametros from "../_parametros";

//Biomas
import BiomaBase from "../Bioma/base";
import BiomaOceano from "../Bioma/oceano";
import BiomaMontaña from "../Bioma/montaña";
import BiomaPlaya from "../Bioma/playa";
import BiomaBosque from "../Bioma/bosque";
import BiomaDesierto from "../Bioma/desierto";
import BiomaJardin from "../Bioma/jardin";
import BiomaLlanura from "../Bioma/llanura";

//Pisos
import PisoBase from "../Piso/base";
import PisoAgua from "../Piso/agua";
import PisoMontaña from "../Piso/montaña";
import PisoArena from "../Piso/arena";
import PisoBosque from "../Piso/bosque";
import PisoLlanura from "../Piso/llanura";
import PisoJardin from "../Piso/jardin";

//Items
import Arbol from "../Arbol";
import Arbusto from "../Arbusto";
import FlorBosque from "../Flor/bosque";
import FlorLlanura from "../Flor/llanura";
import FlorJardin from "../Flor/jardin";
import Nieve from "../Nieve";
import Nave from "../Nave";
import Piedra from "../Piedra";
import Oro from "../Oro";

//Rules
import Rules_Player from "./Rules_Player";

const metodos = {
  reiniciar: () => {
    State.reiniciandoMapa = true;
    metodos.initMapa();
    Rules_Player.reiniciarPosicion();
    metodos.crearMapa();
    State.itemMapa = State.mapa[State.player.pos.x][State.player.pos.y];
    State.player.nadando = Rules_Player.isNadando();

    setTimeout(() => {
      State.reiniciandoMapa = false;
    }, 1);
  },
  initMapa: () => {
    State.mapa = [];
    State.altura = [];
    State.humedad = [];
    State.seedAltura = getSketch().random(0, 10000000);
    State.seedHumedad = getSketch().random(0, 10000000);
  },
  crearMapa: () => {
    const mapaRows = Parametros.mapaRows;
    const mapaCols = Parametros.mapaCols;
    const canvasRows = Parametros.canvasRows;
    const canvasCols = Parametros.canvasCols;

    for (let i = 0; i < canvasRows; i++) {
      for (let j = 0; j < canvasCols; j++) {
        let mi = i + State.initialMapX + State.offsetX;
        let mj = j + State.initialMapY + State.offsetY;
        if (State.mapa[mi] == undefined) State.mapa[mi] = [];

        if (State.mapa[mi][mj] == undefined) {
          const a = metodos.calcularAltura(mi, mj, mapaRows, mapaCols);
          if (State.altura[mi] == undefined) State.altura[mi] = [];
          if (State.altura[mi][mj] == undefined) State.altura[mi][mj] = [];
          State.altura[mi][mj] = a;

          const h = metodos.calcularHumedad(mi, mj, mapaRows, mapaCols);
          if (State.humedad[mi] == undefined) State.humedad[mi] = [];
          if (State.humedad[mi][mj] == undefined) State.humedad[mi][mj] = [];
          State.humedad[mi][mj] = h;
        }
      }
    }

    //Agrego
    for (let i = 0; i < canvasRows; i++) {
      for (let j = 0; j < canvasCols; j++) {
        let mi = i + State.initialMapX + State.offsetX;
        let mj = j + State.initialMapY + State.offsetY;

        if (State.mapa[mi][mj] == undefined) {
          let piso;
          let bioma;

          let pos = getSketch().createVector(mi, mj);
          let posPlayer = Rules_Player.calcularPosicion();

          let dx = pos.x - posPlayer.x;
          // if (dx < 0) dx *= -1;
          let dy = pos.y - posPlayer.y;
          // if (dy < 0) dy *= -1;

          if (dx < 2 && dx > -2 && (dy < 1 && dy > -3)) {
            bioma = new BiomaBase();
            piso = new PisoBase(pos);

            if (dx == 0 && dy == -1) {
              const items = [];
              piso = new PisoBase(pos, true);
              items.push(new Nave());
              piso.items = items;
            }
          } else {
            let a = State.altura[mi][mj];
            let h = State.humedad[mi][mj];

            bioma = metodos.calcularBioma(a, h);

            if (bioma instanceof BiomaOceano) {
              piso = new PisoAgua(pos, bioma.profundidad);
            }

            if (bioma instanceof BiomaMontaña) {
              piso = new PisoMontaña(pos, bioma.altura);

              const items = [];
              if (getSketch().random() <= bioma.probabilidadNieve) {
                items.push(new Nieve());
              }

              //Piedra
              if (getSketch().random() <= bioma.probabilidadPiedra) {
                items.push(new Piedra());
              } else {
                if (getSketch().random() <= bioma.probabilidadOro) {
                  items.push(new Oro());
                }
              }

              piso.items = items;
            }

            if (bioma instanceof BiomaPlaya) {
              piso = new PisoArena(pos);
            }

            if (bioma instanceof BiomaBosque) {
              piso = new PisoBosque(pos);

              const items = [];
              if (getSketch().random() <= bioma.probabilidadArbol) {
                items.push(new Arbol());
              } else {
                if (getSketch().random() <= bioma.probabilidadArbusto) {
                  items.push(new Arbusto());
                } else {
                  if (getSketch().random() <= bioma.probabilidadFlor) {
                    items.push(new FlorBosque());
                  }
                }
              }
              piso.items = items;
            }

            if (bioma instanceof BiomaLlanura) {
              piso = new PisoLlanura(pos);

              const items = [];
              if (getSketch().random() <= bioma.probabilidadArbol) {
                items.push(new Arbol());
              } else {
                if (getSketch().random() <= bioma.probabilidadArbusto) {
                  items.push(new Arbusto());
                } else {
                  if (getSketch().random() <= bioma.probabilidadFlor) {
                    items.push(new FlorLlanura());
                  }
                }
              }
              piso.items = items;
            }

            if (bioma instanceof BiomaJardin) {
              piso = new PisoJardin(pos);

              const items = [];
              if (getSketch().random() <= bioma.probabilidadArbol) {
                items.push(new Arbol());
              } else {
                if (getSketch().random() <= bioma.probabilidadArbusto) {
                  items.push(new Arbusto());
                } else {
                  if (getSketch().random() <= bioma.probabilidadFlor) {
                    items.push(new FlorJardin());
                  }
                }
              }
              piso.items = items;
            }

            if (bioma instanceof BiomaDesierto) {
              piso = new PisoArena(pos);
            }
          }

          piso.bioma = bioma;
          State.mapa[mi][mj] = piso;
        }
      }
    }
  },
  calcularBioma: (e, m) => {
    if (e < 0.15) return new BiomaOceano(6);
    if (e < 0.2) return new BiomaOceano(5);
    if (e < 0.25) return new BiomaOceano(4);
    if (e < 0.3) return new BiomaOceano(3);
    if (e < 0.35) return new BiomaOceano(2);
    if (e < 0.4) return new BiomaOceano(1);

    if (e < 0.5) {
      if (m < 0.45) {
        return new BiomaPlaya();
      } else {
        return new BiomaLlanura();
      }
    }

    if (e < 0.65) {
      if (m < 0.3) {
        return new BiomaDesierto();
      }

      if (m < 0.6) {
        return new BiomaJardin();
      }

      return new BiomaBosque();
    }

    if (e < 0.67) {
      return new BiomaMontaña(1);
    }

    if (e < 0.7) {
      return new BiomaMontaña(2);
    }

    if (e < 0.75) {
      return new BiomaMontaña(3);
    }

    if (e < 0.8) {
      return new BiomaMontaña(4);
    }

    return new BiomaMontaña(5);
  },
  calcularHumedad: (i, j) => {
    let nx = i * 0.02;
    let ny = j * 0.02;

    getSketch().noiseSeed(State.seedAltura);
    return getSketch().noise(nx, ny);
  },
  calcularAltura: (i, j) => {
    let nx = i * 0.02;
    let ny = j * 0.02;
    getSketch().noiseSeed(State.seedHumedad);
    return getSketch().noise(nx, ny);
  }
};

export default metodos;
