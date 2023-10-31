const NewReply = require("../NewReply");

describe("NewReply entity", () => {
  it("should throw an error when the payload does not contain the required properties", () => {
    // Arrange
    const payload = {
      content: "sebuah balasan",
    };

    // Act & Assert
    expect(() => new NewReply(payload)).toThrowError(
      "NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw an error when the payload does not meet the data type specification", () => {
    // Arrange
    const payload = {
      commentId: true,
      content: 123,
      owner: "user-123",
    };

    // Act & Assert
    expect(() => new NewReply(payload)).toThrowError(
      "NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create a NewReply object correctly", () => {
    // Arrange
    const payload = {
      commentId: "comment-123",
      content: "sebuah balasan",
      owner: "user-123",
    };

    // Act
    const newReply = new NewReply(payload);

    // Assert
    expect(newReply).toBeInstanceOf(NewReply);
    expect(newReply.commentId).toEqual(payload.commentId);
    expect(newReply.content).toEqual(payload.content);
    expect(newReply.owner).toEqual(payload.owner);
  });
});
