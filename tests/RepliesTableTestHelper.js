/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const RepliesTestHelper = {
  async createReply({
    id = "reply-123",
    commentId = "comment-123",
    owner = "user-123",
    content = "sebuah balasan",
    date = new Date("2023-10-30T07:26:17.000Z"),
  }) {
    const query = {
      text: "INSERT INTO replies VALUES($1, $2, $3, $4, $5)",
      values: [id, commentId, owner, content, date],
    };

    await pool.query(query);
  },

  async findReplyById(id) {
    const query = {
      text: "SELECT * FROM replies WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async markReplyAsDeleted(id) {
    const query = {
      text: "UPDATE replies SET is_deleted = TRUE WHERE id = $1",
      values: [id],
    };
    await pool.query(query);
  },

  async clearRepliesTable() {
    await pool.query("DELETE FROM replies");
  },
};

module.exports = RepliesTestHelper;
