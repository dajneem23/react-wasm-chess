use crate::{console_log, utils::log};
use serde::ser::Serializer;
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::{from_value, to_value};
use wasm_bindgen::convert::{FromWasmAbi, IntoWasmAbi, WasmAbi};
use wasm_bindgen::prelude::*;
use web_sys::js_sys::{Array, Map, Object, Reflect};

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct MovesParams {
    square: String,
    verbose: bool,
    piece: Option<String>,
}
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Move {
    color: String,
    from: String,
    to: String,
    piece: String,
    captured: Option<String>,
    promotion: Option<String>,
    flags: String,
    san: String,
    lan: String,
    before: String,
    after: String,
}
#[wasm_bindgen]
impl Move {
    #[wasm_bindgen(constructor)]
    pub fn new(
        color: String,
        from: String,
        to: String,
        piece: String,
        captured: Option<String>,
        promotion: Option<String>,
        flags: String,
        san: String,
        lan: String,
        before: String,
        after: String,
    ) -> Move {
        Move {
            color,
            from,
            to,
            piece,
            captured,
            promotion,
            flags,
            san,
            lan,
            before,
            after,
        }
    }
}

#[wasm_bindgen(raw_module = "../../../node_modules/chess.js/dist/esm/chess.js")]
extern "C" {
    pub type Chess;

    #[wasm_bindgen(constructor)]
    pub fn new() -> Chess;

    #[wasm_bindgen(method)]
    fn moves(this: &Chess, params: &JsValue) -> JsValue;

    static SQUARES: Array;
}
#[wasm_bindgen]
impl Chess {
    pub fn get_moves(&self, params: &MovesParams) -> Vec<Move> {
        let js_value = to_value(params).unwrap();
        let js_moves = self.moves(&js_value);
        log(&format!("js_moves {:?}", js_moves));
        let mut moves = Vec::new();
        let js_moves_array = Array::from(&js_moves);
        let obj = Object::try_from(&js_moves);
        let to = Reflect::get(&obj.unwrap(), &JsValue::from_str("to"))
            .unwrap()
            .as_string()
            .unwrap_or_default();

        log(&format!("obj {:?}", obj));
        log(&format!("js_moves_array {:?}", js_moves_array));

        for js_move in js_moves_array.iter() {
            let obj = Object::try_from(&js_move).unwrap();
            log(&format!("js_move_obj {:?}", obj));
            let color = Reflect::get(&obj, &JsValue::from_str("color"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            log(&format!("js_move color {:?}", &color));

            let from = Reflect::get(&obj, &JsValue::from_str("from"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            let to = Reflect::get(&obj, &JsValue::from_str("to"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            let piece = Reflect::get(&obj, &JsValue::from_str("piece"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            let captured = Reflect::get(&obj, &JsValue::from_str("captured"))
                .unwrap()
                .as_string();
            let promotion = Reflect::get(&obj, &JsValue::from_str("promotion"))
                .unwrap()
                .as_string();
            let flags = Reflect::get(&obj, &JsValue::from_str("flags"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            let san = Reflect::get(&obj, &JsValue::from_str("san"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            let lan = Reflect::get(&obj, &JsValue::from_str("lan"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            let before = Reflect::get(&obj, &JsValue::from_str("before"))
                .unwrap()
                .as_string()
                .unwrap_or_default();
            let after = Reflect::get(&obj, &JsValue::from_str("after"))
                .unwrap()
                .as_string()
                .unwrap_or_default();

            let move_obj = Move::new(
                color, from, to, piece, captured, promotion, flags, san, lan, before, after,
            );
            moves.push(move_obj);
        }

        moves
    }
}

#[wasm_bindgen]
pub fn to_dests(chess: &Chess) -> Map {
    let rs = Map::new();
    for sq in SQUARES.iter() {
        let params = &MovesParams {
            square: sq.as_string().unwrap(),
            verbose: true,
            piece: None,
        };
        console_error_panic_hook::set_once();
        //list of moves
        let ms = chess.get_moves(&params);
        if ms.len() > 0 {
            let dests: Array = Array::new();
            for m in ms.iter() {
                dests.push(&to_value(&m.to).unwrap());
                // dests.push(&m);
            }
            rs.set(&sq, &dests);
        }
    }
    rs
}
