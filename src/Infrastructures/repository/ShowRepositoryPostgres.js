const ShowRepository = require('../../Domains/shows/ShowRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ShowRepositoryPostgres extends ShowRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async getShow(id) {
    const query = {
      text: 'SELECT * FROM shows WHERE id_movie = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('show tidak ditemukan');
    }
    return result.rows;
  }
}

module.exports = ShowRepositoryPostgres;
