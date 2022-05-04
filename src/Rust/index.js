import init, { parse } from "./pkg/markdown_parser.js";
await init();

parse("#some markdown content");

performance.mark("wasm-start");
const start = performance.now();

parse("#some markdown content");

const end = performance.now();
performance.mark("wasm-end");
performance.measure("wasm", "wasm-start", "wasm-end");

console.log(`It took ${end - start} to do this in WebAssembly`);
