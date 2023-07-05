const MovieRepository = require('../../../Domains/movies/MovieRepository');

const GetDetailMovieUseCase = require('../GetDetailMovieUseCase');

describe('GetMovieUseCase', () => {
  it('should orchestrating the get movie action correctly', async () => {
    // Arrange
    const useCaseParam = {
      movieId: 'movie-123',
    };

    // mock
    const mockMovie = {
      id: 'movie-123',
      title: 'Lorem ipsum',
      description: 'lorem ipsum dolor sit amet',
      release_date: '2022-05-12',
      poster_url: 'www.google.com',
      age_rating: 20,
      ticket_price: 50000,
    };

    // expected
    const expectedMovie = {
      id: 'movie-123',
      title: 'Lorem ipsum',
      description: 'lorem ipsum dolor sit amet',
      release_date: '2022-05-12',
      poster_url: 'www.google.com',
      age_rating: 20,
      ticket_price: 50000,
    };

    /** creating dependency of use case */
    const mockMovieRepository = new MovieRepository();

    /** mocking needed function */
    mockMovieRepository.getMovieById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockMovie));

    /** creating use case instance */
    const getDetailMovieUseCase = new GetDetailMovieUseCase({
      movieRepository: mockMovieRepository,
    });

    // Action
    const movieResult = await getDetailMovieUseCase.execute(useCaseParam);

    // Assert
    expect(movieResult).toStrictEqual(expectedMovie);
  });
});
