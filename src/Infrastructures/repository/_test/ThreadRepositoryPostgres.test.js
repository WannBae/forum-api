const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const NewThread = require("../../../Domains/threads/entities/NewThread");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const pool = require("../../database/postgres/pool");

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addThread function", () => {
    it("should persist new thread and return added thread correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        username: "dicoding",
        password: "secret_password",
      });
      const newThread = new NewThread({
        title: "Dicoding Indonesia",
        body: "Dicoding Indonesia adalah platform belajar pemrograman online terbaik di Indonesia",
        owner: "user-123",
      });

      const fakeIdGenerator = () => "321";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(newThread);

      // Assert
      const threads = await ThreadTableTestHelper.findThreadsById("thread-321");
      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: "thread-321",
          title: "Dicoding Indonesia",
          owner: "user-123",
        })
      );
      expect(threads).toHaveLength(1);
    });

    it("should return added thread correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        username: "dicoding",
        password: "secret_password",
      });
      const newThreadPayload = {
        title: "Dicoding Indonesia",
        body: "Dicoding Indonesia adalah platform belajar pemrograman online terbaik di Indonesia",
        owner: "user-123",
      };
      const newThread = new NewThread(newThreadPayload);

      const fakeIdGenerator = () => "321";
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(newThread);

      // Assert
      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: "thread-321",
          title: "Dicoding Indonesia",
          owner: "user-123",
        })
      );
    });
  });

  describe("getThreadById function", () => {
    it("should throw NotFoundError when thread not found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.getThreadById("thread-1")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return thread correctly", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        username: "dicoding",
        password: "secret_password",
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await ThreadTableTestHelper.addThread({
        id: "thread-123",
      });

      // Action
      const thread = await threadRepositoryPostgres.getThreadById("thread-123");

      // Assert
      expect(thread).toStrictEqual({
        id: "thread-123",
        title: "sebuah thread",
        body: "sebuah body",
        date: new Date("2023-10-30T07:26:17.000Z"),
        username: "dicoding",
      });
    });
  });

  describe("verifyAvailableThread function", () => {
    it("should throw NotFoundError when thread not found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyAvailableThread("thread-1")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should not throw NotFoundError when thread found", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        username: "dicoding",
        password: "secret_password",
      });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await ThreadTableTestHelper.addThread({ id: "thread-123" });

      // Action
      const verifyPromise =
        threadRepositoryPostgres.verifyAvailableThread("thread-123");

      // Assert
      await expect(verifyPromise).resolves.not.toThrowError(NotFoundError);
    });
  });
});
