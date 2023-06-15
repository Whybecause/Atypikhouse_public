// Import Third-party Dependencies
import { createMocks } from "node-mocks-http";

// Import Internal Dependencies
import createResetPassword from "../../../../src/pages/api/checkout_sessions/index";

describe("createResetPassword", () => {
  it("should throw if http method isn't POST", async () => {
    const { req, res } = createMocks({
      method: "GET"
    });

    await createResetPassword(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should throw for an invalid request payload", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {}
    });

    await createResetPassword(req, res);

    expect(res._getStatusCode()).toBe(500);
  });
});
