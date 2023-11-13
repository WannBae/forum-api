const NewComment = require("../../../Domains/comments/entities/NewComment");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddCommentUseCase = require("../../use_case/AddCommentUseCase");

describe("AddCommentUseCase", () => {
  let rowCount = 1;
  it("should orchestrating the add comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      content: "sebuah comment",
      threadId: "thread-123",
      owner: "user-123",
    };

    const expectedAddedComment = new AddedComment({
      id: "comment-123",
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.verifyAvailableThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ rowCount }));

    mockCommentRepository.addComment = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedComment({
          id: "comment-123",
          content: useCasePayload.content,
          owner: useCasePayload.owner,
        })
      )
    );

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.addComment).toBeCalledWith(
      new NewComment({
        content: useCasePayload.content,
        threadId: useCasePayload.threadId,
        owner: useCasePayload.owner,
      })
    );
  });
});
