import React from "react";
import P5Wrapper from "react-p5-wrapper";
import Juego from "./juego";

class App extends React.Component {
  render() {
    return <P5Wrapper sketch={Juego} />;
  }
}
export default App;
