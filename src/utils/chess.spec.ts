//test wasm chess

import { Chess } from "chess.js";
import { describe, it } from "mocha";
import { expect } from "chai";
let wasm: typeof import("../wasm/pkg/wasm");

//TODO: fix wasm.to_dests is not a function
describe("Wasm chess", () => {
  before(async () => {
    wasm = await import("../wasm/pkg/wasm");
    console.log(wasm.to_dests(new Chess()));
  });
  it("to_dests", () => {
    const chess = new Chess();
    console.log(wasm, wasm.to_dests);
    const dests = wasm.to_dests(chess);
    console.log(dests);
    expect(dests.size).greaterThan(0);
  });
});
