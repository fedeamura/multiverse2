import { getSketch } from "../_sketch";
import State from "../_state";

const metodos = {
  nuevoMensaje: mensaje => {
    if (this.timeoutMensaje) clearTimeout(this.timeoutMensaje);
    State.mensaje = mensaje;
    this.timeoutMensaje = setTimeout(() => {
      State.mensaje = undefined;
    }, 5000);
  }
};

export default metodos;
