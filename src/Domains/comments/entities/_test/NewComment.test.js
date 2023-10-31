const NewComment = require("../NewComment");

describe("NewComment entity", () => {
  it("should throw an error when the payload does not contain the required properties", () => {
    // Arrange
    const payload = {
      content: "sebuah comment",
    };

    // Act & Assert
    expect(() => new NewComment(payload)).toThrowError(
      "NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw an error when the payload does not meet the data type specification", () => {
    // Arrange
    const payload = {
      content: 123,
      threadId: 123,
      owner: "user-123",
    };

    // Act & Assert
    expect(() => new NewComment(payload)).toThrowError(
      "NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create a NewComment object correctly", () => {
    // Arrange
    const payload = {
      content: "sebuah comment",
      threadId: "thread-123",
      owner: "user-123",
    };

    // Action
    const newComment = new NewComment(payload);

    // Assert
    expect(newComment).toBeInstanceOf(NewComment);
    expect(newComment.content).toEqual(payload.content);
    expect(newComment.threadId).toEqual(payload.threadId);
    expect(newComment.owner).toEqual(payload.owner);
  });
});
