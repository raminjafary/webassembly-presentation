use wasm_bindgen::prelude::*;
use comrak::{markdown_to_html, ComrakOptions};


#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("hello {}", name))
}

#[wasm_bindgen]
pub fn parse(input: &str) -> String {
    markdown_to_html(&input.to_string(), &ComrakOptions::default())
}