const CommentRepository = require("../../Domains/comments/CommentRepository");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AddedComment = require("../../Domains/comments/entities/AddedComment");

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment) {
    const { content, threadId, owner } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: "INSERT INTO comments(id, thread_id, owner, content, date, is_deleted) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner",
      values: [id, threadId, owner, content, createdAt, false],
    };

    const { rows } = await this._pool.query(query);

    return new AddedComment({ ...rows[0] });
  }

  async deleteComment(userId, threadId, commentId) {
    const query = {
      text: "UPDATE comments SET is_deleted = TRUE WHERE id = $1 AND owner = $2 AND thread_id = $3",
      values: [commentId, userId, threadId],
    };
    await this._pool.query(query);
  }

  async verifyCommentOwner(commentId, ownerId) {
    const query = {
      text: "SELECT 1 FROM comments WHERE id = $1 AND owner = $2",
      values: [commentId, ownerId],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new AuthorizationError(
        "You are not authorized to access this resource"
      );
    }

    return rowCount;
  }

  async getCommentsByThreadId(threadId) {
    const query = {
      text: `SELECT comments.*, users.username
            FROM comments INNER JOIN users
            ON comments.owner = users.id
            WHERE comments.thread_id = $1
            ORDER BY comments.date ASC`,
      values: [threadId],
    };
    const { rows } = await this._pool.query(query);

    return rows;
  }

  async verifyAvailableCommentInThread(commentId, threadId) {
    const query = {
      text: "SELECT 1 FROM comments WHERE id = $1 AND thread_id = $2 AND is_deleted = false",
      values: [commentId, threadId],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError("Comment Not Found In This Thread");
    }

    return rowCount;
  }

  async deleteCommentById(commentId) {
    const query = {
      text: "UPDATE comments SET is_deleted = TRUE WHERE id = $1",
      values: [commentId],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError("Comment Not Found");
    }

    return rowCount;
  }
}

module.exports = CommentRepositoryPostgres;
