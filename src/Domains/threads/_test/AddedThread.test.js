const AddedThread = require("../entities/AddedThread");

describe("AddedThread Entity", () => {
  it("throws an error when payload lacks necessary properties", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title",
    };

    // Action & Assert
    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("throws an error when payload contains incorrect data types", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title",
      owner: 1234,
    };

    // Action & Assert
    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("creates an AddedThread entity with valid payload", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title",
      owner: "user-123",
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread).toBeInstanceOf(AddedThread);
    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.title).toEqual(payload.title);
    expect(addedThread.owner).toEqual(payload.owner);
  });
});
