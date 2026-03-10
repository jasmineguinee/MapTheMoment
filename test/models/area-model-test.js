import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testAreas, kerry } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Area Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.areaStore.deleteAllAreas();
    for (let i = 0; i < testAreas.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testAreas[i] = await db.areaStore.addArea(testAreas[i]);
    }
  });

  test("create a area", async () => {
    const area = await db.areaStore.addArea(kerry);
    assertSubset(kerry, area);
    assert.isDefined(area._id);
  });

  test("delete all areas", async () => {
    let returnedAreas = await db.areaStore.getAllAreas();
    assert.equal(returnedAreas.length, 3);
    await db.areaStore.deleteAllAreas();
    returnedAreas = await db.areaStore.getAllAreas();
    assert.equal(returnedAreas.length, 0);
  });

  test("get a area - success", async () => {
    const area = await db.areaStore.addArea(kerry);
    const returnedArea = await db.areaStore.getAreaById(area._id);
    assertSubset(kerry, area);
  });

  test("delete One Playist - success", async () => {
    const id = testAreas[0]._id;
    await db.areaStore.deleteAreaById(id);
    const returnedAreas = await db.areaStore.getAllAreas();
    assert.equal(returnedAreas.length, testAreas.length - 1);
    const deletedArea = await db.areaStore.getAreaById(id);
    assert.isNull(deletedArea);
  });

  test("get a area - bad params", async () => {
    assert.isNull(await db.areaStore.getAreaById(""));
    assert.isNull(await db.areaStore.getAreaById());
  });

  test("delete One Area - fail", async () => {
    await db.areaStore.deleteAreaById("bad-id");
    const allAreas = await db.areaStore.getAllAreas();
    assert.equal(testAreas.length, allAreas.length);
  });
});
