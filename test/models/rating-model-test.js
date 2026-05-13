import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testAreas, testVenues, corkarea, kerry, boathousevenue, testUsers, myrating, testRatings } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Rating Model tests", () => {
  let corkareaList = null;
  let theBoathouse = null;

  setup(async () => {
    db.init("json");
    await db.areaStore.deleteAllAreas();
    await db.venueStore.deleteAllVenues();
    await db.ratingStore.deleteAllRatings();
    corkareaList = await db.areaStore.addArea(corkarea);
    theBoathouse = await db.venueStore.addVenue(corkareaList._id, boathousevenue);
    for (let i = 0; i < testRatings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testRatings[i] = await db.ratingStore.addRating(theBoathouse._id, testRatings[i]);
    }
  });

  test("create single rating", async () => {
    corkareaList = await db.areaStore.addArea(corkarea);
    const woodlandVenue = await db.venueStore.addVenue(corkareaList._id, boathousevenue);
    const rating = await db.ratingStore.addRating(woodlandVenue._id, myrating);
    assert.isNotNull(rating._id);
    assertSubset(myrating, rating);
  });

  test("create multiple ratingApi", async () => {
    const venue = await db.venueStore.getVenueById(theBoathouse._id);
    const ratings = await db.ratingStore.getRatingsByVenueId(venue._id);
    assert.equal(testRatings.length, ratings.length);
  });

  test("delete all ratingApi", async () => {
    const ratings = await db.ratingStore.getAllRatings();
    assert.equal(testRatings.length, ratings.length);
    await db.ratingStore.deleteAllRatings();
    const newRatings = await db.ratingStore.getAllRatings();
    assert.equal(0, newRatings.length);
  });

  test("get a rating - success", async () => {
    corkareaList = await db.areaStore.addArea(corkarea);
    const woodlandVenue = await db.venueStore.addVenue(corkareaList._id, boathousevenue);
    const rating = await db.ratingStore.addRating(woodlandVenue._id, myrating);
    const newRating = await db.ratingStore.getRatingById(rating._id);
    assertSubset(myrating, newRating);
  });

  test("delete One Rating - success", async () => {
    await db.ratingStore.deleteRating(testRatings[0]._id);
    const ratings = await db.ratingStore.getAllRatings();
    assert.equal(ratings.length, testRatings.length - 1);
    const deletedRating = await db.ratingStore.getRatingById(testRatings[0]._id);
    assert.isNull(deletedRating);
  });

  test("get a rating - bad params", async () => {
    assert.isNull(await db.ratingStore.getRatingById(""));
    assert.isNull(await db.ratingStore.getRatingById());
  });

  test("delete one rating - fail", async () => {
    await db.ratingStore.deleteRating("bad-id");
    const ratings = await db.ratingStore.getAllRatings();
    assert.equal(ratings.length, testRatings.length);
  });
});