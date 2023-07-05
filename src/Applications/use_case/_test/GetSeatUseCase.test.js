const SeatRepository = require('../../../Domains/seats/SeatRepository');

const GetSeatUseCase = require('../GetSeatUseCase');

describe('GetSeatUseCase', () => {
  it('should orchestrating the get seat action correctly', async () => {
    // Arrange
    const useCaseParam = {
      id_show: 'show-123',
    };

    // mock
    const mockSeat = [
      {
        id: 1,
        id_show: 'show-123',
        no_seat: 'A1',
        available: true,
      },
      {
        id: 2,
        id_show: 'show-456',
        no_seat: 'A2',
        available: true,
      },
    ];

    // expected
    const expectedSeat = [
      {
        id: 1,
        id_show: 'show-123',
        no_seat: 'A1',
        available: true,
      },
      {
        id: 2,
        id_show: 'show-456',
        no_seat: 'A2',
        available: true,
      },
    ];

    /** creating dependency of use case */
    const mockSeatRepository = new SeatRepository();

    /** mocking needed function */
    mockSeatRepository.getSeat = jest.fn()
      .mockImplementation(() => Promise.resolve(mockSeat));

    /** creating use case instance */
    const getSeatUseCase = new GetSeatUseCase({
      seatRepository: mockSeatRepository,
    });

    // Action
    const seatResult = await getSeatUseCase.execute(useCaseParam);

    // Assert
    expect(seatResult).toStrictEqual(expectedSeat);
  });
});
