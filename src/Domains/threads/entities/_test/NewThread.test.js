const NewThread = require("../NewThread");

describe("NewThread Entity", () => {
  it("throws an error when payload lacks necessary properties", () => {
    // Arrange
    const payload = {
      title: "title",
    };

    // Action & Assert
    expect(() => new NewThread(payload)).toThrowError(
      "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("throws an error when payload contains incorrect data types", () => {
    // Arrange
    const payload = {
      title: "title",
      body: 1234,
      owner: "user-123",
    };

    // Action & Assert
    expect(() => new NewThread(payload)).toThrowError(
      "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("creates a NewThread entity with valid payload", () => {
    // Arrange
    const payload = {
      title: "title",
      body: "body",
      owner: "user-123",
    };

    // Action
    const newThread = new NewThread(payload);

    // Assert
    expect(newThread).toBeInstanceOf(NewThread);
    expect(newThread.title).toEqual(payload.title);
    expect(newThread.body).toEqual(payload.body);
    expect(newThread.owner).toEqual(payload.owner);
  });
});
