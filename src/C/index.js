import {
  instantiateStreaming,
  log,
  getModuleExports,
  getModuleImports,
} from "../utils/index.js";

(async function C() {
  const imports = {
    env: {
      exit() {},
    },
  };

  const wasm = await instantiateStreaming("./C/sum.wasm", imports);

  log("compile C - module exports", getModuleExports(wasm.module));
  log("compile C - module imports", getModuleImports(wasm.module));

  log("compile C - print", wasm.instance.exports.sum(10, 10));
})();
