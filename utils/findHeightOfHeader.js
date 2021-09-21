function setHeightOfHeader(windowSize) {
  let height = -64;
  if (windowSize >= 1024) {
    height = -64;
  }
  if (windowSize >= 811) {
    height = -54;
  }
  if (windowSize >= 504) {
    height = -132;
  }
  if (windowSize >= 426) {
    height = -169;
  }
  if (windowSize <= 425) {
    height = -54;
  }

  return height;
}

export default setHeightOfHeader;
