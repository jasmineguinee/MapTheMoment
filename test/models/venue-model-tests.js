import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testOccasions, testVenues, corkoccasion, octoberwedding, boathousevenue, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Venue Model tests", () => {
  let corkoccasionList = null;

  setup(async () => {
    db.init("json");
    await db.occasionStore.deleteAllOccasions();
    await db.venueStore.deleteAllVenues();
    corkoccasionList = await db.occasionStore.addOccasion(corkoccasion);
    for (let i = 0; i < testVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testVenues[i] = await db.venueStore.addVenue(corkoccasionList._id, testVenues[i]);
    }
  });

  test("create single venue", async () => {
    const octoberweddingList = await db.occasionStore.addOccasion(octoberwedding);
    const venue = await db.venueStore.addVenue(octoberweddingList._id, boathousevenue);
    assert.isNotNull(venue._id);
    assertSubset(boathousevenue, venue);
  });

  test("create multiple venueApi", async () => {
    const occasion = await db.occasionStore.getOccasionById(corkoccasionList._id);
    const venues = await db.venueStore.getVenuesByOccasionId(occasion._id);
    assert.equal(testVenues.length, venues.length);
  });

  test("delete all venueApi", async () => {
    const venues = await db.venueStore.getAllVenues();
    assert.equal(testVenues.length, venues.length);
    await db.venueStore.deleteAllVenues();
    const newVenues = await db.venueStore.getAllVenues();
    assert.equal(0, newVenues.length);
  });

  test("get a venue - success", async () => {
    const octoberweddingList = await db.occasionStore.addOccasion(octoberwedding);
    const venue = await db.venueStore.addVenue(octoberweddingList._id, boathousevenue);
    const newVenue = await db.venueStore.getVenueById(venue._id);
    assertSubset(boathousevenue, newVenue);
  });

  test("delete One Venue - success", async () => {
    await db.venueStore.deleteVenue(testVenues[0]._id);
    const venues = await db.venueStore.getAllVenues();
    assert.equal(venues.length, testVenues.length - 1);
    const deletedVenue = await db.venueStore.getVenueById(testVenues[0]._id);
    assert.isNull(deletedVenue);
  });

  test("get a venue - bad params", async () => {
    assert.isNull(await db.venueStore.getVenueById(""));
    assert.isNull(await db.venueStore.getVenueById());
  });

  test("delete one venue - fail", async () => {
    await db.venueStore.deleteVenue("bad-id");
    const venues = await db.venueStore.getAllVenues();
    assert.equal(venues.length, testOccasions.length);
  });
});