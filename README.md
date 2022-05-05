# Talk on WebAssembly

## Work with WebAssembly directly

`WABT` is the WebAssembly Binary Toolkit intended for use in toolchains or other systems that want to manipulate WebAssembly files.

To translate from WebAssembly text format (`.wat`) to the WebAssembly binary format (`.wasm)` you can use `wat2wasm`.

```bash
$ wat2wasm test.wat -o text.wasm
```

You can use `wasm2wat` to do the inverse of `wat2wasm`, translating from the binary format back to the text format.

```bash
$ wasm2wat test.wasm -o text.wat
```

See [WABT](https://github.com/webassembly/wabt) to find out about other tools and installation guide.

## WASI

[WebAssembly System Interface](https://wasi.dev/) (WASI) is a family of APIs designed as a new standard engine-independent non-web system-oriented interface for WebAssembly. It enables working with files, networking, and other operating system features directly from Wasm.

As WASI is an experimental feature, the `--experimental-wasi-unstable-preview1` CLI argument is needed for this example to run:

```bash
$ node --experimental-wasi-unstable-preview1 index.js
hello
```

## C/C++ to WebAssembly

To compile `C/C++` code into Wasm, you can either install `Emscripten` or simply use the [official Docker image](https://hub.docker.com/r/emscripten/emsdk).
Emscripten complies not only C/C++ code, but any LLVM-based language, like Scala, Crystal, Haskell, Julia, Swift, or Ruby.

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

## Rust

You can use `wasm-pack` to compile code to WebAssembly as well as produce the right packaging for use in the browser.

```bash
$ cargo install wasm-pack
```

### Resources

[Standalone WebAssembly binaries using Emscripten](https://v8.dev/blog/emscripten-standalone-wasm)

[Compiling C to WebAssembly without Emscripten](https://surma.dev/things/c-to-webassembly/)

[WebAssembly Standalone](https://github.com/emscripten-core/emscripten/wiki/WebAssembly-Standalone)

[Compiling a New C/C++ Module to WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)

[Compiling C to WebAssembly and Running It - without Emscripten](https://depth-first.com/articles/2019/10/16/compiling-c-to-webassembly-and-running-it-without-emscripten/)

[Shrinking WebAssembly and JavaScript code sizes in Emscripten](https://hacks.mozilla.org/2018/01/shrinking-webassembly-and-javascript-code-sizes-in-emscripten/)

[Compiling from Rust to WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm)

[Emscripten](https://github.com/emscripten-core/emscripten)

[WABT: The WebAssembly Binary Toolk](https://github.com/webassembly/wabt)

[The LLVM Compiler Infrastructure](https://github.com/llvm/llvm-project)
