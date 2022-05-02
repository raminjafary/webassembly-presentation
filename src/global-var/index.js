import {
  instantiateStreaming,
  log,
  getModuleExports,
  getModuleImports,
} from "../utils/index.js";

(async function globalVar() {
  const counter = new WebAssembly.Global({ value: "i32", mutable: true }, 0);

  const imports = {
    env: {
      counter,
    },
  };

  const wasm = await instantiateStreaming("./global-var/global.wasm", imports);

  log("global-var - module exports", getModuleExports(wasm.module));
  log("global-var - module exports", getModuleImports(wasm.module));

  log(
    "global-var - counter - before increment",

    counter
  );
  wasm.instance.exports.increment(2, 4);

  log("global-var - counter - after increment", counter);
})();
