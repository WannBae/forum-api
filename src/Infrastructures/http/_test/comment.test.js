const pool = require("../../database/postgres/pool");
const container = require("../../container");
const createServer = require("../createServer");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const CommentsTableTestHelper = require("../../../../tests/CommentTestTableHelper");

describe("/threads/{threadId}/comments endpoint", () => {
  let accessToken;
  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  beforeAll(async () => {
    accessToken = await ServerTestHelper.getAccessToken("user-123");
    await ThreadsTableTestHelper.addThread({ owner: "user-123" });
  });

  describe("when POST /threads/{threadId}/comments", () => {
    // butuh validasi lanjutan untuk memeriksa ketersediaan thread id
    it("should response 201 and persisted comment", async () => {
      const payload = { content: "comment content test" };
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: "/threads/thread-123/comments",
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedComment).toBeDefined();
    });

    it("should response 400 when request payload not contain needed property", async () => {
      const payload = {};
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: "/threads/thread-id_test/comments",
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      const payload = { content: true };
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: "/threads/thread-id_test/comments",
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat comment baru karena tipe data tidak sesuai"
      );
    });

    it("should response 404 when thread not found", async () => {
      const payload = { content: "comment content test" };
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: "/threads/thread-54321/comments",
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("Thread Not Found");
    });
  });

  describe("when DELETE /threads/{threadId}/comments/{commentId}", () => {
    it("should response 404 when thread not found", async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: "DELETE",
        url: "/threads/thread-54321/comments/comment-id_test",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("Comment Not Found In This Thread");
    });

    it("should response 404 when comment not found", async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: "DELETE",
        url: "/threads/thread-id_test/comments/comment-id_test",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("Comment Not Found In This Thread");
    });
  });
});
