const DetailThead = require("../DetailThread");

describe("DetailThread Entity", () => {
  it("throws an error when payload lacks necessary properties", () => {
    // Arrange
    const payload = {
      title: "sebuah thread",
      body: "ini adalah isi thread",
      date: "2023",
      username: "user-123",
    };

    // Action & Assert
    expect(() => new DetailThead(payload)).toThrowError(
      "DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("throws an error when payload contains incorrect data types", () => {
    // Arrange
    const payload = {
      id: 123,
      title: "sebuah thread",
      body: "ini adalah isi thread",
      date: "2023",
      username: "user-123",
    };

    // Action & Assert
    expect(() => new DetailThead(payload)).toThrowError(
      "DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("creates a DetailThread entity with valid payload", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "sebuah thread",
      body: "ini adalah isi thread",
      date: "2023",
      username: "user-123",
    };

    // Action
    const detailThread = new DetailThead(payload);

    // Assert
    expect(detailThread.id).toEqual(payload.id);
    expect(detailThread.title).toEqual(payload.title);
    expect(detailThread.body).toEqual(payload.body);
    expect(detailThread.date).toEqual(payload.date);
    expect(detailThread.username).toEqual(payload.username);
  });
});
