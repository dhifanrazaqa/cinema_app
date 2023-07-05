const BalanceRepository = require('../../Domains/balances/BalanceRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class BalanceRepositoryPostgres extends BalanceRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addBalance(idUser) {
    const id = `balance-${this._idGenerator(10)}`;

    const query = {
      text: 'INSERT INTO balances VALUES ($1, $2, $3) RETURNING id',
      values: [id, idUser, 0],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getBalanceById(id) {
    const query = {
      text: 'SELECT balance FROM balances WHERE id_user = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('balance tidak ditemukan');
    }
    return result.rows[0].balance;
  }

  async updateBalanceById({ id, newBalance }) {
    const oldBalance = await this.getBalanceById(id);

    const query = {
      text: 'UPDATE balances SET balance = $1 WHERE id_user = $2',
      values: [oldBalance + newBalance, id],
    };
    await this._pool.query(query);
  }
}

module.exports = BalanceRepositoryPostgres;
