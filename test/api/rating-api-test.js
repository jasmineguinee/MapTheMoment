import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { mapthemomentService } from "./mapthemoment-service.js";
import { maggie, kerry, testVenues, testRatings, boathousevenue, maggieCredentials, myrating } from "../fixtures.js";


suite("rating API tests", function () {

  let user = null;
  let wexford = null;
  let lakevenue = null;
this.timeout(10000);

  setup(async () => {
    mapthemomentService.clearAuth();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    await mapthemomentService.deleteAllAreas();
     await mapthemomentService.deleteAllVenues();
    await mapthemomentService.deleteAllRatings();
    await mapthemomentService.deleteAllUsers();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    kerry.userid = user._id;
    wexford = await mapthemomentService.createArea(kerry);
    lakevenue = await mapthemomentService.createVenue(wexford._id, boathousevenue);
  });

  teardown(async () => {});


  test("create rating", async () => {
    lakevenue = await mapthemomentService.createVenue(wexford._id, boathousevenue);
    const returnedRating = await mapthemomentService.createRating(lakevenue._id, myrating);
    assertSubset(myrating, returnedRating);
  });


  test("create Multiple ratings", async () => {
    for (let i = 0; i < testRatings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createRating(lakevenue._id, testRatings[i]);
    }
    const returnedRatings = await mapthemomentService.getAllRatings();
    assert.equal(returnedRatings.length, testRatings.length);
    for (let i = 0; i < returnedRatings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const rating = await mapthemomentService.getRating(returnedRatings[i]._id);
      assertSubset(rating, returnedRatings[i]);
    }
  });

  test("Delete RatingApi", async () => {
    for (let i = 0; i < testRatings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createRating(lakevenue._id, testRatings[i]);
    }
    let returnedRatings = await mapthemomentService.getAllRatings();
    assert.equal(returnedRatings.length, testRatings.length);
    for (let i = 0; i < returnedRatings.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const rating = await mapthemomentService.deleteRating(returnedRatings[i]._id);
    }
    returnedRatings = await mapthemomentService.getAllRatings();
    assert.equal(returnedRatings.length, 0);
  });

 
});

