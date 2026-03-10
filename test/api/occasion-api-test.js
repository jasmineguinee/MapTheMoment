import { EventEmitter } from "events";
import { assert } from "chai";
import { mapthemomentService } from "./mapthemoment-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, octoberwedding, testOccasions } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Occasion API tests", () => {

 let user = null;

  setup(async () => {
    mapthemomentService.clearAuth();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    await mapthemomentService.deleteAllOccasions();
    await mapthemomentService.deleteAllUsers();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    octoberwedding.userid = user._id;
  });

  teardown(async () => {});

  test("create occasion", async () => {
    const returnedOccasion = await mapthemomentService.createOccasion(octoberwedding);
    assert.isNotNull(returnedOccasion);
    assertSubset(octoberwedding, returnedOccasion);
  });


    test("delete a occasion", async () => {
    const occasion = await mapthemomentService.createOccasion(octoberwedding);
    const response = await mapthemomentService.deleteOccasion(occasion._id);
    assert.equal(response.status, 204);
    try {
      const returnedOccasion = await mapthemomentService.getOccasion(occasion.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Occasion with this id", "Incorrect Response Message");
    }
  });


    test("create multiple occasions", async () => {
    for (let i = 0; i < testOccasions.length; i += 1) {
      testOccasions[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createOccasion(testOccasions[i]);
    }
    let returnedLists = await mapthemomentService.getAllOccasions();
    assert.equal(returnedLists.length, testOccasions.length);
    await mapthemomentService.deleteAllOccasions();
    returnedLists = await mapthemomentService.getAllOccasions();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant occasion", async () => {
    try {
      const response = await mapthemomentService.deleteOccasion("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Occasion with this id", "Incorrect Response Message");
    }
  });

});
