const AddedComment = require("../AddedComment");

describe("AddedComment entity", () => {
  it("should throw an error when the payload does not contain the required properties", () => {
    // Arrange
    const payload = {
      content: "sebuah comment",
    };

    // Act & Assert
    expect(() => new AddedComment(payload)).toThrowError(
      "ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw an error when the payload does not meet the data type specification", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: 123,
      owner: "user-123",
    };

    // Act & Assert
    expect(() => new AddedComment(payload)).toThrowError(
      "ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create an AddedComment object correctly", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "sebuah comment",
      owner: "user-123",
    };

    // Act
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment).toBeInstanceOf(AddedComment);
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.owner).toEqual(payload.owner);
  });
});
