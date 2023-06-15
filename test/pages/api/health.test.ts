// Import Third-party Dependencies
import { createMocks } from "node-mocks-http";

// Import Internal Dependencies
import { health } from "../../../src/pages/api/health";


describe("/api/health", () => {
  it("should throw if http method isn't POST", async () => {
    const { req, res } = createMocks({
      method: "POST"
    });

    await health(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should return a payload with status pass", async () => {
    const { req, res } = createMocks({
      method: "GET"
    });

    await health(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        status: "pass"
      })
    );
  });
});
