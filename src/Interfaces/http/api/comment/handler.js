const AddCommentUseCase = require("../../../../Applications/use_case/AddCommentUseCase");
const DeleteCommentUseCase = require("../../../../Applications/use_case/DeleteCommentUseCase");

class CommentsHandler {
  constructor(container) {
    this._container = container;
    this.handlePostComment = this.handlePostComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  async handlePostComment(request, h) {
    const { content } = request.payload;
    const { threadId } = request.params;
    const ownerId = request.auth.credentials.id;

    const commentData = {
      content,
      threadId,
      owner: ownerId,
    };

    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name
    );
    const addedComment = await addCommentUseCase.execute(commentData);

    const response = h
      .response({
        status: "success",
        data: {
          addedComment,
        },
      })
      .code(201);

    return response;
  }

  async handleDeleteComment(request, h) {
    const { commentId, threadId } = request.params;
    const ownerId = request.auth.credentials.id;

    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name
    );
    await deleteCommentUseCase.execute({ commentId, threadId, owner: ownerId });

    return {
      status: "success",
    };
  }
}

module.exports = CommentsHandler;
