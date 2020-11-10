/**
 * @module toBase64 - 將圖片轉換成 base64
 * @param {object<HTMLImageElement>} img - 要轉換的圖
 * @param {string} type - 轉換類型
 */
export function toBase64(img, option = {}) {
  // image/png
  const { width, height, top, left, type } = option;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const imgWidth = img.naturalWidth ?? img.width;
  const imgHeight = img.naturalHeight ?? img.height;
  canvas.width = width ?? imgWidth;
  canvas.height = height ?? imgHeight;
  let dx = left ?? 0;
  let dy = top ?? 0;
  const xRatio = (canvas.width - dx) / imgWidth;
  const yRatio = (canvas.height - dy) / imgHeight;
  const ratio = xRatio > yRatio ? xRatio : yRatio;
  const dWidth = ratio * imgWidth;
  const dHeight = ratio * imgHeight;
  if (dWidth > canvas.width - dx) {
    dx -= (dWidth + dx - canvas.width) / 2;
  }
  if (dHeight > canvas.height - dy) {
    dy -= (dHeight + dy - canvas.height) / 2;
  }
  context.filter = 'contrast(120%) saturate(120%)';
  context.drawImage(img, dx, dy, dWidth, dHeight);
  // const dataURL = canvas.toDataURL(type);
  const dataURL = canvas.toDataURL(type ?? 'image/jpeg').replace(/.*,/, '');
  // console.log('debug : dataURL', dataURL);
  // const { body } = document;
  // canvas.style.width = '100%';
  // canvas.style.position = 'relative';
  // body.insertBefore(canvas, body.firstChild);
  return dataURL;
}

/**
 * @module trimStreetView - 將圖片兩邊切掉並產生 base64
 * @param {object<HTMLImageElement>} img - 要切的圖
 */
export function trimStreetView(img) {
  if (!img || !img.src) {
    return '';
  }
  const cut = 65;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = img.width - cut * 2;
  canvas.height = img.height;
  context.drawImage(img, -cut, 0);
  return canvas.toDataURL('image/jpeg');
}
