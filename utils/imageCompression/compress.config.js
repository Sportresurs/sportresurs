const convict = require("convict");

const config = convict({
  imageWidth: {
    format: "int",
    default: 1200,
    env: "IMAGE_WIDTH"
  },
  imageHeight: {
    format: "int",
    default: 1200,
    env: "IMAGE_HEIGHT"
  },
  imageFormat: {
    format: String,
    default: "jpeg",
    env: "IMAGE_FORMAT"
  },
  imageQuality: {
    format: "int",
    default: 70,
    env: "IMAGE_QUALITY"
  },
  imageChromaSubsampling: {
    format: String,
    default: "4:4:4",
    env: "IMAGE_CHROMA_SUBSAMPLING"
  },
  imageFit: {
    format: String,
    default: "cover",
    env: "IMAGE_FIT"
  },
  imageWithoutEnlargement: {
    format: "Boolean",
    default: true,
    env: "IMAGE_WITHOUT_ENLARGEMENT"
  },
});

config.validate({ allowed: "strict" });

module.exports = config;
