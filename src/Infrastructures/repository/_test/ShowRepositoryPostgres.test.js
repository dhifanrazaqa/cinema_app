const ShowRepositoryPostgres = require('../ShowRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ShowTableTestHelper = require('../../../../tests/ShowTableTestHelper');

describe('ShowRepositoryPostgres', () => {
  afterEach(async () => {
    await ShowTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await ShowTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('getShow function', () => {
    it('should throw NotFoundError when show not found', async () => {
      // Arrange
      const showRepositoryPostgres = new ShowRepositoryPostgres(pool);

      // Action & Assert
      await expect(showRepositoryPostgres.getShow(1))
        .rejects
        .toThrowError(NotFoundError);
    });
    it('should persist get all show and return show correctly', async () => {
      // Arrange
      await ShowTableTestHelper.addShow({ id: 'show-123' });
      const showRepositoryPostgres = new ShowRepositoryPostgres(pool);

      // Action
      const showResult = await showRepositoryPostgres.getShow(1);

      // Assert
      expect(showResult).toHaveLength(1);
    });
  });
});
