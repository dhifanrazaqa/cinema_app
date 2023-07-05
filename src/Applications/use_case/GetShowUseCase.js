class GetShowUseCase {
  constructor({ showRepository }) {
    this._showRepository = showRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    const show = await this._showRepository.getShow(id);
    return show;
  }
}

module.exports = GetShowUseCase;
