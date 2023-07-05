const MovieRepository = require('../../../Domains/movies/MovieRepository');

const GetAllMovieUseCase = require('../GetAllMovieUseCase');

describe('GetMovieUseCase', () => {
  it('should orchestrating the get movie action correctly', async () => {
    // mock
    const mockMovie = [
      {
        id: 'movie-123',
        title: 'Lorem ipsum',
        description: 'lorem ipsum dolor sit amet',
        release_date: '2022-05-12',
        poster_url: 'www.google.com',
        age_rating: 20,
        ticket_price: 50000,
      },
    ];

    // expected
    const expectedMovie = [
      {
        id: 'movie-123',
        title: 'Lorem ipsum',
        description: 'lorem ipsum dolor sit amet',
        release_date: '2022-05-12',
        poster_url: 'www.google.com',
        age_rating: 20,
        ticket_price: 50000,
      },
    ];

    /** creating dependency of use case */
    const mockMovieRepository = new MovieRepository();

    /** mocking needed function */
    mockMovieRepository.getAllMovie = jest.fn()
      .mockImplementation(() => Promise.resolve(mockMovie));

    /** creating use case instance */
    const getAllMovieUseCase = new GetAllMovieUseCase({
      movieRepository: mockMovieRepository,
    });

    // Action
    const movieResult = await getAllMovieUseCase.execute();

    // Assert
    expect(movieResult).toStrictEqual(expectedMovie);
  });
});
