import {
  instantiateStreaming,
  log,
  getModuleExports,
  getModuleImports,
} from "../utils/index.js";

(async function table() {
  const wasm = await instantiateStreaming("./table/table.wasm");

  const table = wasm.instance.exports.table;

  table.set(0, wasm.instance.exports.moveRight);
  table.set(1, wasm.instance.exports.moveLeft);
  table.set(2, wasm.instance.exports.moveUp);
  table.set(3, wasm.instance.exports.moveDown);

  wasm.instance.exports.loop();
  wasm.instance.exports.loop();

  let positions = new Int32Array(wasm.instance.exports.memory.buffer);
  log("Ship #0 locate at ", "(" + positions[0] + ", " + positions[1] + ")");
  log("Ship #0 locate at ", "(" + positions[2] + ", " + positions[3] + ")");
  log("Ship #0 locate at ", "(" + positions[4] + ", " + positions[5] + ")");
  log("Ship #0 locate at ", "(" + positions[6] + ", " + positions[7] + ")");

  log("table - module exports", getModuleExports(wasm.module));
  log("table - module imports", getModuleImports(wasm.module));
})();
