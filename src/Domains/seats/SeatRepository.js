/* eslint-disable no-unused-vars */
class SeatRepository {
  async getSeat(id) {
    throw new Error('SEAT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkAvailable({ idShow, noSeat }) {
    throw new Error('SEAT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateSeatById({ idShow, noSeat }) {
    throw new Error('SEAT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = SeatRepository;
