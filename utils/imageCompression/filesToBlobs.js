const fs = require("fs").promises;
const compressImage = require("./compress");

function filesToBlobs(files) {
  const readedFiles = files.map((file) => {
    const data = fs.readFile(file.path).then((img) => compressImage(img));
    return data;
  });
  return Promise.all(readedFiles);
}

export default filesToBlobs;
