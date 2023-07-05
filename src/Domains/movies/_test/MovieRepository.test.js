const MovieRepository = require('../MovieRepository');

describe('MovieRepository Interface', () => {
  it('should throw error when invoke abstract behavior ', async () => {
    const movieRepository = new MovieRepository();

    await expect(movieRepository.getAllMovie()).rejects.toThrowError('MOVIE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(movieRepository.getMovieById('')).rejects.toThrowError('MOVIE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
