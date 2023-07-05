const TransactionRepository = require('../TransactionRepository');

describe('TransactionRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new TransactionRepository();

    // Action and Assert
    await expect(userRepository.addTransaction({})).rejects.toThrowError('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getTransactionByUserId('')).rejects.toThrowError('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.updateTransactionById('')).rejects.toThrowError('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
