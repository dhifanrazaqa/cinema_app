/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ShowsTableTestHelper = {
  async addShow({
    id = 'show-123', idMovie = 1, stTime = '13:00',
  }) {
    const query = {
      text: 'INSERT INTO shows VALUES($1, $2, $3)',
      values: [id, idMovie, stTime],
    };

    await pool.query(query);
  },

  async findShowsById(id) {
    const query = {
      text: 'SELECT * FROM shows WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM shows WHERE 1=1');
  },
};

module.exports = ShowsTableTestHelper;
