const sharp = require("sharp");

const {
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  IMAGE_FORMAT,
  IMAGE_QUALITY,
  IMAGE_CHROMA_SUBSAMPLING,
  IMAGE_FIT,
  IMAGE_WITHOUT_ENLARGEMENT,
} = process.env;

const width = Number.parseInt(IMAGE_WIDTH) || 1200;
const height = Number.parseInt(IMAGE_HEIGHT) || 1200;
const format = IMAGE_FORMAT || "jpeg";
const quality = Number.parseInt(IMAGE_QUALITY) || 70;
const chromaSubsampling = IMAGE_CHROMA_SUBSAMPLING || "4:4:4";
const fit = IMAGE_FIT || "cover";
const withoutEnlargement = IMAGE_WITHOUT_ENLARGEMENT === true || true;

function convertImgToBuffer(image) {
  return sharp(image)
    .resize(width, height, {
      fit: fit,
      withoutEnlargement: withoutEnlargement,
    })
    .sharpen()
    .toFormat(format)
    .jpeg({
      quality: quality,
      chromaSubsampling: chromaSubsampling,
    })
    .withMetadata()
    .toBuffer();
}

module.exports = convertImgToBuffer;
