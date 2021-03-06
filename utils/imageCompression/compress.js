const sharp = require("sharp");
const config = require("./compress.config");

const width = config.get("imageWidth");
const height = config.get("imageHeight");
const format = config.get("imageFormat");
const quality = config.get("imageQuality");
const chromaSubsampling = config.get("imageChromaSubsampling");
const fit = config.get("imageFit");
const withoutEnlargement = config.get("imageWithoutEnlargement");

function compressImage(image) {
  return sharp(image)
    .resize(width, height, {
      fit,
      withoutEnlargement,
    })
    .sharpen()
    .toFormat(format, { quality, chromaSubsampling })
    .withMetadata()
    .toBuffer();
}

module.exports = compressImage;
