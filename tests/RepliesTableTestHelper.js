const Database = require("../src/Infrastructures/database/postgres/pool");

class RepliesTestHelper {
  static async createReply({
    id = "reply-123",
    commentId = "comment-123",
    owner = "user-123",
    content = "sebuah balasan",
    date = new Date("2023-10-30T07:26:17.000Z"),
  }) {
    const query = {
      text: "INSERT INTO replies (id, comment_id, owner, content, date) VALUES($1, $2, $3, $4, $5)",
      values: [id, commentId, owner, content, date],
    };

    await Database.query(query);
  }

  static async findReplyById(id) {
    const query = {
      text: "SELECT * FROM replies WHERE id = $1",
      values: [id],
    };

    const result = await Database.query(query);

    return result.rows;
  }

  static async markReplyAsDeleted(id) {
    const query = {
      text: "UPDATE replies SET is_deleted = TRUE WHERE id = $1",
      values: [id],
    };
    await Database.query(query);
  }

  static async clearRepliesTable() {
    await Database.query("DELETE FROM replies");
  }
}

module.exports = RepliesTestHelper;
