use wasm_bindgen::prelude::*;

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

// This is a simple function to demonstrate WebAssembly integration.
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! this mess come from wasm", name)
}
