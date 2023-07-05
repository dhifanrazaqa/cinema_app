class GetAllMovieUseCase {
  constructor({ movieRepository }) {
    this._movieRepository = movieRepository;
  }

  async execute() {
    const movies = await this._movieRepository.getAllMovie();
    return movies;
  }
}

module.exports = GetAllMovieUseCase;
