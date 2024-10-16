use serde::Serialize;
use serde_wasm_bindgen::to_value;
use wasm_bindgen::convert::{FromWasmAbi, IntoWasmAbi, WasmAbi};
use wasm_bindgen::prelude::*;
use web_sys::js_sys::{Array, Map, Reflect};

#[wasm_bindgen]
pub struct MovesParams {
    square: JsValue,
    verbose: bool,
    piece: Option<String>,
}
#[wasm_bindgen]
impl MovesParams {
    #[wasm_bindgen(constructor)]
    pub fn new(square: JsValue, verbose: bool, piece: Option<String>) -> MovesParams {
        MovesParams {
            square,
            verbose,
            piece,
        }
    }
}

// impl WasmAbi for MovesParams {
//     type Abi = <JsValue as IntoWasmAbi>::Abi;
// }

// impl Describe for MovesParams {
//     fn describe() {
//         JsValue::describe();
//     }
// }

#[wasm_bindgen(raw_module = "../../../node_modules/chess.js/dist/esm/chess.js")]
extern "C" {
    pub type Chess;

    #[wasm_bindgen(constructor)]
    pub fn new() -> Chess;

    #[wasm_bindgen(method)]
    fn moves(this: &Chess, params: &JsValue) -> Array;

    static SQUARES: Array;
}

#[wasm_bindgen]
pub fn to_dests(chess: &Chess) -> Map {
    let rs = Map::new();
    for sq in SQUARES.iter() {
        let ms = chess.moves(&JsValue::from(MovesParams::new(sq.clone(), true, None)));
        if ms.length() > 0 {
            let dests = Array::new();
            for m in ms.iter() {
                dests.push(&m);
            }
            rs.set(&sq, &dests);
        }
    }
    rs
}
