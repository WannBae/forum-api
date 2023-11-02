const pool = require("../src/Infrastructures/database/postgres/pool");

class ThreadTableTestHelper {
  static async addThread(threadData) {
    const {
      id = "thread-123",
      title = "sebuah thread",
      body = "sebuah body threads",
      date = new Date("2023-10-30T07:26:17.000Z"),
      owner = "dicoding",
    } = threadData;
    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5)",
      values: [id, title, body, date, owner],
    };
    await pool.query(query);
  }

  static async findThreadById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
  }

  static async cleanTable() {
    await pool.query("DELETE FROM threads WHERE 1=1");
  }
}

module.exports = ThreadTableTestHelper;
