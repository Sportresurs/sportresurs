import "@testing-library/jest-dom/extend-expect";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

beforeAll(() => {
  const portalRoot = document.createElement("div");
  portalRoot.id = "portal";
  document.body.append(portalRoot);
});

afterAll(() => {
  const portalRoot = document.getElementById("portal");
  if (portalRoot) {
    portalRoot.remove();
  }
});
