const AddedReply = require("../AddedReply");

describe("AddedReply entity", () => {
  it("should throw an error when the payload does not contain the required properties", () => {
    // Arrange
    const payload = {
      id: "reply-123",
      content: "sebuah balasan",
    };

    // Act & Assert
    expect(() => new AddedReply(payload)).toThrowError(
      "ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw an error when the payload does not meet the data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      content: "sebuah balasan",
      owner: "user-123",
    };

    // Act & Assert
    expect(() => new AddedReply(payload)).toThrowError(
      "ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create an AddedReply object correctly", () => {
    // Arrange
    const payload = {
      id: "reply-123",
      content: "sebuah balasan",
      owner: "user-123",
    };

    // Action
    const addedReply = new AddedReply(payload);

    // Assert
    expect(addedReply).toBeInstanceOf(AddedReply);
    expect(addedReply.id).toEqual(payload.id);
    expect(addedReply.content).toEqual(payload.content);
    expect(addedReply.owner).toEqual(payload.owner);
  });
});
