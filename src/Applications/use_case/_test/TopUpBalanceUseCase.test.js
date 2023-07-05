const BalanceRepository = require('../../../Domains/balances/BalanceRepository');
const TopUpBalanceUseCase = require('../TopUpBalanceUseCase');

describe('TopUpBalanceUseCase', () => {
  it('should orchestrating the topup balance action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'user-123',
      newBalance: 2000,
    };

    /** creating dependency of use case */
    const mockBalanceRepository = new BalanceRepository();

    /** mocking needed function */
    mockBalanceRepository.updateBalanceById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getBalanceUseCase = new TopUpBalanceUseCase({
      balanceRepository: mockBalanceRepository,
    });

    // Action
    await getBalanceUseCase.execute(useCasePayload);

    // Assert

    expect(mockBalanceRepository.updateBalanceById).toBeCalledWith(useCasePayload);
  });
});
