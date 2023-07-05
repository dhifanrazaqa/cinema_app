/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const SeatsTableTestHelper = {
  async addSeat({
    id = 1, idShow = 'show-123', noSeat = 'A1', available = true,
  }) {
    const query = {
      text: 'INSERT INTO seats VALUES($1, $2, $3, $4)',
      values: [id, idShow, noSeat, available],
    };

    await pool.query(query);
  },

  async findSeatsById(id) {
    const query = {
      text: 'SELECT * FROM seats WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM seats WHERE 1=1');
  },
};

module.exports = SeatsTableTestHelper;
