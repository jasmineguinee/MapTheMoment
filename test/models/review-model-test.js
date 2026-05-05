import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testAreas, testVenues, corkarea, kerry, boathousevenue, testUsers, opinion, testReviews } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => {
  let corkareaList = null;
  let theBoathouse = null;

  setup(async () => {
    db.init("json");
    await db.areaStore.deleteAllAreas();
    await db.venueStore.deleteAllVenues();
    await db.reviewStore.deleteAllReviews();
    corkareaList = await db.areaStore.addArea(corkarea);
    theBoathouse = await db.venueStore.addVenue(corkareaList._id, boathousevenue);
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testReviews[i] = await db.reviewStore.addReview(theBoathouse._id, testReviews[i]);
    }
  });

  test("create single review", async () => {
    corkareaList = await db.areaStore.addArea(corkarea);
    const woodlandVenue = await db.venueStore.addVenue(corkareaList._id, boathousevenue);
    const review = await db.reviewStore.addReview(woodlandVenue._id, opinion);
    assert.isNotNull(review._id);
    assertSubset(opinion, review);
  });

  test("create multiple reviewApi", async () => {
    const venue = await db.venueStore.getVenueById(theBoathouse._id);
    const reviews = await db.reviewStore.getReviewsByVenueId(venue._id);
    assert.equal(testReviews.length, reviews.length);
  });

  test("delete all reviewApi", async () => {
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(testReviews.length, reviews.length);
    await db.reviewStore.deleteAllReviews();
    const newReviews = await db.reviewStore.getAllReviews();
    assert.equal(0, newReviews.length);
  });

  test("get a review - success", async () => {
    corkareaList = await db.areaStore.addArea(corkarea);
    const woodlandVenue = await db.venueStore.addVenue(corkareaList._id, boathousevenue);
    const review = await db.reviewStore.addReview(woodlandVenue._id, opinion);
    const newReview = await db.reviewStore.getReviewById(review._id);
    assertSubset(opinion, newReview);
  });

  test("delete One Review - success", async () => {
    await db.reviewStore.deleteReview(testReviews[0]._id);
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(reviews.length, testReviews.length - 1);
    const deletedReview = await db.reviewStore.getReviewById(testReviews[0]._id);
    assert.isNull(deletedReview);
  });

  test("get a review - bad params", async () => {
    assert.isNull(await db.reviewStore.getReviewById(""));
    assert.isNull(await db.reviewStore.getReviewById());
  });

  test("delete one review - fail", async () => {
    await db.reviewStore.deleteReview("bad-id");
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(reviews.length, testReviews.length);
  });
});