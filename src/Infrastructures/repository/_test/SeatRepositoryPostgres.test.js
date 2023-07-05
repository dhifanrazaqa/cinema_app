const SeatRepositoryPostgres = require('../SeatRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const SeatTableTestHelper = require('../../../../tests/SeatTableTestHelper');
const ShowTableTestHelper = require('../../../../tests/ShowTableTestHelper');

describe('SeatRepositoryPostgres', () => {
  afterEach(async () => {
    await SeatTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await SeatTableTestHelper.cleanTable();
    await ShowTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('getSeat function', () => {
    it('should throw NotFoundError when seat not found', async () => {
      // Arrange
      const seatRepositoryPostgres = new SeatRepositoryPostgres(pool);

      // Action & Assert
      await expect(seatRepositoryPostgres.getSeat('show-123'))
        .rejects
        .toThrowError(NotFoundError);
    });
    it('should persist get all seat and return seat correctly', async () => {
      // Arrange
      await ShowTableTestHelper.addShow({ id: 'show-123' });
      await SeatTableTestHelper.addSeat({ id: 1 });
      const seatRepositoryPostgres = new SeatRepositoryPostgres(pool);

      // Action
      const seatResult = await seatRepositoryPostgres.getSeat('show-123');

      // Assert
      expect(seatResult).toHaveLength(1);
    });
  });

  describe('getSeat function', () => {
    it('should throw NotFoundError when seat not found', async () => {
      // Arrange
      const seatPayload = {
        idShow: 'show-123',
        noSeat: 'A1',
      };

      const seatRepositoryPostgres = new SeatRepositoryPostgres(pool);

      // Action & Assert
      await expect(seatRepositoryPostgres.checkAvailable(seatPayload))
        .rejects
        .toThrowError(NotFoundError);
    });
  });

  describe('updateSeat function', () => {
    it('should persist update seat', async () => {
      // Arrange
      await SeatTableTestHelper.addSeat({ id: 1 });

      const seatPayload = {
        idShow: 'show-123',
        noSeat: 'A1',
      };

      const expectedSeat = [
        {
          id: 1,
          id_show: 'show-123',
          no_seat: 'A1',
          available: false,
        },
      ];

      const seatRepositoryPostgres = new SeatRepositoryPostgres(pool);
      // Action
      await seatRepositoryPostgres.updateSeatById(seatPayload);

      // Assert
      const seats = await SeatTableTestHelper.findSeatsById(1);
      expect(seats).toEqual(expectedSeat);
    });
  });
});
