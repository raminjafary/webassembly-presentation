const fs = require("fs");
const { WASI } = require("wasi");

const wasi = new WASI({
  args: process.argv,
  env: process.env,
  preopens: {
    "/sandbox": "./",
  },
});

const imports = {
  wasi_unstable: wasi.wasiImport,
};

(async () => {
  const wasm = await WebAssembly.instantiate(
    fs.readFileSync(__dirname + "/hello.wasm"),
    imports
  );
  wasi.start(wasm.instance);
})();
