import {
  instantiateStreaming,
  log,
  getModuleExports,
  getModuleImports,
} from "../utils/index.js";

(async function memory() {
  const memory = new WebAssembly.Memory({ initial: 1, maximum: 2 });

  const buffer = new Uint32Array(memory.buffer);

  for (let i = 0; i < 10; i++) {
    buffer[i] = i;
  }

  const imports = {
    env: {
      mem: memory,
    },
  };

  const wasm = await instantiateStreaming(
    "./memory/memory-alloc.wasm",
    imports
  );

  log("memory - module exports", getModuleExports(wasm.module));
  log("memory - module imports", getModuleImports(wasm.module));

  log("memory - sum buffer entries", wasm.instance.exports.sum(10));
})();

(async function sharedMemory() {
  const memory = new WebAssembly.Memory({ initial: 1, maximum: 2 });

  const imports = {
    env: {
      mem: memory,
    },
  };

  const buffer = new Uint8Array(memory.buffer);

  const wasm = await instantiateStreaming("./memory/math.wasm", imports);

  const wasm2 = new WebAssembly.Instance(wasm.module, imports);

  log("memory - module exports", getModuleExports(wasm.module));
  log("memory - module imports", getModuleImports(wasm.module));

  log("memory - sum shared memory", wasm.instance.exports.add(0, 1));

  log("memory - sum shared memory", wasm2.exports.add(0, 4));

  log("memory - sum shared memory", wasm2.exports.add(0, 4));

  console.log(buffer);
})();


(async function staticMemory() {
  const wasm = await instantiateStreaming("./memory/static-memory.wasm");

  log("static memory - module exports", getModuleExports(wasm.module));
  log("static memory - module imports", getModuleImports(wasm.module));

  const memory = wasm.instance.exports.memory
  
  log("static memory - int [3] = {1, 2, 3}", new Uint32Array(memory.buffer, 0, 3));
  log("static memory - int [6] = {'A', 'B', 'C', 'D'}", (new TextDecoder().decode((new Uint8Array(memory.buffer, 12, 4)))));
  log("static memory - int [2] = {7, 9}", new Uint32Array(memory.buffer, 16 , 2));
})();
