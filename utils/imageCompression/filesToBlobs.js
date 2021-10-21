const fs = require("fs").promises;
const compressImage = require("./compress");

function filesToBlobs(files) {
  const readFilePromises = files.map((file) => fs.readFile(file.path));
  return Promise.all(readFilePromises).then(
    readFilePromises.map(async (img) => compressImage(img))
  );
}

export default filesToBlobs;
