use wasm::chess::{to_dests, Chess};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_to_dests_initial() {
        let chess = Chess::new();
        let dests = to_dests(&chess);
        // assert_eq!(
        //     dests.get("e4"),
        //     vec!["c3", "d2", "f2", "g3", "g5", "f6", "d6", "c5"]
        // );
        println!("dests {:?}", dests);
    }
}
