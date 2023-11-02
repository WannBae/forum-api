class GetThreadByIdUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    const [thread, comments, replies] = await Promise.all([
      this._threadRepository.getThreadById(threadId),
      this._commentRepository.getCommentsByThreadId(threadId),
      this._threadRepository.getRepliesByThreadId(threadId),
    ]);

    function formatComment(comment) {
      return {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: comment.is_deleted
          ? "**komentar telah dihapus**"
          : comment.content,
        replies: formatReplies(comment.id),
      };
    }

    function formatReplies(commentId) {
      const relevantReplies = replies.filter(
        (reply) => reply.comment_id === commentId
      );
      return relevantReplies.map((reply) => ({
        id: reply.id,
        content: reply.is_deleted ? "**balasan telah dihapus**" : reply.content,
        date: reply.date,
        username: reply.username,
      }));
    }

    const processedComments = comments.map(formatComment);

    return {
      ...thread,
      comments: processedComments,
    };
  }
}

module.exports = GetThreadByIdUseCase;
