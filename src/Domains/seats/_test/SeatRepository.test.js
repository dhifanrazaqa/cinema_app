const SeatRepository = require('../SeatRepository');

describe('SeatRepository Interface', () => {
  it('should throw error when invoke abstract behavior ', async () => {
    const seatRepository = new SeatRepository();

    await expect(seatRepository.getSeat('')).rejects.toThrowError('SEAT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(seatRepository.checkAvailable({})).rejects.toThrowError('SEAT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(seatRepository.updateSeatById({})).rejects.toThrowError('SEAT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
