import { getSketch } from "../_sketch";
import Parametros from "../_parametros";
import Recursos from "../_recursos";
import State from "../_state";

import PisoAgua from "../Piso/agua";
import Arbol from "../Arbol";
import Flor from "../Flor";
import Arbusto from "../Arbusto";

//Rules
import Rules_Player from "../Rules/Rules_Player";

export default class Player {
  constructor(pos) {
    this.armaPico = new Pico();
    this.armaPala = new Pala();
    this.armaHacha = new Hacha();

    this.salud = 10;
    this.saludMaxima = 10;
    this.oxigeno = 10;
    this.oxigenoMaximo = 10;
    this.hambre = 100;
    this.hambreMaxima = 100;
    this.arma = this.armaPico;
    this.poderGolpe = undefined;

    this.puntosLeñador = 0;
    this.puntosJardinero = 0;
    this.puntosNadador = 0;
    this.puntosCorredor = 0;

    this.nivelLeñador = 1;
    this.nivelJardinero = 1;
    this.nivelNadador = 1;
    this.nivelCorredor = 1;

    this.vel = 1;

    this.playerPos = getSketch().createVector(
      getSketch().floor(Parametros.canvasRows / 2) * Parametros.canvasItemWidth,
      getSketch().floor(Parametros.canvasCols / 2) * Parametros.canvasItemHeight
    );
    this.pos = pos;

    this.dir = "u";
    this.dirContador = 0;

    this.timerRecuperacion;
    this.huellas = [];

    this.brazoAngulo = -180;
    this.brazoAngulo_anim = -180;
    this.puedeGolpear = true;

    this.golpeando = false;
    this.nadando = State.itemMapa instanceof PisoAgua && State.itemMapa.profundidad > 1;
  }

  restarSalud(cantidad) {
    this.salud -= cantidad;
    if (this.salud < 0) this.salud = 0;
    if (this.salud === 0) {
      console.log("Muerto por no tener salud");
      getSketch().noLoop();
      return;
    }
  }

  restaurarSalud(cantidad) {
    this.salud += cantidad;
    if (this.salud > this.saludMaxima) this.salud = this.saludMaxima;
  }

  sumarHambre() {
    this.hambre -= 0.1;
    if (this.hambre < 0) this.hambre = 0;
    if (this.hambre === 0) {
      console.log("Muerto de hambre");
      getSketch().noLoop();
      return;
    }
  }

  restaurarHambre(cantidad) {
    this.hambre += cantidad;
    if (this.hambre > this.hambreMaxima) this.hambre = this.hambreMaxima;
  }

  restarOxigeno() {
    this.oxigeno -= 0.2;
    if (this.oxigeno < 0) this.oxigeno = 0;

    if (this.oxigeno === 0) {
      console.log("Muerto ahogado");
      getSketch().noLoop();
      return;
    }
  }

  restaurarOxigeno() {
    this.oxigeno = this.oxigenoMaximo;
  }

  moverBrazo() {
    if (this.puedeGolpear == false) return;
    this.puedeGolpear = false;
    this.golpeando = true;
    setTimeout(() => {
      this.puedeGolpear = true;
      this.golpeando = false;
      this.poderGolpe = undefined;
    }, 200);
  }

  setDireccion(d) {
    this.dir = d;
    this.dirContador = 0;
  }

  setNadando(nadando) {
    if (this.nadando != nadando) this.dirContador = 0;
    this.nadando = nadando;
  }

  mover(pos) {
    this.pos = pos;

    let nadandoNuevo = Rules_Player.isNadando();
    if (this.nadando != nadandoNuevo) this.dirContador = 0;
    this.nadando = nadandoNuevo;

    if (this.dirContador == undefined) this.dirContador = 0;
    if (this.nadando == undefined) this.nadando = false;

    this.dirContador++;
    if (this.nadando) {
      if (this.dirContador > 6) this.dirContador = 0;
    } else {
      if (this.dir == "l" || this.dir == "r") {
        if (this.dirContador > 9) this.dirContador = 0;
      } else {
        if (this.dirContador > 10) this.dirContador = 0;
      }
    }

    //Huellas
    this.huellas.push({
      vertical: this.dir == "u" || this.dir == "d",
      pos: this.pos,
      opacity: 50
    });

    if (this.huellas.length > 7) {
      this.huellas.shift();
    }
  }

  subirPuntoNadador() {
    this.puntosNadador++;
    if (this.puntosNadador > this.nextLevel(this.nivelNadador)) {
      this.nivelNadador++;
      this.oxigenoMaximo += 0.5;
      //   Utils.nuevoMensaje("Navador nivel " + this.nivelNadador);
    }
  }

  subirPuntoCorredor() {
    this.puntosCorredor++;
    let p = this.puntosCorredor / this.puntosNecesariosCorredor(this.nivelCorredor);
    if (this.puntosCorredor > this.puntosNecesariosCorredor(this.nivelCorredor)) {
      this.puntosCorredor = 0;
      this.nivelCorredor++;
      this.hambreMaxima += 0.5;
      //   Utils.nuevoMensaje("Corredor nivel " + this.nivelCorredor);
    }
  }

  subirPuntoLeñador() {
    this.puntosLeñador++;
    if (this.puntosLeñador > this.puntosNecesariosLeñador(this.nivelLeñador)) {
      this.puntosLeñador = 0;
      this.nivelLeñador++;
      //   Utils.nuevoMensaje("Leñador nivel " + this.nivelLeñador);
    }
  }

  subirPuntoJardinero() {
    this.puntosJardinero++;
    if (this.puntosJardinero > this.nextLevel(this.nivelJardinero)) {
      this.nivelJardinero++;
      //   Utils.nuevoMensaje("Jardinero nivel " + this.nivelJardinero);
    }
  }

  puntosNecesariosLeñador(nivel) {
    if (nivel == 1) return 10;
    if (nivel == 2) return 30;
    if (nivel == 3) return 100;
    if (nivel == 4) return 500;
    if (nivel == 5) return 1000;
    if (nivel == 6) return 2000;
    if (nivel == 7) return 3000;
    if (nivel == 8) return 6000;
    if (nivel == 9) return 10000;
    if (nivel == 10) return 15000;
    return -1;
  }

  puntosNecesariosCorredor(nivel) {
    if (nivel == 1) return 100;
    if (nivel == 2) return 500;
    if (nivel == 3) return 1000;
    if (nivel == 4) return 2000;
    if (nivel == 5) return 4000;
    if (nivel == 6) return 7000;
    if (nivel == 7) return 11000;
    if (nivel == 8) return 15000;
    if (nivel == 9) return 20000;
    if (nivel == 10) return 25000;
    return -1;
  }

  nextLevel(level) {
    return getSketch().round((4 * getSketch().pow(level, 5)) / 5);
  }

  setArma(arma) {
    this.arma = arma;
  }

  setPoderGolpe(poder) {
    this.poderGolpe = poder;
  }

  dejarDeMover = () => {
    this.dirContador = 0;
  };

  show() {
    if (this.dirContador == undefined) this.dirContador = 0;
    if (this.golpeando == undefined) this.golpeando = false;
    if (this.nadando == undefined) this.nadando = false;

    const canvasItemWidth = Parametros.canvasItemWidth;
    getSketch().fill(0);
    getSketch().noStroke();

    getSketch().push();

    //Player

    //Brazo
    getSketch().angleMode(getSketch().DEGREES);
    getSketch().translate(this.playerPos.x + canvasItemWidth / 2, this.playerPos.y + canvasItemWidth / 2);
    getSketch().scale(1);

    //Jugador
    getSketch().imageMode(getSketch().CORNER);

    //Arriba
    if (this.dir == "u") {
      let imgPlayer;

      if (this.nadando) {
        imgPlayer = Recursos.imagenes["playerArribaNadando" + this.dirContador];
      } else {
        //Brazo
        if (this.golpeando) {
          const brazo_w = canvasItemWidth * 0.6;
          const brazo_h = canvasItemWidth * 0.6;
          const brazo_x = canvasItemWidth / 2 - brazo_w;
          const brazo_y = -canvasItemWidth / 2 - brazo_h * 0.2;

          let imgArma;
          if (State.player.arma instanceof Hacha) imgArma = Recursos.imagenes.hacha1;
          if (State.player.arma instanceof Pala) imgArma = Recursos.imagenes.pala1;
          if (State.player.arma instanceof Pico) imgArma = Recursos.imagenes.pico1;
          if (imgArma) {
            getSketch().image(imgArma, brazo_x, brazo_y, brazo_w, brazo_h);
          }
        }

        if (this.golpeando) {
          imgPlayer = Recursos.imagenes.playerArribaGolpeando;
        } else {
          imgPlayer = Recursos.imagenes["playerArriba" + this.dirContador];
        }
      }

      getSketch().image(imgPlayer, -canvasItemWidth / 2, -canvasItemWidth / 2, canvasItemWidth, canvasItemWidth);
    }

    //abajo
    if (this.dir == "d") {
      let imgPlayer;
      if (this.nadando) {
        imgPlayer = Recursos.imagenes["playerAbajoNadando" + this.dirContador];
      } else {
        //Brazo
        if (this.golpeando) {
          const brazo_w = canvasItemWidth * 0.6;
          const brazo_h = canvasItemWidth * 0.6;
          const brazo_x = canvasItemWidth / 2 - brazo_w * 1;
          const brazo_y = -canvasItemWidth / 2 - brazo_h * 0.5;

          let imgArma;
          if (State.player.arma instanceof Hacha) imgArma = Recursos.imagenes.hacha1;
          if (State.player.arma instanceof Pala) imgArma = Recursos.imagenes.pala1;
          if (State.player.arma instanceof Pico) imgArma = Recursos.imagenes.pico1;
          getSketch().rotate(180);
          if (imgArma) {
            getSketch().image(imgArma, brazo_x, brazo_y, brazo_w, brazo_h);
          }
        }

        if (this.golpeando) {
          imgPlayer = Recursos.imagenes.playerAbajoGolpeando;
        } else {
          imgPlayer = Recursos.imagenes["playerAbajo" + this.dirContador];
        }
        if (this.golpeando) {
          getSketch().rotate(180);
        }
      }
      getSketch().image(imgPlayer, -canvasItemWidth / 2, -canvasItemWidth / 2, canvasItemWidth, canvasItemWidth);
    }

    //izquierda
    if (this.dir === "l") {
      let imgPlayer;

      if (this.nadando) {
        imgPlayer = Recursos.imagenes["playerIzquierdaNadando" + this.dirContador];
      } else {
        //Brazo
        if (this.golpeando) {
          const brazo_w = canvasItemWidth * 0.6;
          const brazo_h = canvasItemWidth * 0.6;
          const brazo_x = canvasItemWidth / 2 - brazo_w * 1.5;
          const brazo_y = -canvasItemWidth / 2 - brazo_h * 0.6;

          let imgArma;
          if (State.player.arma instanceof Hacha) imgArma = Recursos.imagenes.hacha1;
          if (State.player.arma instanceof Pala) imgArma = Recursos.imagenes.pala1;
          if (State.player.arma instanceof Pico) imgArma = Recursos.imagenes.pico1;
          getSketch().rotate(-90);
          if (imgArma) {
            getSketch().image(imgArma, brazo_x, brazo_y, brazo_w, brazo_h);
          }
        }

        if (this.golpeando) {
          imgPlayer = Recursos.imagenes.playerIzquierdaGolpeando;
        } else {
          imgPlayer = Recursos.imagenes["playerIzquierda" + this.dirContador];
        }
        if (this.golpeando) {
          getSketch().rotate(90);
        }
      }

      getSketch().image(imgPlayer, -canvasItemWidth / 2, -canvasItemWidth / 2, canvasItemWidth, canvasItemWidth);
    }

    //derecha
    if (this.dir == "r") {
      let imgPlayer;
      if (this.nadando) {
        imgPlayer = Recursos.imagenes["playerIzquierdaNadando" + this.dirContador];
      } else {
        //Brazo
        if (this.golpeando) {
          const brazo_w = canvasItemWidth * 0.6;
          const brazo_h = canvasItemWidth * 0.6;
          const brazo_x = canvasItemWidth / 2 - brazo_w * 1.1;
          const brazo_y = -canvasItemWidth / 2 - brazo_h * 0.6;

          let imgArma;
          if (State.player.arma instanceof Hacha) imgArma = Recursos.imagenes.hacha1;
          if (State.player.arma instanceof Pala) imgArma = Recursos.imagenes.pala1;
          if (State.player.arma instanceof Pico) imgArma = Recursos.imagenes.pico1;
          getSketch().rotate(90);
          if (imgArma) {
            getSketch().image(imgArma, brazo_x, brazo_y, brazo_w, brazo_h);
          }
        }

        if (this.golpeando) {
          imgPlayer = Recursos.imagenes.playerIzquierdaGolpeando;
        } else {
          imgPlayer = Recursos.imagenes["playerIzquierda" + this.dirContador];
        }
        if (this.golpeando) {
          getSketch().rotate(-90);
        }
      }

      getSketch().scale(-1, 1);
      getSketch().image(imgPlayer, -canvasItemWidth / 2, -canvasItemWidth / 2, canvasItemWidth, canvasItemWidth);
    }

    // //Poder
    // if (this.golpeando && this.poderGolpe != undefined) {
    //   if (this.dir == "r") getSketch().scale(-1, 1);
    //   if (this.dir == "l") getSketch().translate(-canvasItemWidth, canvasItemWidth / 2);
    //   if (this.dir == "r") getSketch().translate(canvasItemWidth - 10, canvasItemWidth / 2);
    //   if (this.dir == "u") getSketch().translate(0, -canvasItemWidth / 4);
    //   if (this.dir == "d") getSketch().translate(-canvasItemWidth / 4, canvasItemWidth * 1.6);
    //   getSketch().fill(255, 0, 0);
    //   getSketch().textAlign(getSketch().LEFT, getSketch().TOP);
    //   getSketch().text(this.poderGolpe || "1", 0, -canvasItemWidth / 2);
    // }
    getSketch().pop();
  }

  drawHuella(i, j, canvasItemWidth, mi, mj) {
    try {
      let huella;
      for (let iH = 0; iH < this.huellas.length; iH++) {
        let h = this.huellas[iH];
        if (h.pos.x == mi && h.pos.y == mj) {
          huella = h;
        }
      }

      if (huella) {
        huella.opacity = getSketch().lerp(huella.opacity, 0, 0.025);
        let o = huella.opacity;
        getSketch().fill(0, o);
        getSketch().rect(
          i * canvasItemWidth + canvasItemWidth * 0.3,
          j * canvasItemWidth + canvasItemWidth * 0.3,
          canvasItemWidth * 0.1 * (huella.vertical ? 1 : 2),
          canvasItemWidth * 0.1 * (huella.vertical ? 2 : 1),
          5,
          5,
          5,
          5
        );

        getSketch().fill(0, o);
        getSketch().rect(
          i * canvasItemWidth + canvasItemWidth * 0.6,
          j * canvasItemWidth + canvasItemWidth * 0.5,
          canvasItemWidth * 0.1 * (huella.vertical ? 1 : 2),
          canvasItemWidth * 0.1 * (huella.vertical ? 2 : 1),
          5,
          5,
          5,
          5
        );
      }
    } catch (ex) {
      console.log(ex);
    }
  }
}

class Arma {
  constructor(numero, color) {
    this.numero = numero;
    this.color = color;
  }
}

export class Pico extends Arma {
  constructor() {
    super(1, getSketch().color(158, 158, 158));
  }
}

export class Pala extends Arma {
  constructor() {
    super(2, getSketch().color(76, 175, 80));
  }
}

export class Hacha extends Arma {
  constructor() {
    super(3, getSketch().color(121, 85, 72));
  }
}
