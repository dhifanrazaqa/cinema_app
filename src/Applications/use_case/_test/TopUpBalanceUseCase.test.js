const InvariantError = require('../../../Commons/exceptions/InvariantError');
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
    mockBalanceRepository.getBalanceById = jest.fn()
      .mockImplementation(() => Promise.resolve(0));
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

  it('error withdraw when balance not enough', async () => {
    // Arrange
    const useCasePayload = {
      id: 'user-123',
      newBalance: -2000,
    };

    /** creating dependency of use case */
    const mockBalanceRepository = new BalanceRepository();

    /** mocking needed function */
    mockBalanceRepository.getBalanceById = jest.fn()
      .mockImplementation(() => Promise.resolve(0));
    mockBalanceRepository.updateBalanceById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getBalanceUseCase = new TopUpBalanceUseCase({
      balanceRepository: mockBalanceRepository,
    });

    // Action & Assert
    await expect(getBalanceUseCase.execute(useCasePayload))
      .rejects
      .toThrowError(InvariantError);
  });

  it('should orchestrating the withdraw balance action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'user-123',
      newBalance: -2000,
    };

    /** creating dependency of use case */
    const mockBalanceRepository = new BalanceRepository();

    /** mocking needed function */
    mockBalanceRepository.getBalanceById = jest.fn()
      .mockImplementation(() => Promise.resolve(5000));
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
