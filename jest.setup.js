import "@testing-library/jest-dom/extend-expect";

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
