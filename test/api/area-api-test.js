import { EventEmitter } from "events";
import { assert } from "chai";
import { mapthemomentService } from "./mapthemoment-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, kerry, testAreas } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Area API tests", () => {

 let user = null;

  setup(async () => {
    mapthemomentService.clearAuth();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    await mapthemomentService.deleteAllAreas();
    await mapthemomentService.deleteAllUsers();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    kerry.userid = user._id;
  });

  teardown(async () => {});

  test("create area", async () => {
    const returnedArea = await mapthemomentService.createArea(kerry);
    assert.isNotNull(returnedArea);
    assertSubset(kerry, returnedArea);
  });


    test("delete a area", async () => {
    const area = await mapthemomentService.createArea(kerry);
    const response = await mapthemomentService.deleteArea(area._id);
    assert.equal(response.status, 204);
    try {
      const returnedArea = await mapthemomentService.getArea(area.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Area with this id", "Incorrect Response Message");
    }
  });


    test("create multiple areas", async () => {
    for (let i = 0; i < testAreas.length; i += 1) {
      testAreas[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createArea(testAreas[i]);
    }
    let returnedLists = await mapthemomentService.getAllAreas();
    assert.equal(returnedLists.length, testAreas.length);
    await mapthemomentService.deleteAllAreas();
    returnedLists = await mapthemomentService.getAllAreas();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant area", async () => {
    try {
      const response = await mapthemomentService.deleteArea("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Area with this id", "Incorrect Response Message");
    }
  });

});
