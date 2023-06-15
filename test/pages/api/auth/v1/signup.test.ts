// Import Third-party Dependencies
import { createMocks } from "node-mocks-http";

// Import Internal Dependencies
import signUp from "../../../../../src/pages/api/auth/v1/signup/index";


describe("sign-up", () => {
  it("should throw if http method isn't POST", async () => {
    const { req, res } = createMocks({
      method: "GET"
    });

    await signUp(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should throw for an invalid payload", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        lastname: undefined,
        password: "test"
      }
    });

    await signUp(req, res);

    expect(res._getStatusCode()).toBe(500);
  });
});
