// Import Third-party Dependencies
import { createMocks } from "node-mocks-http";

// Import Internal Dependencies
import resetPassword from "../../../../src/pages/api/auth/resetPassword";

describe("resetPassword", () => {
  it("should throw if http method isn't PUT", async () => {
    const { req, res } = createMocks({
      method: "GET"
    });

    await resetPassword(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should throw for an invalid request payload", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {}
    });

    await resetPassword(req, res);

    expect(res._getStatusCode()).toBe(500);
  });
});
