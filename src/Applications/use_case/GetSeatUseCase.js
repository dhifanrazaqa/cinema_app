class GetSeatUseCase {
  constructor({ seatRepository }) {
    this._seatRepository = seatRepository;
  }

  async execute(useCasePayload) {
    const { showtime } = useCasePayload;
    const seat = await this._seatRepository.getSeat(showtime);
    return seat;
  }
}

module.exports = GetSeatUseCase;
