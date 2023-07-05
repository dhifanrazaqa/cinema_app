class GetDetailMovieUseCase {
  constructor({ movieRepository }) {
    this._movieRepository = movieRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    const movie = await this._movieRepository.getMovieById(id);
    return movie;
  }
}

module.exports = GetDetailMovieUseCase;
