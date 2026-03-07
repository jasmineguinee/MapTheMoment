import { assert } from "chai";
import { mapthemomentService } from "./mapthemoment-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {
    await mapthemomentService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await mapthemomentService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await mapthemomentService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await mapthemomentService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await mapthemomentService.deleteAllUsers();
    returnedUsers = await mapthemomentService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await mapthemomentService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

     test("get a user - fail", async () => {
    try {
      const returnedUser = await mapthemomentService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
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
    try {
      const returnedUser = await mapthemomentService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });


});
