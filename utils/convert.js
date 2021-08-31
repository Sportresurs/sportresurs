const sharp = require("sharp");
const config = require("./convert.config")

const width = config.get("imageWidth");
const height = config.get("imageHeight");
const format = config.get("imageFormat");
const quality = config.get("imageQuality");
const chromaSubsampling = config.get("imageChromaSubsampling");
const fit = config.get("imageFit");
const withoutEnlargement = config.get("imageWithoutEnlargement");

function compressImg(image) {
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

module.exports = compressImg;
