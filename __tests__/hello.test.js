import { createMocks } from "node-mocks-http";
import handle from "../pages/api/hello";

describe("/api/hello", () => {
  test("/api/hello endpoint should return a message containing 'John Doe'", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handle(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        name: "John Doe",
      })
    );
  });
});
