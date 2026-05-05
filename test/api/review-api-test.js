import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { mapthemomentService } from "./mapthemoment-service.js";
import { maggie, kerry, testVenues, testReviews, boathousevenue, maggieCredentials, opinion } from "../fixtures.js";

suite("review API tests", () => {
  let user = null;
  let limerick = null;
  let woodlandVenue = null;


  setup(async () => {
    mapthemomentService.clearAuth();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    await mapthemomentService.deleteAllAreas();
     await mapthemomentService.deleteAllVenues();
    await mapthemomentService.deleteAllReviews();
    await mapthemomentService.deleteAllUsers();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    kerry.userid = user._id;
    limerick = await mapthemomentService.createArea(kerry);
    woodlandVenue = await mapthemomentService.createVenue(limerick._id, boathousevenue);
  });

  teardown(async () => {});


  test("create review", async () => {
    woodlandVenue = await mapthemomentService.createVenue(limerick._id, boathousevenue);
    const returnedReview = await mapthemomentService.createReview(woodlandVenue._id, opinion);
    assertSubset(opinion, returnedReview);
  });


  test("create Multiple reviews", async () => {
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createReview(woodlandVenue._id, testReviews[i]);
    }
    const returnedReviews = await mapthemomentService.getAllReviews();
    assert.equal(returnedReviews.length, testReviews.length);
    for (let i = 0; i < returnedReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const review = await mapthemomentService.getReview(returnedReviews[i]._id);
      assertSubset(review, returnedReviews[i]);
    }
  });

  test("Delete ReviewApi", async () => {
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createReview(woodlandVenue._id, testReviews[i]);
    }
    let returnedReviews = await mapthemomentService.getAllReviews();
    assert.equal(returnedReviews.length, testReviews.length);
    for (let i = 0; i < returnedReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const review = await mapthemomentService.deleteReview(returnedReviews[i]._id);
    }
    returnedReviews = await mapthemomentService.getAllReviews();
    assert.equal(returnedReviews.length, 0);
  });

 
});

