const ShowRepository = require('../../../Domains/shows/ShowRepository');

const GetShowUseCase = require('../GetShowUseCase');

describe('GetShowUseCase', () => {
  it('should orchestrating the get show action correctly', async () => {
    // Arrange
    const useCaseParam = {
      idMovie: 1,
    };

    // mock
    const mockShow = [
      {
        id: 'show-123',
        id_movie: 1,
        st_time: '13:00',
      },
      {
        id: 'show-456',
        id_movie: 1,
        st_time: '15:00',
      },
    ];

    // expected
    const expectedShow = [
      {
        id: 'show-123',
        id_movie: 1,
        st_time: '13:00',
      },
      {
        id: 'show-456',
        id_movie: 1,
        st_time: '15:00',
      },
    ];

    /** creating dependency of use case */
    const mockShowRepository = new ShowRepository();

    /** mocking needed function */
    mockShowRepository.getShow = jest.fn()
      .mockImplementation(() => Promise.resolve(mockShow));

    /** creating use case instance */
    const getShowUseCase = new GetShowUseCase({
      showRepository: mockShowRepository,
    });

    // Action
    const showResult = await getShowUseCase.execute(useCaseParam);

    // Assert
    expect(showResult).toStrictEqual(expectedShow);
  });
});
