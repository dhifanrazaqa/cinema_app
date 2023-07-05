const BalanceRepository = require('../../../Domains/balances/BalanceRepository');

const GetBalanceUseCase = require('../GetBalanceUseCase');

describe('GetBalanceUseCase', () => {
  it('should orchestrating the get balance action correctly', async () => {
    // Arrange
    const idUser = 'user-123';

    // mock
    const mockBalance = {
      id: 'balance-123',
      id_user: 'user-123',
      balance: 0,
    };

    // expected
    const expectedBalance = {
      id: 'balance-123',
      id_user: idUser,
      balance: 0,
    };

    /** creating dependency of use case */
    const mockBalanceRepository = new BalanceRepository();

    /** mocking needed function */
    mockBalanceRepository.getBalanceById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockBalance));

    /** creating use case instance */
    const getBalanceUseCase = new GetBalanceUseCase({
      balanceRepository: mockBalanceRepository,
    });

    // Action
    const balanceResult = await getBalanceUseCase.execute(idUser);

    // Assert
    expect(balanceResult).toStrictEqual(expectedBalance);
  });
});
