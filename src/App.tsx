import React, { useEffect } from "react";
import Chessground from "./components/Chessground";
import { to_dests } from "./utils/chess";
import { Chess } from "chess.js";

const App = () => {
  useEffect(() => {
    console.log("Chessground useEffect", to_dests(new Chess()));
  }, []);
  return (
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
            dests: to_dests(new Chess()),
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
};

export default App;
