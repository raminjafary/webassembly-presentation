import { instantiateStreaming, log, getModuleExports } from "../utils/index.js";

(async function params() {
  const wasm = await instantiateStreaming("./params/params.wasm");

  log("param - module exports", getModuleExports(wasm.module));

  log("param - addi32", wasm.instance.exports.addInt32(-1, 10));
  log("param - addi64", wasm.instance.exports.addInt64(2n, 29n));
  log("param - addf32", wasm.instance.exports.addFloat32(-2.2, 1.2));
  log("param - addf64", wasm.instance.exports.addFloat64(200.2, 400.2));
})();
