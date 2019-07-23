import { setSketch, getSketch } from "./_sketch";
import Colores from "./_colores";
import Parametros from "./_parametros";
import Recursos from "./_recursos";
import State from "./_state";

//
import Player from "./Player";
import HUD from "./Hud";

//Rules
import Rules_Player from "./Rules/Rules_Player";
import Rules_Mapa from "./Rules/Rules_Mapa";

// import ResourcePisoMontaña1 from "../resources/piso/montaña/1.png";
// import ResourcePisoMontaña2 from "../resources/piso/montaña/2.png";

import ResourceArmaHacha1 from "../resources/arma/hacha/1.png";
import ResourceArmaHacha2 from "../resources/arma/hacha/2.png";
import ResourceArmaHacha3 from "../resources/arma/hacha/3.png";
import ResourceArmaPico1 from "../resources/arma/pico/1.png";
import ResourceArmaPico2 from "../resources/arma/pico/2.png";
import ResourceArmaPico3 from "../resources/arma/pico/3.png";
import ResourceArmaPala1 from "../resources/arma/pala/1.png";
import ResourceArmaPala2 from "../resources/arma/pala/2.png";
import ResourceArmaPala3 from "../resources/arma/pala/3.png";

import ResourcePlayerIzquierda0 from "../resources/player/izquierda/0.png";
import ResourcePlayerIzquierda1 from "../resources/player/izquierda/1.png";
import ResourcePlayerIzquierda2 from "../resources/player/izquierda/2.png";
import ResourcePlayerIzquierda3 from "../resources/player/izquierda/3.png";
import ResourcePlayerIzquierda4 from "../resources/player/izquierda/4.png";
import ResourcePlayerIzquierda5 from "../resources/player/izquierda/5.png";
import ResourcePlayerIzquierda6 from "../resources/player/izquierda/6.png";
import ResourcePlayerIzquierda7 from "../resources/player/izquierda/7.png";
import ResourcePlayerIzquierda8 from "../resources/player/izquierda/8.png";
import ResourcePlayerIzquierda9 from "../resources/player/izquierda/9.png";
import ResourcePlayerIzquierdaGolpe from "../resources/player/izquierda/golpe.png";
import ResourcePlayerIzquierdaNadando0 from "../resources/player/izquierda/nadando/0.png";
import ResourcePlayerIzquierdaNadando1 from "../resources/player/izquierda/nadando/1.png";
import ResourcePlayerIzquierdaNadando2 from "../resources/player/izquierda/nadando/2.png";
import ResourcePlayerIzquierdaNadando3 from "../resources/player/izquierda/nadando/3.png";
import ResourcePlayerIzquierdaNadando4 from "../resources/player/izquierda/nadando/4.png";
import ResourcePlayerIzquierdaNadando5 from "../resources/player/izquierda/nadando/5.png";
import ResourcePlayerIzquierdaNadando6 from "../resources/player/izquierda/nadando/6.png";

import ResourcePlayerAbajo0 from "../resources/player/abajo/0.png";
import ResourcePlayerAbajo1 from "../resources/player/abajo/1.png";
import ResourcePlayerAbajo2 from "../resources/player/abajo/2.png";
import ResourcePlayerAbajo3 from "../resources/player/abajo/3.png";
import ResourcePlayerAbajo4 from "../resources/player/abajo/4.png";
import ResourcePlayerAbajo5 from "../resources/player/abajo/5.png";
import ResourcePlayerAbajo6 from "../resources/player/abajo/6.png";
import ResourcePlayerAbajo7 from "../resources/player/abajo/7.png";
import ResourcePlayerAbajo8 from "../resources/player/abajo/8.png";
import ResourcePlayerAbajo9 from "../resources/player/abajo/9.png";
import ResourcePlayerAbajo10 from "../resources/player/abajo/10.png";
import ResourcePlayerAbajoGolpe from "../resources/player/abajo/golpe.png";
import ResourcePlayerAbajoNadando0 from "../resources/player/abajo/nadando/0.png";
import ResourcePlayerAbajoNadando1 from "../resources/player/abajo/nadando/1.png";
import ResourcePlayerAbajoNadando2 from "../resources/player/abajo/nadando/2.png";
import ResourcePlayerAbajoNadando3 from "../resources/player/abajo/nadando/3.png";
import ResourcePlayerAbajoNadando4 from "../resources/player/abajo/nadando/4.png";
import ResourcePlayerAbajoNadando5 from "../resources/player/abajo/nadando/5.png";
import ResourcePlayerAbajoNadando6 from "../resources/player/abajo/nadando/6.png";

import ResourcePlayerArriba0 from "../resources/player/arriba/0.png";
import ResourcePlayerArriba1 from "../resources/player/arriba/1.png";
import ResourcePlayerArriba2 from "../resources/player/arriba/2.png";
import ResourcePlayerArriba3 from "../resources/player/arriba/3.png";
import ResourcePlayerArriba4 from "../resources/player/arriba/4.png";
import ResourcePlayerArriba5 from "../resources/player/arriba/5.png";
import ResourcePlayerArriba6 from "../resources/player/arriba/6.png";
import ResourcePlayerArriba7 from "../resources/player/arriba/7.png";
import ResourcePlayerArriba8 from "../resources/player/arriba/8.png";
import ResourcePlayerArriba9 from "../resources/player/arriba/9.png";
import ResourcePlayerArriba10 from "../resources/player/arriba/10.png";
import ResourcePlayerArribaGolpe from "../resources/player/arriba/golpe.png";
import ResourcePlayerArribaNadando0 from "../resources/player/arriba/nadando/0.png";
import ResourcePlayerArribaNadando1 from "../resources/player/arriba/nadando/1.png";
import ResourcePlayerArribaNadando2 from "../resources/player/arriba/nadando/2.png";
import ResourcePlayerArribaNadando3 from "../resources/player/arriba/nadando/3.png";
import ResourcePlayerArribaNadando4 from "../resources/player/arriba/nadando/4.png";
import ResourcePlayerArribaNadando5 from "../resources/player/arriba/nadando/5.png";
import ResourcePlayerArribaNadando6 from "../resources/player/arriba/nadando/6.png";

import ResourcePiedra1 from "../resources/piedra/1.png";
import ResourcePiedra2 from "../resources/piedra/2.png";

const sketch = p => {
  p.preload = () => {
    setSketch(p);

    Recursos.imagenes.arbol1 = p.loadImage("https://i.imgur.com/I3dMA6A.png");
    Recursos.imagenes.arbustoRojo1 = p.loadImage("https://i.imgur.com/0VYPYk7.png");
    Recursos.imagenes.arbustoRojo2 = p.loadImage("https://i.imgur.com/cUMQFlg.png");
    Recursos.imagenes.arbustoAzul1 = p.loadImage("https://i.imgur.com/20y6TCJ.png");
    Recursos.imagenes.arbustoAzul2 = p.loadImage("https://i.imgur.com/QEMWhsu.png");
    Recursos.imagenes.arbustoVioleta1 = p.loadImage("https://i.imgur.com/yOOvMP4.png");
    Recursos.imagenes.arbustoVioleta2 = p.loadImage("https://i.imgur.com/Z2XKvUU.png");
    Recursos.imagenes.florAzul = p.loadImage("https://i.imgur.com/hbmo6cM.png");
    Recursos.imagenes.florRoja = p.loadImage("https://i.imgur.com/bXxm15u.png");
    Recursos.imagenes.florVioleta = p.loadImage("https://i.imgur.com/SROeHea.png");
    Recursos.imagenes.florBlanca = p.loadImage("https://i.imgur.com/fNVHhz0.png");
    Recursos.imagenes.florAmarilla = p.loadImage("https://i.imgur.com/XD1xfaZ.png");

    Recursos.imagenes.hacha1 = p.loadImage(ResourceArmaHacha1);
    Recursos.imagenes.hacha2 = p.loadImage(ResourceArmaHacha2);
    Recursos.imagenes.hacha3 = p.loadImage(ResourceArmaHacha3);
    Recursos.imagenes.pala1 = p.loadImage(ResourceArmaPala1);
    Recursos.imagenes.pala2 = p.loadImage(ResourceArmaPala2);
    Recursos.imagenes.pala3 = p.loadImage(ResourceArmaPala3);
    Recursos.imagenes.pico1 = p.loadImage(ResourceArmaPico1);
    Recursos.imagenes.pico2 = p.loadImage(ResourceArmaPico2);
    Recursos.imagenes.pico3 = p.loadImage(ResourceArmaPico3);

    Recursos.imagenes.playerIzquierda0 = p.loadImage(ResourcePlayerIzquierda0);
    Recursos.imagenes.playerIzquierda1 = p.loadImage(ResourcePlayerIzquierda1);
    Recursos.imagenes.playerIzquierda2 = p.loadImage(ResourcePlayerIzquierda2);
    Recursos.imagenes.playerIzquierda3 = p.loadImage(ResourcePlayerIzquierda3);
    Recursos.imagenes.playerIzquierda4 = p.loadImage(ResourcePlayerIzquierda4);
    Recursos.imagenes.playerIzquierda5 = p.loadImage(ResourcePlayerIzquierda5);
    Recursos.imagenes.playerIzquierda6 = p.loadImage(ResourcePlayerIzquierda6);
    Recursos.imagenes.playerIzquierda7 = p.loadImage(ResourcePlayerIzquierda7);
    Recursos.imagenes.playerIzquierda8 = p.loadImage(ResourcePlayerIzquierda8);
    Recursos.imagenes.playerIzquierda9 = p.loadImage(ResourcePlayerIzquierda9);
    Recursos.imagenes.playerIzquierdaGolpeando = p.loadImage(ResourcePlayerIzquierdaGolpe);
    Recursos.imagenes.playerIzquierdaNadando0 = p.loadImage(ResourcePlayerIzquierdaNadando0);
    Recursos.imagenes.playerIzquierdaNadando1 = p.loadImage(ResourcePlayerIzquierdaNadando1);
    Recursos.imagenes.playerIzquierdaNadando2 = p.loadImage(ResourcePlayerIzquierdaNadando2);
    Recursos.imagenes.playerIzquierdaNadando3 = p.loadImage(ResourcePlayerIzquierdaNadando3);
    Recursos.imagenes.playerIzquierdaNadando4 = p.loadImage(ResourcePlayerIzquierdaNadando4);
    Recursos.imagenes.playerIzquierdaNadando5 = p.loadImage(ResourcePlayerIzquierdaNadando5);
    Recursos.imagenes.playerIzquierdaNadando6 = p.loadImage(ResourcePlayerIzquierdaNadando6);

    Recursos.imagenes.playerAbajo0 = p.loadImage(ResourcePlayerAbajo0);
    Recursos.imagenes.playerAbajo1 = p.loadImage(ResourcePlayerAbajo1);
    Recursos.imagenes.playerAbajo2 = p.loadImage(ResourcePlayerAbajo2);
    Recursos.imagenes.playerAbajo3 = p.loadImage(ResourcePlayerAbajo3);
    Recursos.imagenes.playerAbajo4 = p.loadImage(ResourcePlayerAbajo4);
    Recursos.imagenes.playerAbajo5 = p.loadImage(ResourcePlayerAbajo5);
    Recursos.imagenes.playerAbajo6 = p.loadImage(ResourcePlayerAbajo6);
    Recursos.imagenes.playerAbajo7 = p.loadImage(ResourcePlayerAbajo7);
    Recursos.imagenes.playerAbajo8 = p.loadImage(ResourcePlayerAbajo8);
    Recursos.imagenes.playerAbajo9 = p.loadImage(ResourcePlayerAbajo9);
    Recursos.imagenes.playerAbajo10 = p.loadImage(ResourcePlayerAbajo10);
    Recursos.imagenes.playerAbajoGolpeando = p.loadImage(ResourcePlayerAbajoGolpe);
    Recursos.imagenes.playerAbajoNadando0 = p.loadImage(ResourcePlayerAbajoNadando0);
    Recursos.imagenes.playerAbajoNadando1 = p.loadImage(ResourcePlayerAbajoNadando1);
    Recursos.imagenes.playerAbajoNadando2 = p.loadImage(ResourcePlayerAbajoNadando2);
    Recursos.imagenes.playerAbajoNadando3 = p.loadImage(ResourcePlayerAbajoNadando3);
    Recursos.imagenes.playerAbajoNadando4 = p.loadImage(ResourcePlayerAbajoNadando4);
    Recursos.imagenes.playerAbajoNadando5 = p.loadImage(ResourcePlayerAbajoNadando5);
    Recursos.imagenes.playerAbajoNadando6 = p.loadImage(ResourcePlayerAbajoNadando6);

    Recursos.imagenes.playerArriba0 = p.loadImage(ResourcePlayerArriba0);
    Recursos.imagenes.playerArriba1 = p.loadImage(ResourcePlayerArriba1);
    Recursos.imagenes.playerArriba2 = p.loadImage(ResourcePlayerArriba2);
    Recursos.imagenes.playerArriba3 = p.loadImage(ResourcePlayerArriba3);
    Recursos.imagenes.playerArriba4 = p.loadImage(ResourcePlayerArriba4);
    Recursos.imagenes.playerArriba5 = p.loadImage(ResourcePlayerArriba5);
    Recursos.imagenes.playerArriba6 = p.loadImage(ResourcePlayerArriba6);
    Recursos.imagenes.playerArriba7 = p.loadImage(ResourcePlayerArriba7);
    Recursos.imagenes.playerArriba8 = p.loadImage(ResourcePlayerArriba8);
    Recursos.imagenes.playerArriba9 = p.loadImage(ResourcePlayerArriba9);
    Recursos.imagenes.playerArriba10 = p.loadImage(ResourcePlayerArriba10);
    Recursos.imagenes.playerArribaGolpeando = p.loadImage(ResourcePlayerArribaGolpe);
    Recursos.imagenes.playerArribaNadando0 = p.loadImage(ResourcePlayerArribaNadando0);
    Recursos.imagenes.playerArribaNadando1 = p.loadImage(ResourcePlayerArribaNadando1);
    Recursos.imagenes.playerArribaNadando2 = p.loadImage(ResourcePlayerArribaNadando2);
    Recursos.imagenes.playerArribaNadando3 = p.loadImage(ResourcePlayerArribaNadando3);
    Recursos.imagenes.playerArribaNadando4 = p.loadImage(ResourcePlayerArribaNadando4);
    Recursos.imagenes.playerArribaNadando5 = p.loadImage(ResourcePlayerArribaNadando5);
    Recursos.imagenes.playerArribaNadando6 = p.loadImage(ResourcePlayerArribaNadando6);

    Recursos.imagenes.piedra1 = p.loadImage(ResourcePiedra1);
    Recursos.imagenes.piedra2 = p.loadImage(ResourcePiedra2);

    Colores.agua1 = p.color(100, 181, 246);
    Colores.agua2 = p.color(66, 165, 245);
    Colores.agua3 = p.color(33, 150, 243);
    Colores.agua4 = p.color(30, 136, 229);
    Colores.agua5 = p.color(25, 118, 210);
    Colores.agua6 = p.color(21, 101, 192);
    Colores.tierra1 = p.color("#795548");
    Colores.tierra2 = p.color("#6d4c41");
    Colores.tierra3 = p.color("#5d4037");
    Colores.pasto1 = p.color("#66bb6a");
    Colores.pasto2 = p.color("#4caf50");
    Colores.pasto3 = p.color("#43a047");
    Colores.arena = p.color(255, 236, 179);
    Colores.nieve = p.color(255);
    Colores.nave = p.color("#FFD700");

    Colores.diamante = p.color(0, 255, 255);
    Colores.piedra = p.color("#9e9e9e");
    Colores.oro = p.color("#FFD700");

    Colores.colorSalud = p.color(100, 221, 23);
    Colores.colorHambre = p.color(229, 57, 53);
    Colores.colorOxigeno = p.color(3, 155, 229);

    State.initialMapX = p.floor((Parametros.mapaRows - Parametros.canvasRows) / 2);
    State.initialMapY = p.floor((Parametros.mapaCols - Parametros.canvasCols) / 2);

    //Inventario
    // State.inventario = new Inventario();

    //HUD
    State.hud = new HUD();

    //Genero el mapa
    Rules_Mapa.initMapa();
    Rules_Mapa.crearMapa();

    //Pos
    let pos = Rules_Player.calcularPosicion();
    State.player = new Player(pos);

    //Item mapa
    State.itemMapa = State.mapa[pos.x][pos.y];
  };

  p.setup = () => {
    p.frameRate(30);
    let canvasWidth = Parametros.canvasItemWidth * Parametros.canvasRows;
    let canvasHeight = Parametros.canvasItemHeight * Parametros.canvasCols;
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(255);
  };

  p.keyPressed = () => {
    const key = p.key;

    if (key == "1") {
      const player = State.player;
      player.setArma(player.armaPico);
      return;
    }

    if (key == "2") {
      const player = State.player;
      player.setArma(player.armaPala);
      return;
    }

    if (key == "3") {
      const player = State.player;
      player.setArma(player.armaHacha);
      return;
    }

    // if (key == "i") {
    //   State.inventario.abierto = !State.inventario.abierto;
    //   return;
    // }

    if (key == " ") {
      Rules_Player.golpear();
      return;
    }

    if (key == "m") {
      Rules_Mapa.reiniciar();
      return;
    }

    if (key == "ArrowLeft") {
      Rules_Player.mover("l");
      return;
    }

    if (key == "ArrowRight") {
      Rules_Player.mover("r");
      return;
    }

    if (key == "ArrowDown") {
      Rules_Player.mover("d");
      return;
    }

    if (key == "ArrowUp") {
      Rules_Player.mover("u");
      return;
    }
  };

  p.keyReleased = () => {
    const key = p.key;

    if (key == "ArrowLeft" || key == "ArrowRight" || key == "ArrowDown" || key == "ArrowUp") {
      Rules_Player.dejarDeMover();
    }
  };

  p.draw = () => {
    const player = State.player;
    // const inventario = State.inventario;
    const hud = State.hud;

    const canvasRows = Parametros.canvasRows;
    const canvasCols = Parametros.canvasCols;
    const canvasItemWidth = Parametros.canvasItemWidth;
    const canvasWidth = Parametros.canvasItemWidth * Parametros.canvasRows;
    const canvasHeight = Parametros.canvasItemHeight * Parametros.canvasCols;
    const mapaCols = Parametros.mapaCols;
    const mapaRows = Parametros.mapaRows;

    //Reiniciar mapa
    if (State.reiniciandoMapa == true) {
      p.fill(255);
      p.noStroke();
      p.rect(0, 0, canvasWidth, canvasHeight);

      p.fill(0);
      p.textAlign(getSketch().LEFT, getSketch().TOP);
      p.text("Cargando planeta....", 0, 0);
      return;
    }

    // if (inventario.abierto == false) {
    // p.fill(0);

    //Terreno
    for (let i = 0; i < canvasRows; i++) {
      for (let j = 0; j < canvasCols; j++) {
        let mi = i + State.initialMapX + State.offsetX;
        let mj = j + State.initialMapY + State.offsetY;

        if (mi < 0 || mj < 0 || mi >= mapaRows || mj >= mapaCols) {
          p.fill(255);
          p.noStroke();
          p.rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
        } else {
          try {
            let mapaItem = State.mapa[mi][mj];
            mapaItem.draw(i, j, canvasItemWidth);

            //Huellas
            player.drawHuella(i, j, canvasItemWidth, mi, mj);

            // //Grilla
            // p.stroke(255, 10);
            // p.fill(0, 0);
            // p.rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);

            //Item
            if (mapaItem.items) {
              mapaItem.items.forEach(element => {
                element.draw(i, j, canvasItemWidth);
              });
            }
          } catch (ex) {
            p.fill(255);
            p.noStroke();
            p.rect(i * canvasItemWidth, j * canvasItemWidth, canvasItemWidth, canvasItemWidth);
          }
        }
      }
    }

    // //Monstruos
    // for (let i = 0; i < canvasRows; i++) {
    //   for (let j = 0; j < canvasCols; j++) {
    //     let mi = i + State.initialMapX + State.offsetX;
    //     let mj = j + State.initialMapY + State.offsetY;

    //     State.monstruos.forEach(monstruo => {
    //       if (monstruo.muerto == true) return;
    //       if (monstruo.i != mi || monstruo.j != mj) return;
    //       monstruo.show(i * canvasItemWidth, j * canvasItemWidth);
    //     });
    //   }
    // }

    //HUD
    hud.show();
    // }

    //Player
    player.show();

    //Inventario
    // inventario.show();
  };
};

export default sketch;
