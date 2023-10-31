/* istanbul ignore file */
const database = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableHelper = {
  async addComment({
    id = "new-comment-123",
    threadId = "new-thread-123",
    owner = "new-user-123",
    content = "some new comment",
    date = "2023-10-31T07:00:00.000Z",
  }) {
    const query = {
      text: "INSERT INTO comments VALUES($1, $2, $3, $4, $5)",
      values: [id, threadId, owner, content, date],
    };

    await database.query(query);
  },

  async getCommentById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const { rows } = await database.query(query);

    return rows;
  },

  async cleanTable() {
    await database.query("DELETE FROM comments WHERE 1=1");
  },
};

module.exports = CommentsTableHelper;
