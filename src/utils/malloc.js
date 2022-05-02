export class Malloc {
  constructor(buffer) {
    this.buffer = buffer;
    this.offset = 0;
  }

  allocUint32(len) {
    const int32Offset = Math.ceil(this.offset / Uint32Array.BYTES_PER_ELEMENT);
    const beginOffset = int32Offset * Uint32Array.BYTES_PER_ELEMENT;
    const endOffset = (int32Offset + len) * Uint32Array.BYTES_PER_ELEMENT;
    const arrayBuffer = new Uint32Array(this.buffer, beginOffset, len);
    this.offset = endOffset;
    return arrayBuffer.fill(0);
  }

  allocUint8(len) {
    const arrayBuffer = new Uint8Array(this.buffer, this.offset, len);
    this.offset += len;
    return arrayBuffer.fill(0);
  }
}
