class UpdateSeatUseCase {
  constructor({ seatRepository }) {
    this._seatRepository = seatRepository;
  }

  async execute(useCasePayload) {
    const seats = useCasePayload.noSeat;

    seats.forEach((element) => {
      if (element !== undefined && element !== '') {
        this._seatRepository.updateSeatById({ idShow: useCasePayload.idShow, noSeat: element });
      }
    });
  }
}

module.exports = UpdateSeatUseCase;
