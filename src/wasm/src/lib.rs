pub mod chess;
pub mod utils;

use std::time::{Duration, SystemTime, UNIX_EPOCH};
use wasm_bindgen::prelude::*;

// This is a simple function to demonstrate WebAssembly integration.
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! this mess come from wasm", name)
}

// Called by our JS entry point to run the example
#[wasm_bindgen(start)]
fn run() {
    let window = web_sys::window().expect("should have a window in this context");
    let performance = window
        .performance()
        .expect("performance should be available");

    console_log!("the current time (in ms) is {}", performance.now());

    let start = perf_to_system(performance.timing().request_start());
    let end = perf_to_system(performance.timing().response_end());

    console_log!("request started at {}", humantime::format_rfc3339(start));
    console_log!("request ended at {}", humantime::format_rfc3339(end));
}

fn perf_to_system(amt: f64) -> SystemTime {
    let secs = (amt as u64) / 1_000;
    let nanos = (((amt as u64) % 1_000) as u32) * 1_000_000;
    UNIX_EPOCH + Duration::new(secs, nanos)
}
