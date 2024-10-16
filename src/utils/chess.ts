import { Api } from "chessground/api";
import { Color, Key } from "chessground/types";
import { Chess, SQUARES } from "chess.js";

import { to_dests } from "@/wasm/pkg/wasm";

export { to_dests };

export function toDestsJS(chess: Chess): Map<Key, Key[]> {
  const dests = new Map();
  SQUARES.forEach((s) => {
    const ms = chess.moves({ square: s, verbose: true });
    console.log("ms js", ms);
    if (ms.length)
      dests.set(
        s,
        ms.map((m) => m.to),
      );
  });
  return dests;
}

export function toColor(chess: Chess): Color {
  return chess.turn() === "w" ? "white" : "black";
}

export function playOtherSide(cg: Api, chess: Chess) {
  return (orig: string, dest: string) => {
    chess.move({ from: orig, to: dest });
    cg.set({
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: to_dests(chess),
      },
    });
  };
}

export function aiPlay(cg: Api, chess: Chess, delay: number, firstMove: boolean) {
  return (orig: string, dest: string) => {
    chess.move({ from: orig, to: dest });
    setTimeout(() => {
      const moves = chess.moves({ verbose: true });
      const move = firstMove ? moves[0] : moves[Math.floor(Math.random() * moves.length)];
      chess.move(move.san);
      cg.move(move.from, move.to);
      cg.set({
        turnColor: toColor(chess),
        movable: {
          color: toColor(chess),
          dests: to_dests(chess),
        },
      });
      cg.playPremove();
    }, delay);
  };
}
