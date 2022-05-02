import {
  instantiateStreaming,
  log,
  getModuleExports,
  getModuleImports,
} from "../utils/index.js";

(async function strings() {
  const hello = "hello";

  const memory = new WebAssembly.Memory({ initial: 1 });

  const encoder = new TextEncoder("utf8");

  const buffer = new Uint8Array(memory.buffer, 0, hello.length);
  encoder.encodeInto(hello, buffer);

  const imports = {
    env: {
      mem: memory,
    },
  };

  const wasm = await instantiateStreaming("./strings/strings-to.wasm", imports);

  log("strings - module exports", getModuleExports(wasm.module));
  log("strings - module imports", getModuleImports(wasm.module));

  const deocder = new TextDecoder("utf8");
  log("strings - before reverse", deocder.decode(buffer));
  wasm.instance.exports.reverse(hello.length);
  log("strings - after reverse buffer", deocder.decode(buffer));
})();

(async function strings() {})();
