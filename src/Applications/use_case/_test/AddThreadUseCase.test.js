const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const NewThread = require("../../../Domains/threads/entities/NewThread");
const AddThreadUseCase = require("../AddThreadUseCase");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");

describe("AddThreadUseCase", () => {
  it("should correctly orchestrate the add thread action", async () => {
    // Arrange
    const useCasePayload = {
      title: "sebuah thread",
      body: "ini adalah isi thread",
      owner: "user-123",
    };

    const expectedAddedThread = new AddedThread({
      id: "thread-123",
      title: useCasePayload.title,
      body: useCasePayload.body,
      date: "2023-10-30T07:26:17.000Z",
      owner: useCasePayload.owner,
    });

    // Mock ThreadRepository
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest.fn(() =>
      Promise.resolve(
        new AddedThread({
          id: "thread-123",
          title: useCasePayload.title,
          body: useCasePayload.body,
          date: "2023-10-30T07:26:17.000Z",
          owner: useCasePayload.owner,
        })
      )
    );
    
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(
      new NewThread(useCasePayload)
    );
  });
});
