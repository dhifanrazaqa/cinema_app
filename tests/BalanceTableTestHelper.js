/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const BalancesTableTestHelper = {
  async addBalance({
    id = 'balance-123', idUser = 'user-123', balance = 0,
  }) {
    const query = {
      text: 'INSERT INTO balances VALUES($1, $2, $3)',
      values: [id, idUser, balance],
    };

    await pool.query(query);
  },

  async findBalancesById(id) {
    const query = {
      text: 'SELECT * FROM balances WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM balances WHERE 1=1');
  },
};

module.exports = BalancesTableTestHelper;
