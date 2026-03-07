import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testOccasions, octoberwedding } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Occasion Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.occasionStore.deleteAllOccasions();
    for (let i = 0; i < testOccasions.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testOccasions[i] = await db.occasionStore.addOccasion(testOccasions[i]);
    }
  });

  test("create a occasion", async () => {
    const occasion = await db.occasionStore.addOccasion(octoberwedding);
    assertSubset(octoberwedding, occasion);
    assert.isDefined(occasion._id);
  });

  test("delete all occasions", async () => {
    let returnedOccasions = await db.occasionStore.getAllOccasions();
    assert.equal(returnedOccasions.length, 3);
    await db.occasionStore.deleteAllOccasions();
    returnedOccasions = await db.occasionStore.getAllOccasions();
    assert.equal(returnedOccasions.length, 0);
  });

  test("get a occasion - success", async () => {
    const occasion = await db.occasionStore.addOccasion(octoberwedding);
    const returnedOccasion = await db.occasionStore.getOccasionById(occasion._id);
    assertSubset(octoberwedding, occasion);
  });

  test("delete One Playist - success", async () => {
    const id = testOccasions[0]._id;
    await db.occasionStore.deleteOccasionById(id);
    const returnedOccasions = await db.occasionStore.getAllOccasions();
    assert.equal(returnedOccasions.length, testOccasions.length - 1);
    const deletedOccasion = await db.occasionStore.getOccasionById(id);
    assert.isNull(deletedOccasion);
  });

  test("get a occasion - bad params", async () => {
    assert.isNull(await db.occasionStore.getOccasionById(""));
    assert.isNull(await db.occasionStore.getOccasionById());
  });

  test("delete One Occasion - fail", async () => {
    await db.occasionStore.deleteOccasionById("bad-id");
    const allOccasions = await db.occasionStore.getAllOccasions();
    assert.equal(testOccasions.length, allOccasions.length);
  });
});
