import { assert } from "chai";
import { mapthemomentService } from "./mapthemoment-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    mapthemomentService.clearAuth();
    await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    await mapthemomentService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await mapthemomentService.createUser(maggie);
    const response = await mapthemomentService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await mapthemomentService.createUser(maggie);
    const response = await mapthemomentService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    mapthemomentService.clearAuth();
    try {
      await mapthemomentService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});