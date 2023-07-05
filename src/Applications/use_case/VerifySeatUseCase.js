/* eslint-disable no-plusplus */
const InvariantError = require('../../Commons/exceptions/InvariantError');

class VerifySeatUseCase {
  constructor({ seatRepository }) {
    this._seatRepository = seatRepository;
  }

  async execute(useCasePayload) {
    const seats = Object.values(useCasePayload.noSeat);

    const check = await seats.map(async (element) => {
      const available = await this._seatRepository.checkAvailable({
        idShow: useCasePayload.idShow, noSeat: element,
      });
      return available;
    });

    const err = await Promise.all(check);
    if (err.includes(false)) throw new InvariantError('Wrong Input');

    for (let i = 0; i < seats.length; i++) {
      for (let j = i + 1; j < seats.length; j++) {
        if (seats[i] === seats[j]) {
          throw new InvariantError('Wrong Input');
        }
      }
    }
  }
}

module.exports = VerifySeatUseCase;
