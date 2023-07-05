const MovieRepository = require('../../Domains/movies/MovieRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class MovieRepositoryPostgres extends MovieRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async getAllMovie() {
    const query = {
      text: 'SELECT * FROM movies',
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getMovieById(id) {
    const query = {
      text: 'SELECT * FROM movies WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('movie tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = MovieRepositoryPostgres;
