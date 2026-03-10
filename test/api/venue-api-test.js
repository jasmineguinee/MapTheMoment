import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { mapthemomentService } from "./mapthemoment-service.js";
import { maggie, octoberwedding, testOccasions, testVenues, boathousevenue } from "../fixtures.js";

suite("Venue API tests", () => {
  let user = null;
  let bestweddingspots = null;

  setup(async () => {
    mapthemomentService.clearAuth();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    await mapthemomentService.deleteAllOccasions();
    await mapthemomentService.deleteAllVenues();
    await mapthemomentService.deleteAllUsers();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggie);
    octoberwedding.userid = user._id;
    bestweddingspots = await mapthemomentService.createOccasion(octoberwedding);
  });

  teardown(async () => {});

  test("create venue", async () => {
    const returnedVenue = await mapthemomentService.createVenue(bestweddingspots._id, boathousevenue);
    assertSubset(boathousevenue, returnedVenue);
  });

  test("create Multiple venues", async () => {
    for (let i = 0; i < testVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createVenue(bestweddingspots._id, testVenues[i]);
    }
    const returnedVenues = await mapthemomentService.getAllVenues();
    assert.equal(returnedVenues.length, testVenues.length);
    for (let i = 0; i < returnedVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const venue = await mapthemomentService.getVenue(returnedVenues[i]._id);
      assertSubset(venue, returnedVenues[i]);
    }
  });

  test("Delete VenueApi", async () => {
    for (let i = 0; i < testVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createVenue(bestweddingspots._id, testVenues[i]);
    }
    let returnedVenues = await mapthemomentService.getAllVenues();
    assert.equal(returnedVenues.length, testVenues.length);
    for (let i = 0; i < returnedVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const venue = await mapthemomentService.deleteVenue(returnedVenues[i]._id);
    }
    returnedVenues = await mapthemomentService.getAllVenues();
    assert.equal(returnedVenues.length, 0);
  });

  test("denormalised occasion", async () => {
    for (let i = 0; i < testVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createVenue(bestweddingspots._id, testVenues[i]);
    }
    const returnedOccasion = await mapthemomentService.getOccasion(bestweddingspots._id);
    assert.equal(returnedOccasion.venues.length, testVenues.length);
    for (let i = 0; i < testVenues.length; i += 1) {
      assertSubset(testVenues[i], returnedOccasion.venues[i]);
    }
  });
});
