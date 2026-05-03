import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { mapthemomentService } from "./mapthemoment-service.js";
import { maggie, kerry, testAreas, testVenues, boathousevenue, maggieCredentials, opinion, testComments} from "../fixtures.js";

suite("Comment API tests", () => {
  let user = null;
  let limerick = null;
  let waterfall = null;

  setup(async () => {
    mapthemomentService.clearAuth();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    await mapthemomentService.deleteAllAreas();
    await mapthemomentService.deleteAllVenues();
    await mapthemomentService.deleteAllUsers();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    kerry.userid = user._id;
    limerick = await mapthemomentService.createArea(kerry);
    waterfall = await mapthemomentService.createVenue(boathousevenue);

  });

  teardown(async () => {});


  test("create comment", async () => {
    const returnedComment = await mapthemomentService.createComment(waterfall._id, opinion);
    assertSubset(opinion, returnedComment);
  });


  test("create Multiple comments", async () => {
    for (let i = 0; i < testComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createComment(waterfall._id, testComments[i]);
    }
    const returnedComments = await mapthemomentService.getAllComments();
    assert.equal(returnedComments.length, testComments.length);
    for (let i = 0; i < returnedComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const comment = await mapthemomentService.getComment(returnedComments[i]._id);
      assertSubset(comment, returnedComments[i]);
    }
  });

  test("Delete CommentApi", async () => {
    for (let i = 0; i < testComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createComment(waterfall._id, testComments[i]);
    }
    let returnedComments = await mapthemomentService.getAllComments();
    assert.equal(returnedComments.length, testComments.length);
    for (let i = 0; i < returnedComments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const venue = await mapthemomentService.deleteComment(returnedComments[i]._id);
    }
    returnedComments = await mapthemomentService.getAllComments();
    assert.equal(returnedComments.length, 0);
  });

  test("denormalised area", async () => {
    for (let i = 0; i < testVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createComment(waterfall._id, testComments[i]);
    }
    const returnedArea = await mapthemomentService.getArea(limerick._id);
    assert.equal(returnedArea.venues.length, testVenues.length);
    for (let i = 0; i < testVenues.length; i += 1) {
      assertSubset(testVenues[i], returnedArea.venues[i]);
    }
  });
});
