const fs = require("fs");

(async function () {
  const imports = {
    env: {
      exit() {},
    },
  };
  const wasm = await WebAssembly.instantiate(
    fs.readFileSync("sum.wasm"),
    imports
  );
  console.log(wasm.instance.exports.sum(2, 4));
})();
