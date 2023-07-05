const BalanceRepository = require('../../../Domains/balances/BalanceRepository');
const AddBalanceUseCase = require('../AddBalanceUseCase');

describe('AddBalanceUseCase', () => {
  it('should orchestrating the add balance action correctly', async () => {
    // Arrange
    const idUser = 'user-123';

    /** creating dependency of use case */
    const mockBalanceRepository = new BalanceRepository();

    /** mocking needed function */
    mockBalanceRepository.addBalance = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getBalanceUseCase = new AddBalanceUseCase({
      balanceRepository: mockBalanceRepository,
    });

    // Action
    await getBalanceUseCase.execute(idUser);

    // Assert

    expect(mockBalanceRepository.addBalance).toBeCalledWith(idUser);
  });
});
