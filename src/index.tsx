import React from "react";
import * as ReactDOM from "react-dom/client";
import styled from "styled-components";
import { GameStage } from "./Gamestage";

const AppBody = styled.div`
  margin: 0 auto;
  height: 100%;
`;

function App() {

  return (
    <AppBody>
      <GameStage/>
    </AppBody>
  );
}

const element = document.getElementById("app");

if (element) {
  ReactDOM.createRoot(element).render(<App />);
}
