import React from "react";
import Chessground from "./components/Chessground";
import { toDests } from "./utils/chess";
import { Chess } from "chess.js";

const App = () => (
  <div>
    <h1>Hello, Vite + React + WebAssembly!</h1>
    <Chessground
      update={(params) => {}}
      config={{
        turnColor: "white",
        orientation: "white",
        movable: {
          free: false,
          color: "both",
          showDests: true,
          rookCastle: true,
          dests: toDests(new Chess()),
          events: {
            after: (orig, dest, metadata) => {
              console.log(orig, dest, metadata);
            },
          },
        },
        draggable: {
          showGhost: true,
        },
        events: {
          move: (orig, dest, capturedPiece) => {
            console.log("move", orig, dest, capturedPiece);
          },
          dropNewPiece: (piece, key) => {
            console.log("dropNewPiece", piece, key);
          },
          select: (key) => {
            console.log("select", key);
          },
        },
        highlight: {
          check: true,
          lastMove: true,
        },
        drawable: {
          enabled: true,
          visible: true,
          onChange: (elements) => {
            console.log("drawable.onChange", elements);
          },
        },
      }}
    />
  </div>
);

export default App;
