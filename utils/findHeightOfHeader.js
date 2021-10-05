function setHeightOfHeader(windowSize) {
  let height = -54;
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

  return height;
}

export default setHeightOfHeader;
