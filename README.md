# webassembly-presentation

# Talk on WebAssembly

To compile `C/C++` code into Wasm, you can either install `Emscripten` or simply use the [official Docker image](https://hub.docker.com/r/emscripten/emsdk):

### Using Emscripten’s Module Object

```bash
$ docker run --rm -v $(pwd):/src emscripten/emsdk emcc sum-emcc-module.c -o sum-emcc-module.js
```

This will generate two files: `sum-emcc-module.wasm` and `sum-emcc-module.js`. You can run it in Node.js:

```bash
$ node sum-emcc-module.js
3
```

`Emscripten` can also create an HTML page to run the `Wasm` module in:

```bash
$ docker run --rm -v $(pwd):/src emscripten/emsdk emcc EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' sum-emcc-module.c -o sum-emcc-module.html
```

### Using WebAssembly Object

Emscripten can also generate standalone `Wasm` module neither with `JS` glue code nor `WASI` interface:

```bash
$ docker run --rm -v $(pwd):/src emscripten/emsdk emcc -Os -sSTANDALONE_WASM=1 -sDISABLE_EXCEPTION_CATCHING=0 -sWASM_ASYNC_COMPILATION=0 -sBINARYEN_ASYNC_COMPILATION=0 -sWASM=1 -sSIDE_MODULE=1 sum.c -o sum.wasm
```

Alternatively, you can compile `C/C++` with [LLVM](https://llvm.org/) instead of `Emscripten`. See [LLVM installation](https://apt.llvm.org/) guide.

**Resources**:

[standalone WebAssembly binaries using Emscripten](https://v8.dev/blog/emscripten-standalone-wasm)

[Compiling C to WebAssembly without Emscripten](https://surma.dev/things/c-to-webassembly/)

[WebAssembly Standalone](https://github.com/emscripten-core/emscripten/wiki/WebAssembly-Standalone)

[Compiling a New C/C++ Module to WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)

[Compiling C to WebAssembly and Running It - without Emscripten](https://depth-first.com/articles/2019/10/16/compiling-c-to-webassembly-and-running-it-without-emscripten/)

[Shrinking WebAssembly and JavaScript code sizes in Emscripten](https://hacks.mozilla.org/2018/01/shrinking-webassembly-and-javascript-code-sizes-in-emscripten/)