const sharp = require("sharp");

const WIDTH = 1200;
const HEIGHT = 1200;
const FORMAT = "jpeg";
const QUALITY = 70;
const CHROMA_SUBSAMPLING = "4:4:4";
const FIT = "cover";
const WITHOUT_ENLARGEMENT = true;

function convertImg(image) {
  return sharp(image)
    .resize(WIDTH, HEIGHT, {
      fit: FIT,
      withoutEnlargement: WITHOUT_ENLARGEMENT,
    })
    .sharpen()
    .toFormat(FORMAT)
    .jpeg({
      quality: QUALITY,
      chromaSubsampling: CHROMA_SUBSAMPLING,
    })
    .withMetadata()
    .toBuffer();
}

module.exports = convertImg;
