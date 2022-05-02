import {
  instantiateStreaming,
  log,
  instantiate,
  compileAndInstance,
  compileAndModule,
  compileAndInstantiate,
  compileStreaming,
  instantiateStreamingAndCreateInstanceLater,
} from "../utils/index.js";

(async function runWasmInBrowser() {
  const wasmStreaming = await instantiateStreaming("./wasm-browser/add.wasm");

  log("instantiateStreaming", wasmStreaming.instance.exports.addf32(2.2, 4.2));

  const wasm = await instantiate("./wasm-browser/add.wasm");

  log("instantiate", wasm.instance.exports.addi32(2, 7));

  const wasmCompiledInstance = await compileAndInstance(
    "./wasm-browser/add.wasm"
  );

  log("compileAndInstance", wasmCompiledInstance.exports.addi32(2, 2));

  const compiledModule = await compileAndModule("./wasm-browser/add.wasm");

  log("compileAndModule", compiledModule.exports.addi32(2, 1));

  const CompileInstantiate = await compileAndInstantiate(
    "./wasm-browser/add.wasm"
  );

  log("CompileInstantiate", CompileInstantiate.exports.addi32(2, 19));

  const compileStream = await compileStreaming("./wasm-browser/add.wasm");

  log("compileStream", compileStream.exports.addi32(2, 5));

  const instantiateStreamingNewInstance =
    await instantiateStreamingAndCreateInstanceLater("./wasm-browser/add.wasm");

  log(
    "instantiateStreamingNewInstance",
    instantiateStreamingNewInstance.exports.addi32(2, 1)
  );
})();
