import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPosts, mypost } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Post Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.postStore.deleteAllPosts();
    for (let i = 0; i < testPosts.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPosts[i] = await db.postStore.addPost(testPosts[i]);
    }
  });

  test("create a post", async () => {
    const post = await db.postStore.addPost(mypost);
    assertSubset(mypost, post);
    assert.isDefined(post._id);
  });

  test("delete all posts", async () => {
    let returnedPosts = await db.postStore.getAllPosts();
    assert.equal(returnedPosts.length, 3);
    await db.postStore.deleteAllPosts();
    returnedPosts = await db.postStore.getAllPosts();
    assert.equal(returnedPosts.length, 0);
  });

  test("get a post - success", async () => {
    const post = await db.postStore.addPost(mypost);
    const returnedPost = await db.postStore.getPostById(post._id);
    assertSubset(mypost, post);
  });

  test("delete One Playist - success", async () => {
    const id = testPosts[0]._id;
    await db.postStore.deletePostById(id);
    const returnedPosts = await db.postStore.getAllPosts();
    assert.equal(returnedPosts.length, testPosts.length - 1);
    const deletedPost = await db.postStore.getPostById(id);
    assert.isNull(deletedPost);
  });

  test("get a post - bad params", async () => {
    assert.isNull(await db.postStore.getPostById(""));
    assert.isNull(await db.postStore.getPostById());
  });

  test("delete One Post - fail", async () => {
    await db.postStore.deletePostById("bad-id");
    const allPosts = await db.postStore.getAllPosts();
    assert.equal(testPosts.length, allPosts.length);
  });
});
