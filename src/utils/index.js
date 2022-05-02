export async function instantiateStreaming(modulePath, imports = {}) {
  const byteCode = await fetch(modulePath);

  return await WebAssembly.instantiateStreaming(byteCode, imports);
}

export async function instantiate(modulePath, imports = {}) {
  const byteCode = await fetch(modulePath);

  const arrayBuffer = await byteCode.arrayBuffer();

  return await WebAssembly.instantiate(arrayBuffer, imports);
}

export async function compileAndInstance(modulePath, imports = {}) {
  const byteCode = await fetch(modulePath);

  const arrayBuffer = await byteCode.arrayBuffer();

  const module = await WebAssembly.compile(arrayBuffer);

  return new WebAssembly.Instance(module, imports);
}

export async function compileAndModule(modulePath, imports = {}) {
  const byteCode = await fetch(modulePath);

  const arrayBuffer = await byteCode.arrayBuffer();

  const module = new WebAssembly.Module(arrayBuffer, imports);

  return new WebAssembly.Instance(module);
}

export async function compileAndInstantiate(modulePath, imports = {}) {
  const byteCode = await fetch(modulePath);

  const arrayBuffer = await byteCode.arrayBuffer();

  const module = await WebAssembly.compile(arrayBuffer);

  return await WebAssembly.instantiate(module, imports);
}

export async function compileStreaming(modulePath, imports = {}) {
  const byteCode = await fetch(modulePath);

  const module = await WebAssembly.compileStreaming(byteCode);

  return await WebAssembly.instantiate(module, imports);
}

export async function instantiateStreamingAndCreateInstanceLater(
  modulePath,
  imports = {}
) {
  const wasm = await WebAssembly.instantiateStreaming(fetch(modulePath));

  return await WebAssembly.instantiate(wasm.module, imports);
}

export function log(str, arg) {
  console.log(
    `%c${str}`,
    `color: white;
    font-size: 14px;
    padding: 2px 4px;
    border-radius: 2px;
    font-weight: bold;
    background-color: green`,
    arg
  );
  console.log();
}
