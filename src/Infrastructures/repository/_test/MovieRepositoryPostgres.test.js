const MovieRepositoryPostgres = require('../MovieRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('MovieRepositoryPostgres', () => {
  afterEach(async () => {
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getAllMovie function', () => {
    it('should persist get all movie and return movie correctly', async () => {
      // Arrange
      const movieRepositoryPostgres = new MovieRepositoryPostgres(pool);

      // Action
      const movieResult = await movieRepositoryPostgres.getAllMovie();

      // Assert
      expect(movieResult).toHaveLength(5);
    });
  });

  describe('getMovieById', () => {
    it('should throw NotFoundError when movie not found', async () => {
      // Arrange
      const movieRepositoryPostgres = new MovieRepositoryPostgres(pool);

      // Action & Assert
      await expect(movieRepositoryPostgres.getMovieById('50'))
        .rejects
        .toThrowError(NotFoundError);
    });

    it('should return movie correctly', async () => {
      // Arrange
      const expectedMovie = {
        id: 0,
        title: 'Fast X',
        description: 'Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.',
        release_date: new Date(2023, 4, 17),
        poster_url: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
        age_rating: 15,
        ticket_price: 53000,
      };

      const movieRepositoryPostgres = new MovieRepositoryPostgres(pool);

      // Action
      const getMovie = await movieRepositoryPostgres.getMovieById('0');

      // Assert
      expect(getMovie).toStrictEqual(expectedMovie);
    });
  });
});
