import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { mapthemomentService } from "./mapthemoment-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    mapthemomentService.clearAuth();
    await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    await mapthemomentService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await mapthemomentService.createUser(testUsers[i]);
    }
    await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await mapthemomentService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await mapthemomentService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await mapthemomentService.deleteAllUsers();
    await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    returnedUsers = await mapthemomentService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await mapthemomentService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await mapthemomentService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await mapthemomentService.deleteAllUsers();
    await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    try {
      const returnedUser = await mapthemomentService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});