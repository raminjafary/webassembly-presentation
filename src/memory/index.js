import {
  instantiateStreaming,
  log,
  getModuleExports,
  getModuleImports,
} from "../utils/index.js";
import { Malloc } from "../utils/malloc.js";

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
})();

(async function heapMemory() {
  const pageSize = 64 * 1024;

  const newSize = 64 * 2 * 1024;

  const memory = new WebAssembly.Memory({ initial: 1 });

  const currentSize = memory.buffer.byteLength;

  const malloc = new Malloc(memory.buffer);

  const i32 = malloc.allocUint32(3);
  i32.set([1, 2, 3]);

  const i8 = malloc.allocUint8(4);
  new TextEncoder().encodeInto("ABCD", i8);

  log("heap memory - i32", i32);
  log("heap memory - i8", new TextDecoder().decode(i8));

  // wasm.instance.exports.add(i32.byteOffset, i32.length)

  if (currentSize < newSize) {
    const pages = Math.ceil(newSize - currentSize) / pageSize;
    memory.grow(pages);
  }
})();
