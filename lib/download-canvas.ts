/**
 * Save an HTMLCanvasElement as a PNG download, optionally rotated by a
 * multiple of 90 degrees. The output canvas swaps dimensions for 90/270
 * so the rendered template fills the full image without padding.
 */
export function downloadCanvas(
  source: HTMLCanvasElement,
  rotation: number,
  filename: string
) {
  const normalized = ((rotation % 360) + 360) % 360;
  const sw = source.width;
  const sh = source.height;

  let outCanvas: HTMLCanvasElement = source;

  if (normalized !== 0) {
    const swap = normalized === 90 || normalized === 270;
    const outW = swap ? sh : sw;
    const outH = swap ? sw : sh;

    const temp = document.createElement("canvas");
    temp.width = outW;
    temp.height = outH;
    const ctx = temp.getContext("2d");
    if (!ctx) return;

    ctx.translate(outW / 2, outH / 2);
    ctx.rotate((normalized * Math.PI) / 180);
    ctx.drawImage(source, -sw / 2, -sh / 2);

    outCanvas = temp;
  }

  outCanvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
