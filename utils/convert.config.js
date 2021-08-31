const convict = require("convict");

const config = convict({
  imageWidth: {
    format: "int",
    default: 1200,
  },
  imageHeight: {
    format: "int",
    default: 1200,
  },
  imageFormat: {
    format: String,
    default: "jpeg",
  },
  imageQuality: {
    format: "int",
    default: 70,
  },
  imageChromaSubsampling: {
    format: String,
    default: "4:4:4",
  },
  imageFit: {
    format: String,
    default: "cover",
  },
  imageWithoutEnlargement: {
    format: "Boolean",
    default: true,
  },
});

config.validate({ allowed: "strict" });

module.exports = config;
