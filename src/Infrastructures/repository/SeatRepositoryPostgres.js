const SeatRepository = require('../../Domains/seats/SeatRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class SeatRepositoryPostgres extends SeatRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async getSeat(id) {
    const query = {
      text: 'SELECT * FROM seats WHERE id_show = $1 ORDER BY id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('seat tidak ditemukan');
    }
    return result.rows;
  }

  async checkAvailable({ idShow, noSeat }) {
    const getQuery = {
      text: 'SELECT * FROM seats WHERE id_show = $1 AND no_seat = $2',
      values: [idShow, noSeat],
    };
    const result = await this._pool.query(getQuery);
    if (!result.rows.length) {
      throw new NotFoundError('seat tidak ditemukan');
    }
    return result.rows[0].available;
  }

  async updateSeatById({ idShow, noSeat }) {
    const status = await this.checkAvailable({ idShow, noSeat });
    console.log(status);
    const query = {
      text: 'UPDATE seats SET available = $1 WHERE id_show = $2 AND no_seat = $3',
      values: [status !== true, idShow, noSeat],
    };
    await this._pool.query(query);
  }
}

module.exports = SeatRepositoryPostgres;
