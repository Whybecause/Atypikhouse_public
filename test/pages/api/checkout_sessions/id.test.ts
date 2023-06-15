// Import Third-party Dependencies
import { createMocks } from "node-mocks-http";

// Import Internal Dependencies
import checkoutSession from "../../../../src/pages/api/checkout_sessions/[id]";

describe("checkoutSession", () => {

  it("should throw for an id that dosn't start with cs_", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "3"
      }
    });

    await checkoutSession(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData()).message).toBe("Incorrect CheckoutSession ID.");
  });
});
