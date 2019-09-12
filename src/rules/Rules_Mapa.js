import { getSketch } from "_sketch";
import State from "_state";
import Parametros from "_parametros";
import sizeof from "object-sizeof";

//Biomas
import BiomaBase from "juego/bioma/base";
import BiomaOceano from "juego/bioma/oceano";
import BiomaMontaña from "juego/bioma/montaña";
import BiomaPlaya from "juego/bioma/playa";
import BiomaBosque from "juego/bioma/bosque";
import BiomaDesierto from "juego/bioma/desierto";
import BiomaJardin from "juego/bioma/jardin";
import BiomaLlanura from "juego/bioma/llanura";

//Pisos
import PisoBase from "juego/piso/base";
import PisoAgua from "juego/piso/agua";
import PisoMontaña from "juego/piso/montaña";
import PisoArena from "juego/piso/arena";
import PisoBosque from "juego/piso/bosque";
import PisoLlanura from "juego/piso/llanura";
import PisoJardin from "juego/piso/jardin";

//Items
import Arbol from "juego/arbol";
import Arbusto from "juego/arbusto";
import FlorBosque from "juego/flor/bosque";
import FlorLlanura from "juego/flor/llanura";
import FlorJardin from "juego/flor/jardin";
import Nieve from "juego/nieve";
import Nave from "juego/nave";
import Piedra from "juego/piedra";
import Oro from "juego/oro";
import Diamante from "juego/diamante";
import Palo from "juego/palo";

//rules
import Rules_Player from "./Rules_Player";
import { openSync } from "fs";

const metodos = {
  reiniciar: () => {
    State.reiniciandoMapa = true;
    metodos.initMapa();
    Rules_Player.reiniciarPosicion();

    let chunk = metodos.getChunkActual(State.player.x, State.player.y);
    let pos = metodos.getPosicionEnChunk(State.player.x, State.player.y);
    let item = State.chunks["" + chunk][pos.i][pos.j];
    State.itemMapa = item;
    State.player.nadando = Rules_Player.isNadando();

    setTimeout(() => {
      State.reiniciandoMapa = false;
    }, 1);
  },
  initMapa: () => {
    State.chunks = {};
    State.mapaVisible = [];
    State.altura = [];
    State.humedad = [];
    State.seedAltura = getSketch().random(0, 10000000);
    State.seedHumedad = getSketch().random(0, 10000000);
  },

  actualizarChunks: () => {
    let cantidadChunksX = Math.floor(State.player.x / Parametros.chunk);
    let offsetX = cantidadChunksX * Parametros.chunk;
    let x = State.player.x - offsetX;

    let cantidadChunksY = Math.floor(State.player.y / Parametros.chunk);
    let offsetY = cantidadChunksY * Parametros.chunk;
    let y = State.player.y - offsetY;

    let cantidadChunksHorizontales = Parametros.mapaRows / Parametros.chunk;
    let chunkActual = cantidadChunksY * cantidadChunksHorizontales + cantidadChunksX;

    let chunksPorCargar = [];

    let cumpleIzquierda = false;
    let cumpleDerecha = false;
    let cumpleArriba = false;
    let cumpleAbajo = false;

    //Izq
    if (x < Math.floor(Parametros.chunk / 2)) {
      if (chunkActual % cantidadChunksHorizontales != 0) {
        chunksPorCargar.push("" + (chunkActual - 1));
        cumpleIzquierda = true;
      }
    }

    //der
    if (x > Math.floor(Parametros.chunk / 2)) {
      if ((chunkActual + 1) % cantidadChunksHorizontales != 0) {
        chunksPorCargar.push("" + (chunkActual + 1));
        cumpleDerecha = true;
      }
    }

    //arriba
    if (y < Math.floor(Parametros.chunk / 2)) {
      if (chunkActual >= cantidadChunksHorizontales) {
        chunksPorCargar.push("" + (chunkActual - cantidadChunksHorizontales));
        cumpleArriba = true;
      }
    }

    //abajo
    if (y > Math.floor(Parametros.chunk / 2)) {
      let chunksTotales = cantidadChunksHorizontales * cantidadChunksHorizontales;
      if (chunksTotales - cantidadChunksHorizontales > chunkActual) {
        chunksPorCargar.push("" + (chunkActual + cantidadChunksHorizontales));
        cumpleAbajo = true;
      }
    }

    //Diagonal sup izq
    if (cumpleArriba && cumpleIzquierda) {
      chunksPorCargar.push("" + (chunkActual - 1 - cantidadChunksHorizontales));
    }

    //Diagonal sup der
    if (cumpleArriba && cumpleDerecha) {
      chunksPorCargar.push("" + (chunkActual + 1 - cantidadChunksHorizontales));
    }

    //Diagonal inf izq
    if (cumpleAbajo && cumpleIzquierda) {
      chunksPorCargar.push("" + (chunkActual - 1 + cantidadChunksHorizontales));
    }

    //Diagonal inz der
    if (cumpleAbajo && cumpleDerecha) {
      chunksPorCargar.push("" + (chunkActual + 1 + cantidadChunksHorizontales));
    }

    let chunksPorBorrar = [];
    Object.keys(State.chunks).forEach(numero => {
      if (chunksPorCargar.indexOf("" + numero) == -1 && numero != chunkActual) {
        chunksPorBorrar.push("" + numero);
      }
    });
    chunksPorBorrar.forEach(numero => {
      State.chunks["" + numero] = null;
      delete State.chunks["" + numero];
    });

    chunksPorCargar.forEach(numero => {
      let chunk = metodos.generarChunk("" + numero);
      State.chunks["" + numero] = chunk;
    });

    // console.log("Borro", chunksPorBorrar);
    // console.log("Genero", chunksPorCargar);

    // console.log(State.chunks);

    const canvasRows = Parametros.canvasRows;
    const canvasCols = Parametros.canvasCols;
    const mapaRows = Parametros.mapaRows;

    // let chunksVisibles = [];
    State.mapaVisible = [];
    for (let i = 0; i < canvasRows; i++) {
      for (let j = 0; j < canvasCols; j++) {
        let mi = i + State.initialMapX + State.offsetX;
        let mj = j + State.initialMapY + State.offsetY;

        // console.log(`Pos ${mi},${mj}`);

        if (mi >= 0 && mj >= 0 && mi < mapaRows && mj < mapaRows) {
          // console.log(`Pos ${mi},${mj}`);
          let chunk = metodos.getChunkActual(mi, mj);

          let pos = metodos.getPosicionEnChunk(mi, mj);
          // console.log("Pos en chunk", pos);
          if (State.mapaVisible[i] == undefined) State.mapaVisible[i] = [];
          if (State.mapaVisible[j] == undefined) State.mapaVisible[j] = [];

          State.mapaVisible[i][j] = State.chunks["" + chunk][pos.i][pos.j];
        }
      }
    }
    // console.log(State.mapaVisible);
  },
  getChunkActual: (mi, mj) => {
    const chunkSize = Parametros.chunk;
    const cantidadChunksHorizontales = Parametros.mapaRows / Parametros.chunk;

    let fila = Math.floor(mj / chunkSize);
    let columna = Math.floor(mi / chunkSize);
    return fila * cantidadChunksHorizontales + columna;
  },
  getPosicionEnChunk: (mi, mj) => {
    const chunkSize = Parametros.chunk;
    let fila = Math.floor(mj / chunkSize);
    let columna = Math.floor(mi / chunkSize);

    return {
      i: mi - columna * chunkSize,
      j: mj - fila * chunkSize
    };
  },
  generarChunk: numero => {
    console.log(State.chunks);
    if (State.chunks["" + numero] != undefined) return State.chunks["" + numero];
    console.log("Generando chunk " + numero);

    const mapaRows = Parametros.mapaRows;
    const mapaCols = Parametros.mapaCols;
    const chunkSize = Parametros.chunk;
    let cantidadChunksHorizontales = Parametros.mapaRows / Parametros.chunk;

    let chunk = [];

    for (let i = 0; i < chunkSize; i++) {
      for (let j = 0; j < chunkSize; j++) {
        let filas = Math.floor(numero / cantidadChunksHorizontales);
        let columnas = numero - filas * cantidadChunksHorizontales;

        let mi = i + chunkSize * columnas;
        let mj = j + chunkSize * filas;

        const a = metodos.calcularAltura(mi, mj, mapaRows, mapaCols);
        if (State.altura[mi] == undefined) State.altura[mi] = [];
        if (State.altura[mi][mj] == undefined) State.altura[mi][mj] = [];
        State.altura[mi][mj] = a;

        const h = metodos.calcularHumedad(mi, mj, mapaRows, mapaCols);
        if (State.humedad[mi] == undefined) State.humedad[mi] = [];
        if (State.humedad[mi][mj] == undefined) State.humedad[mi][mj] = [];
        State.humedad[mi][mj] = h;

        let piso;
        let bioma;

        let pos = getSketch().createVector(mi, mj);
        let posPlayer = Rules_Player.calcularPosicion();

        // let dx = pos.x - posPlayer.x;
        // if (dx < 0) dx *= -1;
        // let dy = pos.y - posPlayer.y;
        // if (dy < 0) dy *= -1;

        // if (dx < 2 && dx > -2 && (dy < 1 && dy > -3)) {
        //   bioma = new BiomaBase();
        //   piso = new PisoBase(pos);

        //   if (dx == 0 && dy == -1) {
        //     const items = [];
        //     piso = new PisoBase(pos, true);
        //     items.push(new Nave());
        //     piso.items = items;
        //   }
        // } else {

        bioma = metodos.calcularBioma(a, h);

        //Oceano
        if (bioma instanceof BiomaOceano) {
          piso = new PisoAgua(pos, bioma.profundidad);
        }

        //Montaña
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
            } else {
              if (getSketch().random() <= bioma.probabilidadDiamante) {
                items.push(new Diamante());
              }
            }
          }

          piso.items = items;
        }

        //Playa
        if (bioma instanceof BiomaPlaya) {
          piso = new PisoArena(pos);
        }

        //Bosque
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
              } else {
                if (getSketch().random() <= bioma.probabilidadPalo) {
                  items.push(new Palo());
                }
              }
            }
          }
          piso.items = items;
        }

        //Lanura
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
              } else {
                if (getSketch().random() <= bioma.probabilidadPalo) {
                  items.push(new Palo());
                }
              }
            }
          }
          piso.items = items;
        }

        //Jardin
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

        //Desierto
        if (bioma instanceof BiomaDesierto) {
          piso = new PisoArena(pos);
        }
        // }

        // piso.items = [];
        piso.bioma = bioma;

        if (chunk[i] == undefined) chunk[i] = [];
        chunk[i][j] = piso;
      }
    }

    return chunk;

    // //Agrego
    // for (let i = 0; i < canvasRows; i++) {
    //   for (let j = 0; j < canvasCols; j++) {
    //     let mi = i + State.initialMapX + State.offsetX;
    //     let mj = j + State.initialMapY + State.offsetY;

    //     if (State.mapa[mi][mj] == undefined) {
    //       let piso;
    //       let bioma;

    //       let pos = getSketch().createVector(mi, mj);
    //       let posPlayer = Rules_Player.calcularPosicion();

    //       let dx = pos.x - posPlayer.x;
    //       // if (dx < 0) dx *= -1;
    //       let dy = pos.y - posPlayer.y;
    //       // if (dy < 0) dy *= -1;

    //       // if (dx < 2 && dx > -2 && (dy < 1 && dy > -3)) {
    //       //   bioma = new BiomaBase();
    //       //   piso = new PisoBase(pos);

    //       //   if (dx == 0 && dy == -1) {
    //       //     const items = [];
    //       //     piso = new PisoBase(pos, true);
    //       //     items.push(new Nave());
    //       //     piso.items = items;
    //       //   }
    //       // } else {
    //       let a = State.altura[mi][mj];
    //       let h = State.humedad[mi][mj];

    //       bioma = metodos.calcularBioma(a, h);

    //       //Oceano
    //       if (bioma instanceof BiomaOceano) {
    //         piso = new PisoAgua(pos, bioma.profundidad);
    //       }

    //       //Montaña
    //       if (bioma instanceof BiomaMontaña) {
    //         piso = new PisoMontaña(pos, bioma.altura);

    //         const items = [];
    //         if (getSketch().random() <= bioma.probabilidadNieve) {
    //           items.push(new Nieve());
    //         }

    //         //Piedra
    //         if (getSketch().random() <= bioma.probabilidadPiedra) {
    //           items.push(new Piedra());
    //         } else {
    //           if (getSketch().random() <= bioma.probabilidadOro) {
    //             items.push(new Oro());
    //           } else {
    //             if (getSketch().random() <= bioma.probabilidadDiamante) {
    //               items.push(new Diamante());
    //             }
    //           }
    //         }

    //         piso.items = items;
    //       }

    //       //Playa
    //       if (bioma instanceof BiomaPlaya) {
    //         piso = new PisoArena(pos);
    //       }

    //       //Bosque
    //       if (bioma instanceof BiomaBosque) {
    //         piso = new PisoBosque(pos);

    //         const items = [];
    //         if (getSketch().random() <= bioma.probabilidadArbol) {
    //           items.push(new Arbol());
    //         } else {
    //           if (getSketch().random() <= bioma.probabilidadArbusto) {
    //             items.push(new Arbusto());
    //           } else {
    //             if (getSketch().random() <= bioma.probabilidadFlor) {
    //               items.push(new FlorBosque());
    //             } else {
    //               if (getSketch().random() <= bioma.probabilidadPalo) {
    //                 items.push(new Palo());
    //               }
    //             }
    //           }
    //         }
    //         piso.items = items;
    //       }

    //       //Lanura
    //       if (bioma instanceof BiomaLlanura) {
    //         piso = new PisoLlanura(pos);

    //         const items = [];
    //         if (getSketch().random() <= bioma.probabilidadArbol) {
    //           items.push(new Arbol());
    //         } else {
    //           if (getSketch().random() <= bioma.probabilidadArbusto) {
    //             items.push(new Arbusto());
    //           } else {
    //             if (getSketch().random() <= bioma.probabilidadFlor) {
    //               items.push(new FlorLlanura());
    //             } else {
    //               if (getSketch().random() <= bioma.probabilidadPalo) {
    //                 items.push(new Palo());
    //               }
    //             }
    //           }
    //         }
    //         piso.items = items;
    //       }

    //       //Jardin
    //       if (bioma instanceof BiomaJardin) {
    //         piso = new PisoJardin(pos);

    //         const items = [];
    //         if (getSketch().random() <= bioma.probabilidadArbol) {
    //           items.push(new Arbol());
    //         } else {
    //           if (getSketch().random() <= bioma.probabilidadArbusto) {
    //             items.push(new Arbusto());
    //           } else {
    //             if (getSketch().random() <= bioma.probabilidadFlor) {
    //               items.push(new FlorJardin());
    //             }
    //           }
    //         }
    //         piso.items = items;
    //       }

    //       //Desierto
    //       if (bioma instanceof BiomaDesierto) {
    //         piso = new PisoArena(pos);
    //       }
    //       // }

    //       piso.bioma = bioma;
    //       State.mapa[mi][mj] = piso;
    //     }
    //   }
    // }
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
