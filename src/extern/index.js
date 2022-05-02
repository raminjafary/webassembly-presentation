import {
  instantiateStreaming,
  log,
  getModuleExports,
  getModuleImports,
} from "../utils/index.js";

(async function extern() {
  const imports = {
    env: {
      print: (arg) => {
        console.log(arg);
      },
      add(a, b) {
        return a + b;
      },
    },
  };

  const wasm = await instantiateStreaming("./extern/extern.wasm", imports);

  log("extern - module exports", getModuleExports(wasm.module));
  log("extern - module exports", getModuleImports(wasm.module));
  log("extern - print", wasm.instance.exports.log(1000));
  log("extern - add", wasm.instance.exports.add(2, 4));
})();
