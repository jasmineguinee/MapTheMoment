import { EventEmitter } from "events";
import { assert } from "chai";
import { mapthemomentService } from "./mapthemoment-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, mypost, testPosts, maggieCredentials } from "../fixtures.js";


EventEmitter.setMaxListeners(25);

suite("Post API tests", function () {
 let user = null;
this.timeout(10000);
  setup(async () => {
    mapthemomentService.clearAuth();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    await mapthemomentService.deleteAllPosts();
    await mapthemomentService.deleteAllUsers();
    user = await mapthemomentService.createUser(maggie);
    await mapthemomentService.authenticate(maggieCredentials);
    mypost.userid = user._id;
  });

  teardown(async () => {});

  test("create post", async () => {
    const returnedPost = await mapthemomentService.createPost(mypost);
    assert.isNotNull(returnedPost);
    assertSubset(mypost, returnedPost);
  });


    test("delete a post", async () => {
    const post = await mapthemomentService.createPost(mypost);
    const response = await mapthemomentService.deletePost(post._id);
    assert.equal(response.status, 204);
    try {
      const returnedPost = await mapthemomentService.getPost(post.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Post with this id", "Incorrect Response Message");
    }
  });


    test("create multiple posts", async () => {
    for (let i = 0; i < testPosts.length; i += 1) {
      testPosts[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await mapthemomentService.createPost(testPosts[i]);
    }
    let returnedLists = await mapthemomentService.getAllPosts();
    assert.equal(returnedLists.length, testPosts.length);
    await mapthemomentService.deleteAllPosts();
    returnedLists = await mapthemomentService.getAllPosts();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant post", async () => {
    try {
      const response = await mapthemomentService.deletePost("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Post with this id", "Incorrect Response Message");
    }
  });

});