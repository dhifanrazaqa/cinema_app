const InvariantError = require('../../Commons/exceptions/InvariantError');
const TransactionRepository = require('../../Domains/transactions/TransactionRepository');
// const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class TransactionRepositoryPostgres extends TransactionRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addTransaction({
    idUser, idMovie, idShow, totalPrice, noSeat1, noSeat2 = null,
    noSeat3 = null, noSeat4 = null, noSeat5 = null, noSeat6 = null,
  }) {
    const id = `transaction-${this._idGenerator(8)}`;

    const query = {
      text: 'INSERT INTO transactions VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
      values: [
        id, idUser, idMovie, idShow, totalPrice, false, noSeat1,
        noSeat2, noSeat3, noSeat4, noSeat5, noSeat6,
      ],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getTransactionByUserId(idUser) {
    const query = {
      text: `SELECT transactions.*, movies.title, shows.st_time
            FROM transactions 
            INNER JOIN movies
            ON transactions.id_movie = movies.id
            INNER JOIN shows
            ON transactions.id_show = shows.id
            WHERE transactions.id_user = $1 ORDER BY time
            `,
      values: [idUser],
    };
    const result = await this._pool.query(query);
    console.log(result.rows);

    return result.rows;
  }

  async updateTransactionById(id) {
    const getQuery = {
      text: 'SELECT refund FROM transactions WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(getQuery);

    if (result.rows.refund === true) {
      throw new InvariantError('Tidak bisa dilakukan');
    }
    const query = {
      text: 'UPDATE transactions SET refund = true WHERE id = $1',
      values: [id],
    };
    await this._pool.query(query);
  }
}

module.exports = TransactionRepositoryPostgres;
