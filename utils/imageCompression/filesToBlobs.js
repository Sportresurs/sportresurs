const fs = require("fs").promises;
const compressImage = require("./compress");

function filesToBlobs(files) {
  return Promise.all(
    files.map((file) => fs.readFile(file.path).then(compressImage))
  );
}

export default filesToBlobs;
