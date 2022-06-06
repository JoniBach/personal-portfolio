import React from "react";
import Theme from "./Theme";
import Button from "./components/button/Button";
import Surface from "./components/surface/Surface";
import Tree from "./components/tree/Tree";
import { data } from "./mock/tree";
import Ring from "./components/ring/Ring";
import { mockCircle } from "./mock/circle";
import Main from "./pages/main/Main";

const App = () => {
  return (
    <Theme>
      {/* <Surface> */}
      {/* <Button onClick={() => alert("hi")}>this is a button</Button> */}

      <Main />
      {/* </Surface> */}
    </Theme>
  );
};
export default App;
